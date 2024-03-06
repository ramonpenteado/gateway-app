import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { ParentService } from "@modules/parents";
import { StudentService } from "@modules/students";

@Injectable()
export class SecurityServices {
    constructor(
        private studentService: StudentService,
        private parentService: ParentService,
        private readonly jwtService: JwtService,
    ) { }

    private async getUserByEmail(email: string, level: string): Promise<any> {
        try {
            const user = async () => {
                if (level === 'student') {
                    return await this.studentService.getStudentByEmail(email);
                } else if (level === 'parent') {
                    return await this.parentService.getParentByEmail(email);
                }
            }
            return user();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async signIn(email: string, password: string, level: string): Promise<any> {
        const user = await this.getUserByEmail(email, level);
        const userSelected = user[0];
        if (userSelected?.password !== password) {
            throw new UnauthorizedException('Wrong credentials provided');
        }
        const payload = { email: userSelected.email, sub: userSelected.id, aud: userSelected.roles, roles: [userSelected.roles] };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}