import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';

import { Card, CardrModel, CARD_TYPE_ENUM } from './card.schema';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: CardrModel) {}

  async createCard(
    owner: string,
    pin: number,
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
      isBlocked: false,
      isMasterCard,
      expired: moment().add(4, 'years').toDate(),
      type,
    });
  }
}