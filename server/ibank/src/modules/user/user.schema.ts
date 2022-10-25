import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

import { CommonSchema } from '../../common/common.schema';

export enum USER_SEX_ENUM {
  M = 'M',
  F = 'F',
}

@ObjectType()
@Schema()
export class User extends CommonSchema {
  @Field(() => String)
  @Prop({ type: String, required: true })
  phone: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  pin: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  fullName: string;

  @Field(() => Date)
  @Prop({ type: Date, required: true })
  birthday: Date;

  @Field(() => USER_SEX_ENUM)
  @Prop({ type: String, enum: USER_SEX_ENUM, required: false })
  sex: USER_SEX_ENUM;

  @Field(() => String)
  @Prop({ type: String, required: false })
  image: string;
}

registerEnumType(USER_SEX_ENUM, { name: 'USER_SEX_ENUM' });

export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);
