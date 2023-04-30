export class Userr {

    id : number;
    email : string;
    password : string;
    role : Role = new Role();
    active : boolean;
    creationDate : string;
    federation:number;
    city:number;
    firstName:string;
    lastName:string;
    phone:string;

}

class Role{
    id:number;
    roleName:string;
}
