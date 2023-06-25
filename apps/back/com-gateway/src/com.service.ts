import { Injectable } from '@nestjs/common';

@Injectable()
export class ComService {
  getHello(): string {
    return 'Bienvenue sur le serveur de communication de repairNow';
  }
}
