import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  store(title: string, description: string) {
    const post = new Posts();
    post.title = title;
    post.description = description;
    return this.postRepository.save(post);
  }

  get() {
    return this.postRepository.find();
  }

  async update(id: number, title: string, description: string) {
    const post = await this.postRepository.findOneBy({ id });
    post.title = title;
    post.description = description;
    return this.postRepository.save(post);
  }

  async delete(id) {
    const post = await this.postRepository.findOneBy({ id });
    return this.postRepository.remove(post);
  }
}
