import { Controller, Post, Body, Request, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get('verify')
    @Public()
    async verifyEmail(@Request() req) {
        const token = req.query.token;
        return this.authService.verifyEmail(token);
    }

}
