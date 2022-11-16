import { Field, ObjectType } from '@nestjs/graphql';
import { Transaction } from './../modules/transaction/transaction.schema';

@ObjectType()
export class GetCardTransactionsPayload {
  @Field(() => String)
  title: string;

  @Field(() => [Transaction])
  data: Transaction[];
}

@ObjectType()
export class GetCardTransactionsByDatesPayload {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  categoriesCount: number;

  @Field(() => [Transaction])
  data: Transaction[];
}
