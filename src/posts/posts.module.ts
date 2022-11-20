import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [KnexModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
