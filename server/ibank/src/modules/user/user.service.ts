import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { Types } from 'mongoose';

import { CommonFields } from '../../common/common.schema';
import { User, UserModel } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}

  async validateUser(phone: string, pin: string): Promise<User> {
    const targetUser = await this.userModel.findOne({ phone, pin });
    if (!targetUser) throw new Error('Invalid credentials');

    const isPinValid = await compare(pin, targetUser.pin);
    if (!isPinValid) throw new Error('Invalid credentials');

    return targetUser;
  }

  async createUser(user: Omit<User, CommonFields>): Promise<User> {
    const targetUserByPhone = await this.userModel.findOne({
      phone: user.phone,
    });
    if (targetUserByPhone) throw new Error('User already exists');

    const encryptedPin = await hash(user.pin, 10);

    return this.userModel.create({ ...user, pin: encryptedPin });
  }

  async userById(_id: Types.ObjectId, throwError = false): Promise<User> {
    const user = await this.userModel.findById(_id);
    if (!user && throwError) throw new Error('User not found');

    return user;
  }
}
