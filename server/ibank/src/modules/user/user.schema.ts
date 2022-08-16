import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

import { CommonSchema } from '../../common/common.schema';

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

  @Field(() => String)
  @Prop({ type: String, required: false })
  sex: 'm' | 'f';

  @Field(() => String)
  @Prop({ type: String, required: true })
  countryUniqNumber: string;

  @Field(() => String)
  @Prop({ type: String, required: false })
  image: string;
}

export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);
