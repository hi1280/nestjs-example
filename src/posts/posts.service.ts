import { Injectable } from '@nestjs/common';
import { Posts } from './posts.entity';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class PostsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  store(title: string, description: string, email: string) {
    const created_at = new Date();
    const updated_at = new Date();
    return this.knex<Posts>('post').insert({
      title,
      description,
      email,
      created_at,
      updated_at,
    });
  }

  get() {
    return this.knex<Posts>('post');
  }

  update(id: number, title: string, description: string, email: string) {
    const updated_at = new Date();
    return this.knex<Posts>('post')
      .where({ id })
      .update({ title, description, email, updated_at });
  }

  delete(id) {
    return this.knex<Posts>('post').where({ id }).delete();
  }
}
