import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { IntegrationError } from '../exception';
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
    getHello(): any {
        return this.defaultService.getHello();
    }

    @Get('exception')
    @ApiOperation({
        description: 'getException description',
        title: 'getException',
    })
    getException(): any {
        throw new IntegrationError('My error', new Error('some'));
    }
}
