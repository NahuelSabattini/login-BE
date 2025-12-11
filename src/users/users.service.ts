import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ERROR_MESSAGES } from './utils/constants';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existUser)
      throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS);

    createUserDto.password = await hashPassword(createUserDto.password);
    const createUser = new this.userModel(createUserDto);

    return createUser.save();
  }

  async validateUser(email: string, userName: string) {
    const userByEmail = await this.userModel.exists({ email: email });
    if (userByEmail) throw new ConflictException(ERROR_MESSAGES.EMAIL_IN_USE);

    const userByUserName = await this.userModel.exists({ userName: userName });

    if (userByUserName)
      throw new ConflictException(ERROR_MESSAGES.USERNAME_IN_USE);

    return;
  }

  async findUserByEmailOrUserName(email: string, userName: string) {
    return await this.userModel.findOne({
      $or: [{ email: email }, { userName: userName }],
    });
  }
}
