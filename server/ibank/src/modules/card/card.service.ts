import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';

import { Card, CardrModel, CARD_TYPE_ENUM } from './card.schema';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: CardrModel) {}

  async createCard(
    owner: string,
    pin: string,
    isMasterCard: boolean,
    type: CARD_TYPE_ENUM,
  ): Promise<Card> {
    const number =
      (Math.random() + ' ').substring(2, 10) +
      (Math.random() + ' ').substring(2, 10);

    return this.cardModel.create({
      owner,
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

  async getUserCards(owner: string, excludeIds?: string[]): Promise<Card[]> {
    return this.cardModel.find({ owner, _id: { $ne: excludeIds } });
  }

  async getUserCapital(owner: string): Promise<number> {
    const cards = await this.cardModel.find({ owner });
    const capital = cards.reduce((acc, card) => (acc += card.amount), 0);
    return capital;
  }

  async getUserFirstCard(owner: string): Promise<Card> {
    return this.cardModel.findOne({ owner }).sort({ createdAt: 1 }).limit(1);
  }
}
