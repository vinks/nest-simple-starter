import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultService {
    getHello(): any {
        return { title: 'Hello World!' };
    }
}
