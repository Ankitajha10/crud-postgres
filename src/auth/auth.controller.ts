import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('login')
    login(@Body() authPayLoad:CreateUserDto)
    {
        const response =  this.authService.validateUser(authPayLoad);

        if(!response) throw new HttpException('Invalid Credentials',401);

        return response;
    }

}
