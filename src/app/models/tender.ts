
export class Tender {

    idtender:number;
    iduser : number;
    projectName:string;  
    dateFrom:string;
    dateTo:string;
    description:string;
    document:string;
    assignedTo:number;
    createDate:string;
    tenderTypeList:TenderType[];
    
}

export class TenderType{
    id:number;
    idtype:number;

    constructor(idtype:number){
        this.idtype = idtype;
    }

}
