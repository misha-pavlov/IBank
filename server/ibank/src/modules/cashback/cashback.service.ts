import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Cashback, CashbackModel } from './cashback.schema';

@Injectable()
export class CashbackService {
  constructor(
    @InjectModel(Cashback.name) private cashbackModel: CashbackModel,
  ) {}

  async getCashbacks(): Promise<Cashback[]> {
    return this.cashbackModel.find({ deleted: false });
  }

  async switchCashback(
    userId: Types.ObjectId,
    cashbackId: Types.ObjectId,
  ): Promise<boolean> {
    const cashback = await this.cashbackModel.findById(cashbackId, {
      connectedInUsers: 1,
    });

    if (cashback.connectedInUsers.includes(userId.toString())) {
      await this.cashbackModel.findByIdAndUpdate(cashbackId, {
        $pull: { connectedInUsers: { $in: [userId] } },
      });
    } else {
      await this.cashbackModel.findByIdAndUpdate(cashbackId, {
        $push: { connectedInUsers: userId },
      });
    }

    return false;
  }
}
