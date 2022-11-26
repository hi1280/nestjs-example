import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum Category {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

export class CreatePostsRequestDto {
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
  @IsOptional()
  description: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsEnum(Category, {
    each: true,
  })
  category: string[];
}

export class UpdatePostsRequestDto extends PickType(CreatePostsRequestDto, [
  'title',
  'description',
  'category',
]) {}
