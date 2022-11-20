import { Injectable } from '@nestjs/common';
import { PostsResponseDto } from './posts.response.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

type Posts = {
  id: number;
  title: string;
  description: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

@Injectable()
export class PostsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async store(
    title: string,
    description: string,
    email: string,
  ): Promise<PostsResponseDto> {
    const created_at = new Date();
    const updated_at = new Date();
    const [id] = await this.knex('post').insert({
      title,
      description,
      email,
      created_at,
      updated_at,
    });
    const response = new PostsResponseDto();
    response.id = id;
    response.title = title;
    response.description = description;
    response.email = email;
    response.created_at = created_at;
    response.updated_at = updated_at;
    return response;
  }

  async get(): Promise<PostsResponseDto[]> {
    return (await this.knex<Posts>('post')).map((row) => {
      const response = new PostsResponseDto();
      response.id = row.id;
      response.title = row.title;
      response.description = row.description;
      response.email = row.email;
      response.created_at = row.created_at;
      response.updated_at = row.updated_at;
      return response;
    });
  }

  async update(
    id: number,
    title: string,
    description: string,
  ): Promise<PostsResponseDto> {
    const updated_at = new Date();
    const post = await this.knex<Posts>('post').where({ id }).first();
    await this.knex('post')
      .where({ id })
      .update({ title, description, updated_at });
    const response = new PostsResponseDto();
    response.id = id;
    response.title = title;
    response.description = description;
    response.email = post.email;
    response.created_at = post.created_at;
    response.updated_at = updated_at;
    return response;
  }

  delete(id): Promise<void> {
    return this.knex<PostsResponseDto>('post').where({ id }).delete();
  }
}
