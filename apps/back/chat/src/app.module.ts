import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    TypegooseModule.forRoot(
      'mongodb+srv://root:repairnow@cluster0.cqkvei0.mongodb.net/chat?retryWrites=true&w=majority',
      //   {
      //     useNewUrlParser: true,
      //     useFindAndModify: false,
      //   },
    ),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
