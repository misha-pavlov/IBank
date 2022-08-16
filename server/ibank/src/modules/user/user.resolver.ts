import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ContextUser } from '../../decorators/context-user.decorator';
import { User } from './user.schema';
import { UserPayload } from '../../object-types/user-payload.object-type';

@Resolver()
export class UserResolver {
  constructor() {}

  @Query(() => UserPayload)
  @UseGuards(JwtAuthGuard)
  async getUser(@ContextUser() user: User): Promise<UserPayload> {
    return user;
  }
}
