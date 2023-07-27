import { ProductImage } from "./product-image";

export class Product {

    idproduct:number = 0;
    productName:string = "";
    description:string = "";
    defaultCategory:number;
    idcategory:number=0;
    idsubcategory:number = 0;
    idprovider:number; 
    federation:number;
    city:number;   
    price:number;
    active:boolean = true;    
    creationDate:Date; 
    productImageList:ProductImage[];
    promotedTo:Date;
    promoteActive: boolean;

}
