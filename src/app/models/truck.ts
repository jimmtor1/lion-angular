
export class Truck {

    id:number;
    brand:number;    
    modelYear:number
    axes:number;
    truckType:number;
    kilowatt:number;
    horsepower:number;
    chassis:string;
    registered:boolean=false;
    registrationDate:string;
    
}

export class Truck2 {

    id:number;
    brand:TruckBrand;    
    modelYear:number
    axes:number;
    truckType:TruckType;
    kilowatt:number;
    horsepower:number;
    chassis:string;
    registered:boolean=false;
    registrationDate:string;
    
}

class TruckBrand{
    id:number;
    brandName:string;

    constructor(){
        this.id=0;
        this.brandName="";
    }

}

class TruckType {
    id:number;
    truckType:string;

    constructor(){
        this.id=0;
        this.truckType="";
    }
}
