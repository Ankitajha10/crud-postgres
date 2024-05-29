import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { find } from 'rxjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

const fake = [
    {
       id:1,
       username:'ankita',
       password:'1234'
    },
    {
        id:2,
        username:'nivi',
        password:'5678'
     }
]

@Injectable()
export class AuthService {

    constructor(private jwtService:JwtService, private userService:UsersService){

    }

    async validateUser({username,password}:CreateUserDto){
        const finduser = await this.userService.findOneBy({username});
        if(!finduser){
            return null;
        }

       if(password===finduser.password){
            const {password,...user}=finduser
            return this.jwtService.sign(user)
       } 
    }
}
