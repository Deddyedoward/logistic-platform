import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AuthUtil } from "./auth.util";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private authUtil: AuthUtil,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string) {
        const user = await this.usersService.findOneByEmail(email);

        if(!await this.authUtil.match(pass, user?.password)) {
            throw new UnauthorizedException('Your password is not match.');
        }

        const payload = {sub: user.id, email: user.email }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}