import { BadRequestException, Injectable } from '@nestjs/common';
import RequestEventEmitter from '../../../../Core/Event/Emitter/RequestEventEmitter';
import { ContextualGraphqlRequest, UseCase } from '../../../../index';
import PrismaFileRepository from "../../../../Core/Cdn/Repository/PrismaFileRepository";
import File from "../../../../Core/Cdn/Entity/File";

@Injectable()
export default class GetOneFileUseCase implements UseCase<Promise<File>, [id: number]> {
  constructor(
    private readonly repository: PrismaFileRepository,
    private readonly eventEmitter: RequestEventEmitter
  ) {}

  async handle(context: ContextualGraphqlRequest, id: number) {
    try {
      return { ...(await this.repository.findById(id)), context }
    } catch (error) {
      this.eventEmitter.emit('GetOneFileUseCase::failed', { context, error: error.message });

      throw new BadRequestException(error.message);
    }
  }
}
