import { Module } from '@nestjs/common';
import { WufooController } from './app.controller';
import { WufooService } from './app.service';

@Module({
  imports: [],
  controllers: [WufooController],
  providers: [WufooService],
})
export class AppModule {}
