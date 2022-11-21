import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PostsResponseDto } from './posts.response.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async store(
    title: string,
    description: string,
    email: string,
  ): Promise<PostsResponseDto> {
    const data: Prisma.PostCreateInput = {
      title,
      description,
      email,
    };
    const saved = await this.prisma.post.create({
      data,
    });
    const response = new PostsResponseDto();
    response.id = saved.id;
    response.title = saved.title;
    response.description = saved.description;
    response.email = saved.email;
    response.created_at = saved.created_at;
    response.updated_at = saved.updated_at;
    return response;
  }

  async get(): Promise<PostsResponseDto[]> {
    return (await this.prisma.post.findMany()).map((row) => {
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
    const data: Prisma.PostUpdateInput = {
      title,
      description,
    };
    const saved = await this.prisma.post.update({
      data,
      where: { id },
    });
    const response = new PostsResponseDto();
    response.id = saved.id;
    response.title = saved.title;
    response.description = saved.description;
    response.email = saved.email;
    response.created_at = saved.created_at;
    response.updated_at = saved.updated_at;
    return response;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
    return;
  }
}
