import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class DefaultService {
    constructor(
        private readonly i18n: I18nService,
    ) {}

    getHello(lang): any {
        const message = this.i18n.translate('default.HELLO_MESSAGE', {
            lang,
            args: { id: 1, username: 'Toon' }
        });

        return { message };
    }
}
