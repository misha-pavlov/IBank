import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Types } from 'mongoose';

import {
  Transaction,
  TransactionModel,
  TRANSACTION_TYPE_ENUM,
} from '../transaction/transaction.schema';
import { User, UserModel } from '../user/user.schema';
import { Card, CardModel, CARD_TYPE_ENUM } from './card.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: CardModel,
    @InjectModel(User.name) private userModel: UserModel,
    @InjectModel(Transaction.name) private transactionModel: TransactionModel,
  ) {}

  async createCard(
    owner: string,
    ownerFullName: string,
    pin: string,
    isMasterCard: boolean,
    type: CARD_TYPE_ENUM,
  ): Promise<Card> {
    const number =
      (Math.random() + ' ').substring(2, 10) +
      (Math.random() + ' ').substring(2, 10);

    return this.cardModel.create({
      owner,
      ownerFullName,
      number,
      pin,
      amount: 0,
      internetLimit: 10000,
      usedInternetLimit: 10000,
      isBlocked: false,
      isMasterCard,
      expired: moment().add(4, 'years').toDate(),
      type,
    });
  }

  async getUserCards(
    owner: string,
    searchTerm?: string,
    excludeIds?: string[],
  ): Promise<Card[]> {
    const regex = new RegExp((searchTerm || '').trim().split(/\s+/).join('|'));
    return this.cardModel.find({
      owner,
      _id: { $ne: excludeIds },
      $or: [
        { number: { $regex: regex, $options: 'i' } },
        { ownerFullName: { $regex: regex, $options: 'i' } },
      ],
    });
  }

  async getUserCapital(owner: string): Promise<number> {
    const cards = await this.cardModel.find({ owner });
    const capital = cards.reduce((acc, card) => (acc += card.amount), 0);
    return capital;
  }

  async getUserFirstCard(owner: string): Promise<Card> {
    return this.cardModel.findOne({ owner }).sort({ createdAt: 1 }).limit(1);
  }

  async moneySend(
    to: Types.ObjectId,
    amount: number,
    // not required for magic card logic
    from?: Types.ObjectId,
  ): Promise<boolean> {
    const cardFrom = await this.cardModel.findOne({ _id: from });
    const cardFromHolder = await this.userModel.findOne({
      _id: cardFrom.owner,
    });

    const cardTo = await this.cardModel.findOne({ _id: to });
    const cardToHolder = await this.userModel.findOne({ _id: cardTo.owner });

    if (from) {
      const newAmount = cardFrom.amount - amount;

      await this.cardModel.findByIdAndUpdate(
        { _id: from },
        { amount: newAmount },
      );
      await this.transactionModel.create({
        type: TRANSACTION_TYPE_ENUM.SEND_ON_CARD,
        amount: -amount,
        cardId: cardFrom._id,
        userId: cardFromHolder._id,
        title: cardToHolder.fullName,
        amountOnCardAfter: newAmount,
      });
    }

    const newAmount = cardTo.amount + amount;

    await this.cardModel.findByIdAndUpdate({ _id: to }, { amount: newAmount });
    await this.transactionModel.create({
      type: TRANSACTION_TYPE_ENUM.SEND_ON_CARD,
      amount: amount,
      cardId: cardTo._id,
      userId: cardToHolder._id,
      title: cardFromHolder.fullName || 'Magic card',
      amountOnCardAfter: newAmount,
    });

    return false;
  }

  async getCardById(_id: Types.ObjectId): Promise<Card> {
    return this.cardModel.findOne({ _id });
  }
}
