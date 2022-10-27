import { UserService } from './user.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ContextUser } from '../../decorators/context-user.decorator';
import { User } from './user.schema';
import { UserPayload } from '../../object-types/user-payload.object-type';
import { Types } from 'mongoose';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserPayload)
  @UseGuards(JwtAuthGuard)
  async getUser(@ContextUser() user: User): Promise<UserPayload> {
    return user;
  }

  @Query(() => Boolean)
  async checkUserPin(
    @Args('userId') userId: Types.ObjectId,
    @Args('pin') pin: string,
  ) {
    return this.userService.checkUserPin(userId, pin);
  }
}
