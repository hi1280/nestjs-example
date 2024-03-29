import { ApiProperty } from '@nestjs/swagger';

export class PostsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  category: string[];

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
