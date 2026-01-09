import { IsString } from 'class-validator';

export class NavigationDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;
}
