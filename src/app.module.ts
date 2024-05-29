import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(
      {
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory:(configService:ConfigService)=>({
          type:'postgres',
          host:configService.get('DB_HOST'),
          port:configService.get('DB_PORT'),
          username:configService.get('DB_USER'),
          password:configService.get('DB_PASS'),
          database:configService.get('DB_NAME'),
          entities:[User ],
          synchronize:true // not to be done in actual project
        })
      }
    ),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
