import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { uniqWith, isEqual } from 'lodash';
import * as moment from 'moment';

import {
  Transaction,
  TransactionModel,
  TRANSACTION_TYPE_ENUM,
} from './transaction.schema';
import {
  GetCardTransactionsPayload,
  GetCardTransactionsByDatesPayload,
} from './../../object-types/transaction-payload.object-type';

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

  async getCardTransactions(
    cardId: string,
    searchTerm?: string,
  ): Promise<GetCardTransactionsPayload[]> {
    const regex = new RegExp((searchTerm || '').trim().split(/\s+/).join('|'));
    const transactions = await this.transactionModel
      .find({ cardId, title: { $regex: regex, $options: 'i' } })
      .sort({ createdAt: -1 });

    const titles = [];
    const formatedTitles = [];

    uniqWith(
      transactions
        .map((transaction) => moment(transaction.createdAt))
        .filter((title) => {
          if (formatedTitles.includes(title.format('DD/MM/YYYY'))) {
            return false;
          } else {
            formatedTitles.push(title.format('DD/MM/YYYY'));
            titles.push(title);
            return true;
          }
        }),
      isEqual,
    );

    const newData = titles.map((title) => {
      const dataByTitle = transactions
        .filter(
          (transaction) =>
            moment(transaction.createdAt).isSame(title, 'D') && transaction,
        )
        .sort((a, b) => {
          const c = new Date(a.createdAt);
          const d = new Date(b.createdAt);
          return Number(d) - Number(c);
        });

      return { title: title.toString(), data: dataByTitle };
    });

    return newData;
  }

  async getCardTransactionsByDates(
    cardId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<GetCardTransactionsByDatesPayload> {
    const transactions = await this.transactionModel
      .find({ cardId, createdAt: { $gte: startDate, $lt: endDate } })
      .sort({ createdAt: -1 });

    const categoriesCount = [];

    const total = transactions.reduce(
      (acc: number, transaction: Transaction) => {
        if (!categoriesCount.includes(transaction.type)) {
          categoriesCount.push(transaction.type);
        }

        return (acc += transaction.amount);
      },
      0,
    );

    return {
      total,
      categoriesCount: categoriesCount.length,
      data: transactions,
    };
  }
}
