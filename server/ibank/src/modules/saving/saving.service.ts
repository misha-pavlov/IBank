import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Card, CardModel } from '../card/card.schema';
import {
  Transaction,
  TransactionModel,
  TRANSACTION_TYPE_ENUM,
} from '../transaction/transaction.schema';
import { Saving, SavingModel } from './saving.schema';

@Injectable()
export class SavingService {
  constructor(
    @InjectModel(Card.name) private cardModel: CardModel,
    @InjectModel(Saving.name) private savingModel: SavingModel,
    @InjectModel(Transaction.name) private transactionModel: TransactionModel,
  ) {}

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

  async getUserSavingsSavedSum(owner: Types.ObjectId): Promise<number> {
    const savings = await this.savingModel.find({ owner, deleted: false });
    return savings.reduce((acc, saving) => {
      return (acc += saving.saved);
    }, 0);
  }

  async getSavingById(savingId: Types.ObjectId): Promise<Saving> {
    return this.savingModel.findById(savingId);
  }

  async updateSaving(
    savingId: Types.ObjectId,
    newName?: string,
    newImageUrl?: string,
    newSavingPoint?: number,
    newDescription?: string,
  ): Promise<Saving> {
    return this.savingModel.findByIdAndUpdate(savingId, {
      name: newName,
      imageUrl: newImageUrl,
      savingPoint: newSavingPoint,
      description: newDescription,
    });
  }

  async withdrawPart(
    savingId: Types.ObjectId,
    to: Types.ObjectId,
    amount: number,
  ): Promise<boolean> {
    const saving = await this.savingModel.findById(savingId);
    const card = await this.cardModel.findById(to);

    const newAmountCard = card.amount + amount;
    const newAmountSaving = saving.saved - amount;

    await Promise.all([
      this.savingModel.findByIdAndUpdate(savingId, {
        saved: newAmountSaving,
      }),
      this.cardModel.findByIdAndUpdate(to, { amount: newAmountCard }),
      this.transactionModel.create({
        type: TRANSACTION_TYPE_ENUM.MONEY_SEND,
        amount: amount,
        cardId: to,
        userId: card.owner,
        title: `From saving: ${saving.name}`,
        amountOnCardAfter: newAmountCard,
      }),
    ]);

    return false;
  }

  async breakSaving(
    savingId: Types.ObjectId,
    to: Types.ObjectId,
  ): Promise<boolean> {
    const saving = await this.savingModel.findById(savingId);
    const card = await this.cardModel.findById(to);

    const newAmountCard = card.amount + saving.saved;

    await Promise.all([
      this.savingModel.findByIdAndUpdate(savingId, {
        saved: 0,
        deleted: true,
      }),
      this.cardModel.findByIdAndUpdate(to, { amount: newAmountCard }),
      this.transactionModel.create({
        type: TRANSACTION_TYPE_ENUM.MONEY_SEND,
        amount: saving.saved,
        cardId: to,
        userId: card.owner,
        title: `From saving: ${saving.name}`,
        amountOnCardAfter: newAmountCard,
      }),
    ]);

    return false;
  }
}
