import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthUtil {
    constructor() {}

    async hash(password: string) {
        return await bcrypt.hash(password, 10)
    }

    async match(password: string, passwordHash: string) {
        return await bcrypt.compare(password, passwordHash);
    }
}