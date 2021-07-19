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
  @Matches(/[a-z]{3}[0-9][0-9a-z][0-9]{2}/, {
    message:
      'plate must contain only lowercase letters and numbers. examples: aaa-1234, aaa-12b4',
  })
  plate: string;

  @IsOptional()
  @IsDate()
  lastEntrance: Date;
}
