import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProduces, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  @ApiProduces('text/html')
  @ApiOkResponse({ description: 'OK' })
  @ApiOperation({ title: 'Display Application Information' })
  @ApiUseTags('app-info')
  getAppInfo(): string {
    return this.appService.getAppInfo();
  }
}
