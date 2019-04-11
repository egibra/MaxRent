import { OrderItemForUserView } from './order-item-for-user-view';

export class OrderForUserView {
    id: number;
    customerName: string;
    customerNumber: string;
    customerAddress: number;
    userId: number;
    dateCreated: Date;
    orderState: string;
    orderCode: string;
    totalOrderSum: string;
    orderItems?: OrderItemForUserView[];
}
