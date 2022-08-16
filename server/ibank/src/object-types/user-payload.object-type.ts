import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class UserPayload {
  @Field(() => Types.ObjectId)
  _id: Types.ObjectId;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  pin: string;

  @Field(() => String)
  fullName: string;

  @Field(() => Date)
  birthday: Date;

  @Field(() => String)
  sex: 'm' | 'f';

  @Field(() => String)
  countryUniqNumber: string;

  @Field(() => String)
  image: string;
}
