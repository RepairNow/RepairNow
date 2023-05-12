import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@repairnow/prisma-pg';

// This module is not used for this time. Maybe in the future. Now we use auth module to be able to create users normally.
// We probably will use this module to create users from the admin panel.
@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
