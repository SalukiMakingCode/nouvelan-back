import { BadRequestException, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { ContextualGraphqlRequest, UseCase } from '../../../../index';
import File from '../../Entity/File';
import PrismaFileRepository from '../../Repository/PrismaFileRepository';
import S3FileRepository from '../../Repository/S3FileRepository';
import UploadFileDto from './UploadFileDto';

@Injectable()
export default class UploadFileUseCase implements UseCase<Promise<File>, [dto: UploadFileDto]> {
  constructor(
    private readonly prismaFileRepository: PrismaFileRepository,
    private readonly s3FileRepository: S3FileRepository
  ) {}

  async handle(context: ContextualGraphqlRequest, dto: UploadFileDto) {
    try {
      let buffer = dto.file.buffer;
      let originalname = dto.file.originalname;

      if (dto.file.mimetype.includes('png') || dto.file.mimetype.includes('jpg') || dto.file.mimetype.includes('jpeg')) {
        buffer = await sharp(dto.file.buffer)
          .resize({
            width: dto.width ? Number(dto.width) : undefined,
            height: dto.height ? Number(dto.height) : undefined,
          })
          .webp({ quality: dto.quality ? Number(dto.quality) : 100 })
          .toBuffer();
        originalname = `${dto.file.originalname.split('.')[0]}.webp`;
      }

      return this.prismaFileRepository.save(await this.s3FileRepository.create(
        { ...dto, file: ({ buffer, originalname }) as any}
      ));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
