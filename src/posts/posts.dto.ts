import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PostsDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    required: false,
  })
  @IsEmail()
  email?: string;
}
