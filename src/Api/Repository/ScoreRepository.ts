import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../Core/Datasource/Prisma";
import SetCurrentScoreByActivityDto
    from "../UseCase/Score/SetCurrentScoreByActivityUseCase/SetCurrentScoreByActivityDto";
import Score from "../Entity/Score";

@Injectable()
export default class ScoreRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {
    }

    async getAllScores() {
        return this.prisma.score.findMany({
            include: {
                user: true,
                year: true,
            }
        });
    }

    async getAllScoresCurrent() {
        const currentYear = await this.prisma.year.findFirst({
            where: {current: true}
        })

        return this.prisma.score.findMany({
            include: {
                user: true,
                year: true,
            },
            where: {
                year: currentYear,
            }
        });
    }

    async setCurrentScoreByActivity(dto: SetCurrentScoreByActivityDto[]): Promise<Score[]> {
        const results: Score[] = [];

        for (const item of dto) {
            const dataToUpdate = {
                aperitif: item.aperitif !== undefined ? item.aperitif : undefined,
                entreeFroide: item.entreeFroide !== undefined ? item.entreeFroide : undefined,
                soupe: item.soupe !== undefined ? item.soupe : undefined,
                entreeChaude: item.entreeChaude !== undefined ? item.entreeChaude : undefined,
                sorbet: item.sorbet !== undefined ? item.sorbet : undefined,
                plat: item.plat !== undefined ? item.plat : undefined,
                dessert: item.dessert !== undefined ? item.dessert : undefined,
            };

            const upsertedScore = await this.prisma.score.upsert({
                where: {
                    userId_yearId: {
                        userId: item.userId,
                        yearId: item.yearId,
                    },
                },
                update: dataToUpdate,
                create: {
                    userId: item.userId,
                    yearId: item.yearId,
                    aperitif: item.aperitif || 0,
                    entreeFroide: item.entreeFroide || 0,
                    soupe: item.soupe || 0,
                    entreeChaude: item.entreeChaude || 0,
                    sorbet: item.sorbet || 0,
                    plat: item.plat || 0,
                    dessert: item.dessert || 0,
                },
                include: {
                    user: true,
                    year: true,
                }
            });

            results.push(upsertedScore);
        }

        return results;
    }
}