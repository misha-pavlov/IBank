import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class AuthPayload {
  @Field(() => String)
  token: string;
}

@ObjectType()
export class SignUpPayload {
  @Field(() => String)
  token: string;

  @Field(() => Types.ObjectId)
  newUserId: Types.ObjectId;

  @Field(() => String)
  newUserFullName: string;
}
