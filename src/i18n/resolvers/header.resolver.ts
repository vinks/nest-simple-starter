import { Inject } from '@nestjs/common';
import { I18nResolver, I18nOptions } from 'nestjs-i18n';
import parser from 'accept-language-parser';

export class HeaderResolver implements I18nResolver {
    constructor(
        private languages: string[] = ['en', 'ru'],
        private keys: string[] = ['accept-language'],
    ) {}

  resolve(req: any) {
    let lang: string;

    for (const key of this.keys) {
      if (req.headers[key] !== undefined) {
        lang = parser.pick(this.languages, req.headers[key], { loose: true });

        break;
      }
    }

    return lang;
  }
}
