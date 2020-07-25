import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserCredentialDto } from './dto/user-credential.dto';
import { JwtGuard } from './jwt.guard';

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

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post('/exampleGuardedRoute')
  async exampleGuardedRoute(): Promise<boolean> {
    return true;
  }
}
