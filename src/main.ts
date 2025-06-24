import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Configuration } from './common/config/configuration'
import { ConsoleLogger, LoggerService } from '@nestjs/common'

async function bootstrap() {
  const logger: LoggerService = new ConsoleLogger({
    prefix: 'ContractorHelper',
    context: 'NestApplication',
  })
  const app = await NestFactory.create(AppModule, {
    logger,
  })

  const config: ConfigService<Configuration> = app.get(ConfigService)
  const port = config.getOrThrow('port', { infer: true })

  await app.listen(port, () => {
    logger.log(`Service are now listening on the port ${port}`)
  })
}

void bootstrap()
