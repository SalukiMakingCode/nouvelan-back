import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../Core/Datasource/Prisma';

@Injectable()
export default class UserRecoveryPasswordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserAndCode(userId: number, code: number) {
    return this.prisma.userRecoveryPassword.findFirst({
      where: { userId, code },
      orderBy: { id: 'desc' }
    });
  }

  async create(userId: number) {
    return this.prisma.userRecoveryPassword.create({
      data: {
        userId,
        code: Math.floor(Math.random() * 900000) + 100000
      }
    });
  }

  async markAsUsed(id: number) {
    return this.prisma.userRecoveryPassword.update({
      data: {
        usedAt: new Date()
      },
      where: {
        id
      }
    });
  }
}
