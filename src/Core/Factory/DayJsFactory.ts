import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export default class DayJsFactory {
  create(date?: dayjs.ConfigType, format?: dayjs.OptionType, locale?: string, strict?: boolean) {
    return dayjs(date);
  }
}
