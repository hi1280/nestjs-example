import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';
import { PostsResponseDto } from './posts.response.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  async store(
    title: string,
    description: string,
    email: string,
    category: string[],
  ): Promise<PostsResponseDto> {
    const post = new Posts();
    post.title = title;
    post.description = description;
    post.email = email;
    post.category = category;
    const saved = await this.postRepository.save(post);
    const response = new PostsResponseDto();
    response.id = saved.id;
    response.title = saved.title;
    response.description = saved.description;
    response.email = saved.email;
    response.category = saved.category;
    response.created_at = saved.created_at;
    response.updated_at = saved.updated_at;
    return response;
  }

  async get(): Promise<PostsResponseDto[]> {
    return (await this.postRepository.find()).map((row) => {
      const response = new PostsResponseDto();
      response.id = row.id;
      response.title = row.title;
      response.description = row.description;
      response.email = row.email;
      response.category = row.category;
      response.created_at = row.created_at;
      response.updated_at = row.updated_at;
      return response;
    });
  }

  async update(
    id: number,
    title: string,
    description: string,
    category: string[],
  ): Promise<PostsResponseDto> {
    const post = await this.postRepository.findOneBy({ id });
    post.title = title;
    post.description = description;
    post.category = category;
    const saved = await this.postRepository.save(post);
    const response = new PostsResponseDto();
    response.id = saved.id;
    response.title = saved.title;
    response.description = saved.description;
    response.email = saved.email;
    response.category = saved.category;
    response.created_at = saved.created_at;
    response.updated_at = saved.updated_at;
    return response;
  }

  async delete(id: number): Promise<void> {
    const post = await this.postRepository.findOneBy({ id });
    await this.postRepository.remove(post);
    return;
  }
}
