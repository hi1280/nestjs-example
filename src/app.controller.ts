import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppDto } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const a = {};
    (a as any).foobar();
    return this.appService.getHello();
  }

  @Post()
  postHello(@Body() dto: AppDto): string {
    return;
  }
}
