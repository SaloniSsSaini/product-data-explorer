import { IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  parentId?: number;
}
