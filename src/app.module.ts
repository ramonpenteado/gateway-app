import { Module } from '@nestjs/common';
import { UsersController, UsersService, UsersModule } from './users';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '360s' },
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
