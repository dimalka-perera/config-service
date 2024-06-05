import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { DatabaseModule } from 'src/database/database.module';
import { mongodb_model_providers } from './providers/mongodb.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [ConfigController],
  providers: [ConfigService, ...mongodb_model_providers ],
  exports: []
})
export class ConfigModule {}
