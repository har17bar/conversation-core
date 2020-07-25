import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { UserCredentialDto } from '../dto/user-credential.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    status: 201,
    type: AuthResponseDto,
  })
  @Post('/signIn')
  async signIn(@Body() userCredentialDto: UserCredentialDto): Promise<AuthResponseDto> {
    return this.authService.signIn(userCredentialDto);
  }

  @ApiOkResponse({
    status: 201,
    type: AuthResponseDto,
  })
  @Post('/signUp')
  async signUp(@Body() userCredentialDto: UserCredentialDto): Promise<AuthResponseDto> {
    return this.authService.signUp(userCredentialDto);
  }
}
