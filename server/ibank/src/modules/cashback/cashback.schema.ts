import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CommonSchema } from '../../common/common.schema';

@ObjectType()
@Schema()
export class Cashback extends CommonSchema {
  @Field(() => String)
  @Prop({ type: String, required: true })
  image: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  title: string;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  percent: number;

  @Field(() => [String])
  @Prop([String])
  connectedInUsers: string[];
}

export type CashbackDocument = Cashback & Document;
export type CashbackModel = Model<CashbackDocument>;

export const CashbackSchema = SchemaFactory.createForClass(Cashback);
