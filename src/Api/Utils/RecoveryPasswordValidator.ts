import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRecoveryPassword } from '@prisma/client';
import DayJsFactory from "../../Core/Factory/DayJsFactory";

@Injectable()
export default class RecoveryPasswordValidator {
  constructor(private readonly dayjsFactory: DayJsFactory) {}

  validate(passwordRecovery: UserRecoveryPassword) {
    if (!passwordRecovery) {
      throw new NotFoundException('Password recovery code not found');
    }

    if (passwordRecovery.usedAt) {
      throw new NotFoundException('Password recovery code already used');
    }

    const createdAt = this.dayjsFactory.create(passwordRecovery.createdAt);
    const now = this.dayjsFactory.create();

    if (createdAt.add(15, 'minute').isBefore(now)) {
      throw new NotFoundException('Password recovery code not valid anymore');
    }
  }
}
