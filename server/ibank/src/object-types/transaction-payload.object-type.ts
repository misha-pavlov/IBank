import { Transaction } from './../modules/transaction/transaction.schema';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransactionPayload {
  @Field(() => String)
  title: string;

  @Field(() => [Transaction])
  data: [Transaction];
}
