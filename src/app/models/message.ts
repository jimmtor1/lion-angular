
// import { Userr } from "./userr";

export class Message {

    // sender: Userr;
    // receiver: Userr;
    id: number;
    idchat: number;
    sender: number;
    content: string;
    dateTime: Date;
    seen: boolean = true;

    receiver?:number;


}
