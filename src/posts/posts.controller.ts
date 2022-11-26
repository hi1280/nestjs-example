import {
  Body,
  Controller,
  Delete,
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
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { PostsResponseDto } from './posts.response.dto';
import {
  CreatePostsRequestDto,
  UpdatePostsRequestDto,
} from './posts.request.dto';

@ApiBearerAuth()
@Controller({
  path: 'posts',
  version: '1',
})
// @UseGuards(AuthGuard('bearer'))
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  @ApiOkResponse({
    type: [PostsResponseDto],
  })
  getData(): Promise<PostsResponseDto[]> {
    return this.postService.get();
  }

  @Post()
  @ApiCreatedResponse({
    type: PostsResponseDto,
  })
  postData(@Body() dto: CreatePostsRequestDto): Promise<PostsResponseDto> {
    return this.postService.store(
      dto.title,
      dto.description,
      dto.email,
      dto.category,
    );
  }

  @Put(':id')
  @ApiOkResponse({
    type: PostsResponseDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostsRequestDto,
  ): Promise<PostsResponseDto> {
    return this.postService.update(
      id,
      dto.title,
      dto.description,
      dto.category,
    );
  }

  @Delete(':id')
  @ApiOkResponse()
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postService.delete(id);
  }
}
