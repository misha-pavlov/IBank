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

  @Query(() => Number)
  async getUserSavingsSavedSum(@Args('owner') owner: Types.ObjectId) {
    return this.savingService.getUserSavingsSavedSum(owner);
  }

  @Query(() => Saving)
  async getSavingById(@Args('savingId') savingId: Types.ObjectId) {
    return this.savingService.getSavingById(savingId);
  }

  @Mutation(() => Saving)
  async createSaving(
    @Args('savingPoint') savingPoint: number,
    @Args('name') name: string,
    @Args('owner') owner: Types.ObjectId,
  ) {
    return this.savingService.createSaving(name, savingPoint, owner);
  }

  @Mutation(() => Saving)
  async updateSaving(
    @Args('savingId') savingId: Types.ObjectId,
    @Args('newName', { nullable: true }) newName?: string,
    @Args('newImageUrl', { nullable: true }) newImageUrl?: string,
    @Args('newSavingPoint', { nullable: true }) newSavingPoint?: number,
    @Args('newDescription', { nullable: true }) newDescription?: string,
  ) {
    return this.savingService.updateSaving(
      savingId,
      newName,
      newImageUrl,
      newSavingPoint,
      newDescription,
    );
  }

  @Mutation(() => Boolean)
  async withdrawPart(
    @Args('to') to: Types.ObjectId,
    @Args('amount') amount: number,
    @Args('savingId') savingId: Types.ObjectId,
  ) {
    return this.savingService.withdrawPart(savingId, to, amount);
  }
}
