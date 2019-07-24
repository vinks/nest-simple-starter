import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { DefaultService } from './default.service';

@ApiUseTags('default-controller')
@Controller()
export class DefaultController {
  constructor(private readonly defaultService: DefaultService) {}

  @Get()
  @ApiOperation({
    description: 'getHello description',
    title: 'getHello',
  })
  getHello(): string {
    throw new Error('My error');
    return this.defaultService.getHello();
  }
}
