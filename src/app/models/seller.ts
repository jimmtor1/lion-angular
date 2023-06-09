import { Userr } from "./userr";
import { Subcategory } from "./subcategory";

export class Seller {

    idprovider: number;   
    street: string = "";
    companyName: string = "";
    identification: string = "";
    postalCode: string = "";
    biography: string = ""; 
    annualLeave: string = "";
    deliveryCost: string = "";
    providerSubcategoryList: Company_subcategory[];
    accepted: boolean;
    image: string = "";
    user: Userr;

    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;

    timemonday: number;
    timetuesday: number;
    timewednesday: number;
    timethursday: number;
    timefriday: number;
    timesaturday: number;
    timesunday: number;

    endmonday: number;
    endtuesday: number;
    endwednesday: number;
    endthursday: number;
    endfriday: number;
    endsaturday: number;
    endsunday: number;

    // startTime: number;
    // endTime: number;

    facebook: string = "";
    instagram: string = "";
    youtube: string = "";

    showEmail:boolean;

}

export class Company_subcategory {
    id: number;
    subcategory: Subcategory;

    constructor(idsubcategory: Subcategory) {
        this.subcategory = idsubcategory;
    }
}