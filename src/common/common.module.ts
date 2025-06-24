import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { DatabaseModule } from './database/database.module'
import HTTPProviders from './http/providers'

@Global()
@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), DatabaseModule],
  providers: [...HTTPProviders],
  exports: [ConfigModule, DatabaseModule],
})
export class CommonModule {}
