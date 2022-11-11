import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { uniqWith, isEqual } from 'lodash';
import * as moment from 'moment';

import {
  Transaction,
  TransactionModel,
  TRANSACTION_TYPE_ENUM,
} from './transaction.schema';
import { TransactionPayload } from './../../object-types/transaction-payload.object-type';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: TransactionModel,
  ) {}

  async createTransaction(
    type: TRANSACTION_TYPE_ENUM,
    amount: number,
    title: string,
    userId: string,
    amountOnCardAfter: number,
    isCanceled?: boolean,
  ): Promise<Transaction> {
    return this.transactionModel.create({
      type,
      amount,
      title,
      userId,
      amountOnCardAfter,
      isCanceled,
    });
  }

  async getCardTransactions(cardId: string): Promise<TransactionPayload[]> {
    const transactions = await this.transactionModel
      .find({ cardId })
      .sort({ createdAt: -1 });

    const titles = uniqWith(
      transactions.map((transaction) => moment(transaction.createdAt)),
      isEqual,
    );

    const newData = titles.map((title) => {
      const dataByTitle = transactions.filter(
        (transaction) =>
          moment(transaction.createdAt).isSame(title) && transaction,
      );

      return { title: title.toString(), data: dataByTitle };
    });

    return newData;
  }
}
