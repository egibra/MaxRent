import { Product } from '../product-models/product';

export class OrderItemForCreation {
    product: Product;
    dateFrom: Date;
    dateTo: Date;
    totalPrice: number;
    assetsCount: number;
    getTotalDays(): number {
         return (this.dateTo.getDate() - this.dateFrom.getDate() + 1 );
    }
}
