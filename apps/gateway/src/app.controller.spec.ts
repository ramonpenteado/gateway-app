import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from '@users/services/users.service';
import { UsersModule } from '@users/services/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import configuration from '@shared/shared/configuration';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '360s' },
        }),
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration]
        }),
      ],
      controllers: [AppController],
      providers: [AppService, UsersService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'ramon.penteado@gmail.com',
    }
    it('should return "User Object"', async () => {
      const response = await appController.getUserById(1)
      expect(response.email).toBe(user.email);
    });
  });
});
