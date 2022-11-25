import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Saving, SavingModel } from './saving.schema';

@Injectable()
export class SavingService {
  constructor(@InjectModel(Saving.name) private savingModel: SavingModel) {}

  async createSaving(
    name: string,
    savingPoint: number,
    owner: Types.ObjectId,
  ): Promise<Saving> {
    return this.savingModel.create({
      name,
      owner,
      saved: 0,
      savingPoint,
      savedFromCards: [],
    });
  }

  async getSavingsForUser(owner: Types.ObjectId): Promise<Saving[]> {
    return this.savingModel
      .find({ owner, deleted: false })
      .sort({ createdAt: -1 });
  }

  async getUserSavingsSavedSum(owner: Types.ObjectId): Promise<number> {
    const savings = await this.savingModel.find({ owner, deleted: false });
    return savings.reduce((acc, saving) => {
      return (acc += saving.saved);
    }, 0);
  }

  async getSavingById(savingId: Types.ObjectId): Promise<Saving> {
    return this.savingModel.findById(savingId);
  }

  async updateSaving(
    savingId: Types.ObjectId,
    newName?: string,
    newImageUrl?: string,
    newSavingPoint?: number,
    newDescription?: string,
  ): Promise<Saving> {
    return this.savingModel.findByIdAndUpdate(savingId, {
      name: newName,
      imageUrl: newImageUrl,
      savingPoint: newSavingPoint,
      description: newDescription,
    });
  }
}
