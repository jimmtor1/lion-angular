import { Seller } from "./seller";

export class SellerByCategory {

    id:number;
    provider:Seller;
    category:number;    

}

export class CategoryWithSellers {

    category:string;
    sellers:Seller[];   
    
    constructor(category:string,sellers:Seller[]){
        this.category = category;
        this.sellers = sellers;
    }

}