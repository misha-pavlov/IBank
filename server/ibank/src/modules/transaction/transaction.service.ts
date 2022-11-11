import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  Transaction,
  TransactionModel,
  TRANSACTION_TYPE_ENUM,
} from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: TransactionModel,
  ) {}

  async createTransaction(
    type: TRANSACTION_TYPE_ENUM,
    amount: number,
    title: string,
    amountOnCardAfter: number,
    isCanceled?: boolean,
  ): Promise<Transaction> {
    return this.transactionModel.create({
      type,
      amount,
      title,
      amountOnCardAfter,
      isCanceled,
    });
  }
}
