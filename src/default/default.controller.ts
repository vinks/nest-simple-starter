import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { IntegrationError } from '../exception';
import { DefaultService } from './default.service';
import { I18nLang } from 'nestjs-i18n';

@ApiUseTags('default-controller')
@Controller()
export class DefaultController {
    constructor(private readonly defaultService: DefaultService) {}

    @Get()
    @ApiOperation({
        description: 'getHello description',
        title: 'getHello',
    })
    getHello(@I18nLang() lang: string): any {
        return this.defaultService.getHello(lang);
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
