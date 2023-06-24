import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AppController],
  providers: [AppService, AppGateway],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.COM_DB),
    ConversationsModule,
    MessagesModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
