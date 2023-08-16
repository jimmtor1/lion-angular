import { ProductImage } from "./product-image";
import { Product2 } from "./product2";

export interface Product2WithImages extends Product2{

    imageList:ProductImage[];

}