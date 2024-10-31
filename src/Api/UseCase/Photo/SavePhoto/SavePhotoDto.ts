import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export default class SavePhotoDto {
  @Field(() => Int, { nullable: true })
  id?: number | null;

  @Field(() => Int, { nullable: true })
  imageFileId?: number | null;

  @Field({ nullable: true })
  comment?: string | null;
}
