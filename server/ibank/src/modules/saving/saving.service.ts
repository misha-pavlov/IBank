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
}
