import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import {
  AuthPayload,
  SignUpPayload,
} from 'src/object-types/auth-payload.object-type';
import { ContextUser } from 'src/decorators/context-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { AuthService } from './auth.service';
import { User, USER_SEX_ENUM } from '../user/user.schema';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthPayload)
  @UseGuards(JwtAuthGuard)
  async auth(@ContextUser() user: User): Promise<AuthPayload> {
    return { token: await this.authService.generateToken(user) };
  }

  @Mutation(() => AuthPayload)
  async signIn(@Args('phone') phone: string, @Args('pin') pin: string) {
    return this.authService.signIn(phone, pin);
  }

  @Mutation(() => SignUpPayload)
  async signUp(
    @Args('phone') phone: string,
    @Args('pin') pin: string,
    @Args('fullName') fullName: string,
    @Args('birthday') birthday: Date,
    @Args('sex') sex: USER_SEX_ENUM,
  ) {
    return this.authService.signUp(phone, pin, fullName, birthday, sex);
  }
}
