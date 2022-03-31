import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { Users } from './user.entity';
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
    return user;
  };

  getUserByUsername = async (username: string) => {
    return await this.userRepository.findOne({ username });
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
      role: createUserDto.role,
      isVerified: createUserDto.isVerified || false,
    } as Users;

    const user = this.userRepository.create(userData);
    await user.save();

    delete user.password;
    return user;
  };

  updatePassword = async (userId, oldPassword, newPassword) => {
    const user = await this.getUserById(userId);

    if (!this.comparePassword(user.password, oldPassword)) {
      throw new UnauthorizedException();
    }

    user.password = this.hashPassword(newPassword);
    user.isVerified = true;

    await user.save();
  };

  deleteUser = async (userId) => {
    const result = await this.userRepository.delete({ id: userId });
    if (!result.affected) {
      throw new NotFoundException('User Not FOund');
    }
    return result;
  };

  verifyCredentials = async (username: string, password: string) => {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (!(await this.comparePassword(user.password, password))) {
      throw new UnauthorizedException();
    }

    return user;
  };

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  private async comparePassword(hashedPassword: string, rawPassword: string) {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }
}
