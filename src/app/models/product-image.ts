export class ProductImage {

    idimage:number;
    extension:string;
    idproduct:number;
    image:File;

    public getName(): string {
        return `${this.idimage}${this.extension}`;
    }

}
