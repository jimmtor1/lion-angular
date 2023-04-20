export class ProductImage {

    idimage:number;
    extension:string;
    idproduct:number;

    public getName(): string {
        return `${this.idimage}${this.extension}`;
    }

}
