import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

import { CommonSchema } from '../../common/common.schema';

export enum CARD_TYPE_ENUM {
  BLACK = 'BLACK',
  IRON = 'IRON',
  PLATINUM = 'PLATINUM',
}

@ObjectType()
@Schema()
export class Card extends CommonSchema {
  @Field(() => String)
  @Prop({ type: String, required: true })
  number: string;

  @Field(() => Date)
  @Prop({ type: Date, required: true })
  expired: Date;

  @Field(() => Boolean)
  @Prop({ type: Boolean, required: true })
  isMasterCard: boolean;

  @Field(() => CARD_TYPE_ENUM)
  @Prop({ type: String, enum: CARD_TYPE_ENUM, required: true })
  type: CARD_TYPE_ENUM;

  @Field(() => Boolean)
  @Prop({ type: Boolean, required: true })
  isBlocked: boolean;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  amount: number;

  @Field(() => String)
  @Prop({ type: String, required: true })
  owner: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  ownerFullName: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  cvv: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  pin: string;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  internetLimit: number;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  usedInternetLimit: number;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  creditLimit: number;
}

@InputType()
export class CardInput {
  @Field(() => Types.ObjectId)
  _id: Types.ObjectId;

  @Field(() => String)
  number: string;

  @Field(() => Date)
  expired: Date;

  @Field(() => Boolean)
  isMasterCard: boolean;

  @Field(() => CARD_TYPE_ENUM)
  type: CARD_TYPE_ENUM;

  @Field(() => Boolean)
  isBlocked: boolean;

  @Field(() => Number)
  amount: number;

  @Field(() => String)
  owner: string;

  @Field(() => String)
  ownerFullName: string;

  @Field(() => String)
  cvv: string;

  @Field(() => String)
  pin: string;

  @Field(() => Number)
  internetLimit: number;

  @Field(() => Number)
  usedInternetLimit: number;

  @Field(() => Number)
  creditLimit: number;
}

registerEnumType(CARD_TYPE_ENUM, { name: 'CARD_TYPE_ENUM' });

export type CardDocument = Card & Document;
export type CardModel = Model<CardDocument>;

export const CardSchema = SchemaFactory.createForClass(Card);
