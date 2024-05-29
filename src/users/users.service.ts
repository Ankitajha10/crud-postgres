import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, getRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  //constructor for injecting properties
  constructor(
    @InjectRepository(User)
    private readonly userRepo:Repository<User> // user repository to interact with db 
  ){}



  //method to create a new user
  async create(createUserDto:CreateUserDto){
    const user = this.userRepo.create(createUserDto); // creating an user from the dto
    return await this.userRepo.save(user); //saving the user in the database
  }

  async findAll(){
    return await this.userRepo.find(); // retrieving all users
  }

  async findOne(id:number){ //retieving an user based on id
    return await this.userRepo.findOne({where:{id}});
  } 

  // async findbyUsername(username:string){
  //   this.userRepo.findOne({where:{username}})
  // }
  async findOneBy(criteria: Partial<User>): Promise<User | undefined> {
    return this.userRepo.findOne({ where: criteria });
  }

  async update(id:number,user:Partial<User>)
  {
      await this.userRepo.update(id,user); //updating user with the given id
      return await this.userRepo.findOneBy({id});
  }

  async remove(id:number){ //remove an user by id
     const user = await this.findOne(id);
     if(!user){ // if the user does not exist an exception is thrown
      throw new NotFoundException();
     }

     return await this.userRepo.remove(user);
  }


}
