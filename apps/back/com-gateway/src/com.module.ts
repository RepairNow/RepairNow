import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ComController } from './com.controller';
import { ComService } from './com.service';
import { ComGateway } from './com.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ComController],
  providers: [ComService, ComGateway],
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
export class ComModule {}
