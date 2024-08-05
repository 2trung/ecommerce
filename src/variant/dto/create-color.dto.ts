import { IsHexColor, IsNotEmpty } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty()
  name: string;

  @IsHexColor()
  hex: string;
}
