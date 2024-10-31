import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as Mustache from 'mustache';
import { join } from 'path';

@Injectable()
export default class MailMustacheRenderer {
  render(fileName: string, data: Record<string, any>) {
    const templatePath = join(__dirname, '..', '..', '..', 'templates', 'mails', fileName);
    const template = fs.readFileSync(templatePath, 'utf-8').toString();

    return Mustache.render(template, data);
  }
}
