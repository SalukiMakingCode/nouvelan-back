import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import RequestEventEmitter from '../../../../../Core/Event/Emitter/RequestEventEmitter';
import { ContextualGraphqlRequest, UseCase } from '../../../../../index';
import UserRecoveryPasswordRepository from '../../../../Repository/UserRecoveryPasswordRepository';
import UserRepository from '../../../../Repository/UserRepository';
import Mailer from "../../../../../Core/Mailing/Mailer";
import { User, UserRecoveryPassword } from "@prisma/client";
import * as fs from "node:fs";
import { join } from "path";
import * as Mustache from "mustache";

@Injectable()
export default class AskRecoveryPasswordCodeUseCase implements UseCase<Promise<boolean>, [email: string]> {
  constructor(
    private readonly eventEmitter: RequestEventEmitter,
    private readonly mailer: Mailer,
    private readonly recoveryPasswordRepository: UserRecoveryPasswordRepository,
    private readonly userRepository: UserRepository
  ) {}

  async handle(context: ContextualGraphqlRequest, email: string) {
    try {
      if (email === '') {
        throw new NotFoundException('E-mail not provided');
      }

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const passwordRecovery = await this.recoveryPasswordRepository.create(user.id);
      await this.sendMailWithCode(user, passwordRecovery);

      return true;
    } catch (error) {
      this.eventEmitter.emit('AskPasswordRecoveryCode::failed', { context, error: error.message });

      throw new BadRequestException(error.message);
    }
  }

  private async sendMailWithCode(user: User, passwordRecovery: UserRecoveryPassword) {
    const templatePath = join(process.cwd(), './src/api/Templates/email/password-recovery/index.html');
    const template = fs.readFileSync(templatePath, 'utf-8').toString();

    const renderedTemplate = Mustache.render(template, {
      firstname: user.firstName,
      lastname: user.lastName,
      code: passwordRecovery.code
    });

    await this.mailer.sendIndividualHtmlMail(
      user.email,
      'Ton code de récupération de mot de passe',
      renderedTemplate
    );
  }
}
