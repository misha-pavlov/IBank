import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Card } from 'src/modules/card/card.schema';
import { USER_SEX_ENUM } from 'src/modules/user/user.schema';

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
  sex: USER_SEX_ENUM;

  @Field(() => String)
  image: string;

  @Field(() => [Card])
  savedCards: Card[];
}
