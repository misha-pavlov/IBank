import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ContextUser } from '../../decorators/context-user.decorator';
import { User } from './user.schema';
import { UserPayload } from '../../object-types/user-payload.object-type';
import { Card, CardInput } from '../card/card.schema';

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

  @Query(() => [Card])
  async getUserSavedCards(
    @Args('userId') userId: Types.ObjectId,
    @Args({ name: 'searchTerm', nullable: true })
    searchTerm: string,
  ) {
    return this.userService.getUserSavedCards(userId, searchTerm);
  }

  @Mutation(() => User)
  async editProfile(
    @Args('userId') userId: Types.ObjectId,
    @Args('fullName') fullName: string,
    @Args('phone') phone: string,
    @Args('birthday') birthday: Date,
  ) {
    return this.userService.editProfile(userId, fullName, phone, birthday);
  }

  @Mutation(() => User)
  async addToSavedCards(
    @Args('userId') userId: Types.ObjectId,
    @Args('card') card: CardInput,
  ) {
    return this.userService.addToSavedCards(userId, card);
  }
}
