import { Module, forwardRef } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthUtil } from "./auth.util";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstant } from "./auth.constant";

@Module({
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            global: true,
            secret: jwtConstant.secret,
            signOptions: { expiresIn: 3000 },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthUtil
    ],
    exports: [
        AuthUtil
    ]
})
export class AuthModule {}