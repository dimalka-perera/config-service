import { Module } from '@nestjs/common';
import { mongodb_providers } from './providers/database.providers';

@Module({
    providers: [...mongodb_providers],
    exports: [...mongodb_providers]
})
export class DatabaseModule {}
