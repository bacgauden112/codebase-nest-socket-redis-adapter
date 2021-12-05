import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Emitter } from '@socket.io/redis-emitter';
import { createClient } from 'redis';

@Controller()
export class AppController {
  redisClient = createClient({ host: 'localhost', port: 6379 });
  emitter = new Emitter(this.redisClient);
  constructor(private readonly appService: AppService) {}

  @Get('emitToAll')
  getHello(): string {
    this.emitter.emit('heyman', 'thanh cong roi');
    return this.appService.getHello();
  }
}
