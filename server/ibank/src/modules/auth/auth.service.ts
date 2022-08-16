import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthPayload } from 'src/object-types/auth-payload.object-type';

import { CATS_MEMES_IMAGE_URLS } from './static/images';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async generateToken(user: User): Promise<string> {
    return this.jwtService.sign({ _id: user._id });
  }

  async signIn(phone: string, pin: string): Promise<AuthPayload> {
    const user = await this.userService.validateUser(phone, pin);
    return { token: await this.generateToken(user) };
  }

  async signUp(
    phone: string,
    pin: string,
    fullName: string,
    birthday: Date,
    sex: 'm' | 'f',
    countryUniqNumber: string,
  ): Promise<AuthPayload> {
    const randomNumber = Math.floor(Math.random() * 10);
    const image = CATS_MEMES_IMAGE_URLS[randomNumber];
    const user = await this.userService.createUser({
      phone,
      pin,
      fullName,
      birthday,
      sex,
      countryUniqNumber,
      image,
    });
    return { token: await this.generateToken(user) };
  }
}
