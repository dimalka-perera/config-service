import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
    log(...args){
        console.log(...args)
    }
    error(...args){
        console.error(...args)
    }
    info(...args){
        console.info(...args)
    }
}
