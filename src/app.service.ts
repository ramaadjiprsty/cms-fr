import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      app: 'CMS API Service',
      version: '1.0.0',
      status: 'Running',
      author: 'Rama Adji',
      documentation: 'https://ramaadjiprsty.my.id/documentation',
      serverTime: new Date().toISOString(),
    };
  }
}