import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

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
  pin: string;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  internetLimit: number;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  usedInternetLimit: number;
}

registerEnumType(CARD_TYPE_ENUM, { name: 'CARD_TYPE_ENUM' });

export type CardDocument = Card & Document;
export type CardrModel = Model<CardDocument>;

export const CardSchema = SchemaFactory.createForClass(Card);
