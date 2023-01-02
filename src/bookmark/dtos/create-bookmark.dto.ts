import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  link: string;
}
