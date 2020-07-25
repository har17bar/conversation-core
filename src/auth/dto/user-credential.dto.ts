import { ApiProperty } from '@nestjs/swagger';

export class UserCredentialDto {
  @ApiProperty({ description: 'User name' })
  name: string;

  @ApiProperty({ description: 'User password' })
  password: string;
}
