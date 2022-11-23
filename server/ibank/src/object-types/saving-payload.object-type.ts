import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SavedFromCardsPayload {
  @Field(() => String)
  number: string;

  @Field(() => Number)
  amount: number;
}
