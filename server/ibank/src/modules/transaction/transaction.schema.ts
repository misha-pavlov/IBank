import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonSchema } from 'src/common/common.schema';

export enum TRANSACTION_TYPE_ENUM {
  TAXI = 'TAXI',
  CAR = 'CAR',
  CAFE = 'CAFE',
  PRODUCTS = 'PRODUCTS',
  TAXES = 'TAXES',
  FINES = 'FINES',
  CLOTHES = 'CLOTHES',
  TECHNOLOGIES = 'TECHNOLOGIES',
  REPAIRE = 'REPAIRE',
  INTERNET = 'INTERNET',
  MEDIC = 'MEDIC',
  CASH = 'CASH',
  TRAVELS = 'TRAVELS',
  MOBILE = 'MOBILE',
  MORE = 'MORE',
  PLAY = 'PLAY',
  CINEMA = 'CINEMA',
  DUTY_FREE = 'DUTY_FREE',
  ANIMALS = 'ANIMALS',
  BOOKS = 'BOOKS',
  CREDIT = 'CREDIT',
  FLOVERS = 'FLOVERS',
  INSURE = 'INSURE',
  ADV = 'ADV',
  MONEY_SEND = 'MONEY_SEND',
  SEND_ON_CARD = 'SEND_ON_CARD',
}

@ObjectType()
@Schema()
export class Transaction extends CommonSchema {
  @Field(() => TRANSACTION_TYPE_ENUM)
  @Prop({ type: String, enum: TRANSACTION_TYPE_ENUM, required: true })
  type: TRANSACTION_TYPE_ENUM;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  amount: number;

  @Field(() => String)
  @Prop({ type: String, required: true })
  title: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  userId: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  cardId: string;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  amountOnCardAfter: number;

  @Field(() => Boolean)
  @Prop({ type: Boolean, required: false, default: false })
  isCanceled: boolean;
}

registerEnumType(TRANSACTION_TYPE_ENUM, { name: 'TRANSACTION_TYPE_ENUM' });

export type TransactionDocument = Transaction & Document;
export type TransactionModel = Model<TransactionDocument>;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
