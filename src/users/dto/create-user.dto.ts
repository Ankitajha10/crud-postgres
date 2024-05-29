//DTO for the user entity

export class CreateUserDto 
{
    /*
    Since the id field is auto generated it is not included
    */
    username:string
    password:string
}
