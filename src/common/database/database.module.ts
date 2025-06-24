import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Configuration } from '../config/configuration'

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService<Configuration>) => ({
        uri: config.getOrThrow('mongodb.connection_string', { infer: true }),
        dbName: config.getOrThrow('mongodb.database', { infer: true }),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
