import * as frisby from 'frisby';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PostsModule } from '../src/posts/posts.module';

const Joi = frisby.Joi;
const APISV_URL = 'http://localhost:3000';

describe('Posts', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PostsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    await app.listen(3000);
    await prisma.post.create({
      data: {
        id: 1,
        title: 'aaa',
        email: 'aaa@bbb.com',
      },
    });
  });

  it(`/GET posts`, async () => {
    frisby
      .get(`${APISV_URL}/posts`)
      .expect('status', 200)
      .expect('jsonTypes', '*', {
        id: Joi.number().required(),
        title: Joi.string().required(),
        email: Joi.string().required(),
      })
      .expect('json', '*', {
        id: 1,
        title: 'aaa',
        email: 'aaa@bbb.com',
      });
  });

  afterAll(async () => {
    const deletePosts = prisma.post.deleteMany();
    await prisma.$transaction([deletePosts]);
    await prisma.$disconnect();
    await app.close();
  });
});
