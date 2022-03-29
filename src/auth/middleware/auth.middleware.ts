import { verify } from 'jsonwebtoken';
import {
  NestMiddleware,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserProvider } from 'src/user/user.provider';
import { AccessTokenPayload } from '../types/jwtPayload';
import * as config from 'config';

/** The AuthMiddleware is used to
 * (1) read the request header bearer token/user access token
 * (2) decrypt the access token to get the user object
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userProvider: UserProvider) {}

  async use(req: Request | any, res: Response, next: () => void) {    
    const bearerHeader = req.headers.authorization;
    console.log(req.headers);
    console.log(bearerHeader);
    
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user;

    if (!bearerHeader || !accessToken) {
      return next();
    }    

    let accessTokenPayload: AccessTokenPayload;
    try {
      accessTokenPayload = verify(
        accessToken,
        config.get('jwt.secret'),
      ) as AccessTokenPayload;

      user = await this.userProvider.getUserById(accessTokenPayload.id);      
    } catch (error) {
      throw new ForbiddenException('Please register or sign in.');
    }    

    if (user) {
      req.user = user;
    }

    next();
  }
}
