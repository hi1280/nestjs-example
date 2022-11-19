import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PostsDto } from './posts.dto';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@Controller({
  path: 'posts',
  version: '1',
})
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @UseGuards(AuthGuard('bearer'))
  @Get()
  @ApiOkResponse({
    type: [Posts],
  })
  getData(): Promise<Posts[]> {
    return this.postService.get();
  }

  @Post()
  @ApiCreatedResponse({
    type: Posts,
  })
  postData(@Body() dto: PostsDto): Promise<Posts> {
    return this.postService.store(dto.title, dto.description);
  }

  @Put(':id')
  @ApiOkResponse({
    type: Posts,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PostsDto,
  ): Promise<Posts> {
    return this.postService.update(id, dto.title, dto.description);
  }
}
