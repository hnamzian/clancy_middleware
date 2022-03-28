import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserProvider {
  constructor(private userRepository: UserRepository) {}

  getUserById = async (userId) => {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    delete user.password;
    return user;
  };

  createUser = async (createUserDto: CreateUserDto) => {
    if (
      await this.userRepository.findOne({ username: createUserDto.username })
    ) {
      throw new ConflictException('User already exists');
    }

    const userData = {
      username: createUserDto.username,
      password: this.hashPassword(createUserDto.password),
      isAdmin: createUserDto.isAdmin,
      isVerified: false,
    } as User;

    const user = this.userRepository.create(userData);
    await user.save();

    delete user.password;
    return user;
  };

  deleteUser = async (userId) => {
    const result = await this.userRepository.delete({ id: userId });
    if (!result.affected) {
      throw new NotFoundException('User Not FOund');
    }
    return result;
  };

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
}
