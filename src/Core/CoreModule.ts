import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DatasourceModule from './Datasource/DatasourceModule';
import EventModule from './Event/EventModule';
import DateFactory from './Factory/DateFactory';
import PromiseFactory from './Factory/PromiseFactory';
import IbanValidator from './Helper/IbanValidator';
import NumberFormatter from './Helper/NumberFormatter';
import TextHelper from './Helper/TextHelper';
import UniqidGenerator from './Helper/UniqidGenerator';
import LoggingModule from './Logging/LoggingModule';
import SecurityModule from './Security/SecurityModule';
import DayJsFactory from "./Factory/DayJsFactory";
import Mailer from "./Mailing/Mailer";
import MailMustacheRenderer from "./Mailing/MailMustacheRenderer";
import UserRepository from "../Api/Repository/UserRepository";
import {CdnModule} from "./Cdn/CdnModule";

@Module({
  imports: [ ConfigModule, DatasourceModule, EventModule, LoggingModule, SecurityModule, CdnModule ],
  exports: [
    ConfigModule,
    DatasourceModule,
    DateFactory,
    EventModule,
    IbanValidator,
    LoggingModule,
    NumberFormatter,
    PromiseFactory,
    TextHelper,
    SecurityModule,
    UniqidGenerator,
    DayJsFactory,
    Mailer,
    MailMustacheRenderer,
    UserRepository,
    CdnModule
  ],
  controllers: [],
  providers: [
    DateFactory,
    IbanValidator,
    DayJsFactory,
    NumberFormatter,
    PromiseFactory,
    TextHelper,
    Mailer,
    MailMustacheRenderer,
    UniqidGenerator,
    UserRepository,
  ]
})
export default class CoreModule {}
