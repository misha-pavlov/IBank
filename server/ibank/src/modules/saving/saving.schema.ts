import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CommonSchema } from 'src/common/common.schema';

@ObjectType()
@Schema()
export class SavedFromCards extends CommonSchema {
  @Field(() => String)
  @Prop({ type: String, required: true })
  number: string;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  amount: number;
}

@ObjectType()
@Schema()
export class Saving extends CommonSchema {
  @Field(() => String)
  @Prop({ type: String, required: true })
  name: string;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  savingPoint: number;

  @Field(() => Number)
  @Prop({ type: Number, required: true })
  saved: number;

  @Field(() => Types.ObjectId)
  @Prop({ type: Types.ObjectId, required: true })
  owner: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: String, required: false, default: '' })
  description: string;

  @Field(() => String)
  @Prop({ type: String, required: false, default: '' })
  imageUrl: string;

  @Field(() => [SavedFromCards])
  @Prop([SavedFromCards])
  savedFromCards: SavedFromCards;
}

export type SavingDocument = Saving & Document;
export type SavingModel = Model<SavingDocument>;

export const SavingSchema = SchemaFactory.createForClass(Saving);
