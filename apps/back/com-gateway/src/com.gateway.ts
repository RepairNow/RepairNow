import {
  SubscribeMessage,
  OnGatewayConnection,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessagesService } from './messages/messages.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ComGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(
    private readonly messagesService: MessagesService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ComGateway');

  @SubscribeMessage('create_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateMessageDto,
  ): Promise<void> {
    // await this.messagesService.createMessage(payload);
    await this.server.emit('response_message', payload);
  }

  afterInit(server: Server) {
    this.logger.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    //Do stuffs
  }

  // 👇 We're using the handleConnection method to verify the JWT token
  // and assign the payload to the request object
  // If the token is invalid/not present, we're disconnecting the client
  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    // verify the JWT token
    const token = client.handshake.auth.token;
    if (!token) {
      this.logger.log(`Force client disconnected: ${client.id}`);
      return client.disconnect(true);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      console.log(
        '%ccom.gateway.ts line:72 payload',
        'color: #007acc;',
        payload,
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      client['user'] = payload;
      client['token'] = token;
    } catch {
      return client.disconnect(true);
    }
  }
}
