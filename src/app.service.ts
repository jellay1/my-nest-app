import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}


//mao ni sya ang mo manipulate sa data sa database, mo handle sa business logic
//mao mo communicate sa databes
//mao mohatag sa user kung unsa iya gi request
//direct iyang pag call sa repo via TypeORM 