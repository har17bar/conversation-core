import { ApiProperty } from '@nestjs/swagger';

export class UserCredentialDto {
  @ApiProperty({ example: 'John' })
  name: string;

  @ApiProperty({ example: 'abc123' })
  password: string;
}
