import { Types } from 'mongoose';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { SavingService } from './saving.service';
import { Saving } from './saving.schema';

@Resolver()
export class SavingResolver {
  constructor(private savingService: SavingService) {}

  @Query(() => [Saving])
  async getSavingsForUser(@Args('owner') owner: Types.ObjectId) {
    return this.savingService.getSavingsForUser(owner);
  }

  @Mutation(() => Saving)
  async createSaving(
    @Args('savingPoint') savingPoint: number,
    @Args('name') name: string,
    @Args('owner') owner: Types.ObjectId,
  ) {
    return this.savingService.createSaving(name, savingPoint, owner);
  }
}
