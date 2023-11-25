import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService)  {}
    
    @Post('/signin')
    async signIn(@Body() signInDto: {email: string, password: string}) {
        const users = await this.authService.signIn(signInDto.email, signInDto.password);
        return users;
    }
}