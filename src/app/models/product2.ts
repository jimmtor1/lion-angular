export interface Product2{
    idproduct:number | null;
    productName:string;
    description:string;
    price:number;
    active:boolean;
    promotedTo:Date | null;
    type:number;
    mainImage:string;
    iduser:number | undefined;
    creationDate:Date | undefined;
    promoteActive:boolean;
    categoryList:number[] | any;
}

