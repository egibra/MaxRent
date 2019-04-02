import { OrderItemForApi } from './order-item-for-api';

export class OrderForCreation {
    customerName: string;
    customerNumber: string;
    customerAddress: string;
    userId: number;
    orderItems: OrderItemForApi[];
}
