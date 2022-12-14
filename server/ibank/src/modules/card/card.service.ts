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
import { Saving, SavingModel } from './../saving/saving.schema';
import { Card, CardModel, CARD_TYPE_ENUM } from './card.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: CardModel,
    @InjectModel(User.name) private userModel: UserModel,
    @InjectModel(Saving.name) private savingModel: SavingModel,
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

    const cvv = Math.floor(Math.random() * (999 - 100 + 1) + 100);

    return this.cardModel.create({
      owner,
      ownerFullName,
      number,
      pin,
      cvv,
      amount: 0,
      creditLimit: 10000,
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
    amount: number,
    // not required for number sends
    to?: Types.ObjectId,
    // not required for magic card logic
    from?: Types.ObjectId,
    sendOnNumber?: string,
    type?: TRANSACTION_TYPE_ENUM,
    sendOnSaving?: Types.ObjectId,
  ): Promise<boolean> {
    let cardFrom;
    let cardFromHolder;
    let cardTo;
    let cardToHolder;

    if (from) {
      cardFrom = await this.cardModel.findOne({ _id: from });
      cardFromHolder = await this.userModel.findOne({
        _id: cardFrom.owner,
      });
    }

    if (to) {
      cardTo = await this.cardModel.findOne({ _id: to });
      cardToHolder = await this.userModel.findOne({ _id: cardTo.owner });
    }

    if (from) {
      const newAmount = cardFrom.amount - amount;

      await this.cardModel.findByIdAndUpdate(
        { _id: from },
        { amount: newAmount },
      );

      // send money on number
      if (sendOnNumber) {
        await this.transactionModel.create({
          type,
          amount: -amount,
          cardId: cardFrom._id,
          userId: cardFromHolder._id,
          title: `${type.toLocaleLowerCase()} ${sendOnNumber}`,
          amountOnCardAfter: newAmount,
        });
      } else {
        await this.transactionModel.create({
          type: TRANSACTION_TYPE_ENUM.SEND_ON_CARD,
          amount: -amount,
          cardId: cardFrom?._id,
          userId: cardFromHolder?._id,
          title: sendOnSaving ? 'From saving' : cardToHolder?.fullName,
          amountOnCardAfter: newAmount,
        });
      }
    }

    if (sendOnSaving) {
      const newAmount = cardFrom ? cardFrom.amount - amount : amount;
      const saving = await this.savingModel.findById(sendOnSaving);
      await this.savingModel.findByIdAndUpdate(sendOnSaving, {
        saved: saving.saved + amount,
        // use $push for add new array element in savedFromCards
        $push: {
          savedFromCards: { number: cardFrom?.number || 'Magic card', amount },
        },
      });
      await this.transactionModel.create({
        type: TRANSACTION_TYPE_ENUM.MONEY_SEND,
        amount: -amount,
        cardId: cardFrom?._id || 'Magic card',
        userId: cardFromHolder?._id || 'Magic card',
        title: `Sent on saving: ${saving.name}`,
        amountOnCardAfter: newAmount,
      });
    }

    if (to) {
      const newAmount = cardTo.amount + amount;

      await this.cardModel.findByIdAndUpdate(
        { _id: to },
        { amount: newAmount },
      );
      await this.transactionModel.create({
        type: TRANSACTION_TYPE_ENUM.SEND_ON_CARD,
        amount: amount,
        cardId: cardTo._id,
        userId: cardToHolder._id,
        title: cardFromHolder?.fullName || 'Magic card',
        amountOnCardAfter: newAmount,
      });
    }

    return false;
  }

  async getCardById(_id: Types.ObjectId): Promise<Card> {
    return this.cardModel.findOne({ _id });
  }

  async isCardExist(number: number): Promise<Card | null> {
    return this.cardModel.findOne({ number });
  }

  async updateCard(
    cardId: Types.ObjectId,
    newPin?: string,
    newExpired?: Date,
    newIsBlocked?: boolean,
    newCreditLimit?: number,
    newType?: CARD_TYPE_ENUM,
    newInternetLimit?: number,
    newPayByPartsLimit?: number,
  ): Promise<Card> {
    return this.cardModel.findByIdAndUpdate(cardId, {
      pin: newPin,
      type: newType,
      expired: newExpired,
      isBlocked: newIsBlocked,
      creditLimit: newCreditLimit,
      internetLimit: newInternetLimit,
      payByPartsLimit: newPayByPartsLimit,
    });
  }

  async withdrawCashback(
    cardId: Types.ObjectId,
    userId: Types.ObjectId,
    amount: number,
  ): Promise<boolean> {
    const card = await this.getCardById(cardId);
    const newAmount = card.amount + amount;

    await Promise.all([
      this.transactionModel.create({
        type: TRANSACTION_TYPE_ENUM.MORE,
        amount,
        cardId,
        title: 'From cashback',
        userId,
        amountOnCardAfter: newAmount,
        isCanceled: false,
      }),
      this.cardModel.findByIdAndUpdate(cardId, { amount: newAmount }),
    ]);

    return false;
  }
}
