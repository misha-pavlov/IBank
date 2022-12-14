import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Cashback, CashbackModel } from './cashback.schema';

@Injectable()
export class CashbackService {
  constructor(
    @InjectModel(Cashback.name) private cashbackModel: CashbackModel,
  ) {}

  async getCashbacks(): Promise<Cashback[]> {
    return this.cashbackModel.find({ deleted: false });
  }
}
