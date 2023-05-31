import { Seller } from "./seller";

export class TenderProposal {

    idProposal:number;
    idTender:number;
    user:Seller;
    comment:string;
    date:string;
    extension:string;    
}
