import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class UserDTO {
  @IsOptional()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'name must contain only letters and space',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/, {
    message: 'name must contain only letters and space',
  })
  plate: string;

  @IsOptional()
  @IsDate()
  lastEntrance: Date;
}
