import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as postmark from 'postmark';
import UserRepository from '../../Api/Repository/UserRepository';
import MailMustacheRenderer from './MailMustacheRenderer';

@Injectable()
export default class Mailer {
  private readonly client: postmark.Client;
  private readonly sender: string;

  constructor(
    private readonly config: ConfigService,
    private readonly mustache: MailMustacheRenderer,
    private readonly userRepository: UserRepository,
  ) {
    this.client = new postmark.ServerClient(this.config.get('POSTMARK_SERVER_TOKEN'));
    this.sender = `StockIO <${this.config.get('MAIL_SENDER')}>`;
  }

  getSender() {
    return this.sender;
  }

  async sendMailToUsers(userIds: number[], filename: string, data: Record<string, any> = {}, from?: string) {
    const users = await Promise.all(userIds.map(userId => this.userRepository.findById(userId)));

    const htmlContents = await Promise.all(users.map(async (user, index) => {
      return this.generateHtmlContent(filename, data, user);
    }));

    const allEmails = users.reduce((acc, user, index) => {
      acc[user.email] = htmlContents[index];
      return acc;
    }, {});

    await this.sendHtmlMail(allEmails, this.generateEmailSubject(filename), from);
  }

  private async generateHtmlContent(filename: string, data: Record<string, any>, user: any) {
    const dataToSend = {
      userId: user.id,
      firstName: user.firstname,
      currentYear: new Date().getFullYear(),
      ...data,
    };

    return this.mustache.render(`fr/${filename}.html`, dataToSend);
  }

  private generateEmailSubject(filename: string) {
    return `mailing.${filename}`;
  }

  private async sendHtmlMail(emails: Record<string, string>, subject: string, from?: string) {
    const promises = Object.keys(emails).map(to => {
      return this.client.sendEmail({
        From: from ?? this.getSender(),
        To: to,
        Subject: subject,
        HtmlBody: emails[to]
      });
    });

    return Promise.all(promises);
  }

  public async sendIndividualHtmlMail(to: string, subject: string, html: string, from?: string) {
    return this.client.sendEmail({
      From: from ?? this.getSender(),
      To: to,
      Subject: subject,
      HtmlBody: html,
    });
  }
}
