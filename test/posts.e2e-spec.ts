import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PostsModule } from '../src/posts/posts.module';

describe('Posts', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PostsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    await prisma.post.create({
      data: {
        id: 1,
        title: 'aaa',
        email: 'aaa@bbb.com',
      },
    });
  });

  it(`/GET posts`, async () => {
    const res = await request(app.getHttpServer()).get('/posts').expect(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].id).toEqual(1);
    expect(res.body[0].title).toEqual('aaa');
    expect(res.body[0].email).toEqual('aaa@bbb.com');
  });

  afterAll(async () => {
    const deletePosts = prisma.post.deleteMany();
    await prisma.$transaction([deletePosts]);
    await prisma.$disconnect();
    await app.close();
  });
});
