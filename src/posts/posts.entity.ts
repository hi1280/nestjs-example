import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class Posts {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  title: string;

  @ApiProperty()
  @Column({ nullable: false })
  description: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  update_at: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deleted_at: Date;
}
