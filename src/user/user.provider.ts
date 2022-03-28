import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

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

  createUser = async (createUserDto: CreateUserDto) => {
    if (
      await this.userRepository.findOne({ username: createUserDto.username })
    ) {
      throw new ConflictException('User already exists');
    }

    const userData = {
      username: createUserDto.username,
      password: createUserDto.password,
      isAdmin: createUserDto.isAdmin,
      isVerified: false,
    } as User;

    const user = this.userRepository.create(userData);
    await user.save();

    return user;
  };

  deleteUser = async (userId) => {
    const result = await this.userRepository.delete({ id: userId });
    if (!result.affected) {
      throw new NotFoundException('User Not FOund');
    }
    return result;
  };
}
