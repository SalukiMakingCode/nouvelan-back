import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class ValidateRecoveryPasswordCodeDto {
  @Field()
  email: string;

  @Field()
  code: number;
}
