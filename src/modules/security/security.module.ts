import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SecurityController } from "./security.controller";
import { SecurityServices } from "./security.service";
import { Student, StudentService } from "@modules/students";
import { Parent, ParentService } from "@modules/parents";

@Module({
    imports: [
        JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '60s' },
        }),
        inject: [ConfigService],
        }),
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forFeature([Student, Parent]),
    ],
    providers: [
        SecurityServices,
        StudentService,
        ParentService,
    ],
    controllers: [
        SecurityController,
    ],
})
export class SecurityModule {}