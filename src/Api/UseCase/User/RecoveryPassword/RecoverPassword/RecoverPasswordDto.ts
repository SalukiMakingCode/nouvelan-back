import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class RecoverPasswordDto {
  @Field()
  email: string;

  @Field()
  code: number;

  @Field()
  password: string;
}
