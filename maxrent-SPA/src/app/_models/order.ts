import { OrderItem } from './order-item';
import { OrderItemForApi } from './order-item-for-api';

export class Order {
    customerName: string;
    customerNumber: string;
    customerAddress: string;
    userId: number;
    orderItems: OrderItemForApi[];
}
