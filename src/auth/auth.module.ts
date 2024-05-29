import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[
    JwtModule.register({
      secret:'xcvg852', //secret key to be used for jwt authentication
      signOptions:{expiresIn:'7d'} // 7d expiry for the json web token
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService]
})
export class AuthModule {}
