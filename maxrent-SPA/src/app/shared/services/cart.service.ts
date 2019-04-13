import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { OrderItemForCreation } from 'src/app/_models/order-models/order-item-for-creation';

// Get product from Localstorage
let orderItems: OrderItemForCreation [] = JSON.parse(localStorage.getItem('cartItem')) || [];
let orderItemsCheckout: OrderItemForCreation [] = JSON.parse(localStorage.getItem('cartItemCheckcout')) || [];

@Injectable({
  providedIn: 'root'
})

export class CartService {

  // Array
  private _cartItemsSubject:  BehaviorSubject<OrderItemForCreation[]> = new BehaviorSubject([]);
  private _cartItemsCheckoutSubject:  BehaviorSubject<OrderItemForCreation[]> = new BehaviorSubject([]);
  private _cartItemsObservable = this._cartItemsSubject.asObservable();
  private _cartItemsCheckoutObservable = this._cartItemsCheckoutSubject.asObservable();
  public observer:  Subscriber<{}>;

  constructor(private toastrService: ToastrService) {
      this._cartItemsSubject.subscribe(newOrderItems => {
        orderItems = newOrderItems;
      });

      this._cartItemsCheckoutSubject.subscribe(newOrderItems => {
        orderItemsCheckout = newOrderItems;
      });
  }

  // Get Products
  public getItems(): Observable<OrderItemForCreation[]> {
    return <Observable<OrderItemForCreation[]>>this._cartItemsObservable;
  }

  public getItemsCheckout(): Observable<OrderItemForCreation[]> {
    return <Observable<OrderItemForCreation[]>>this._cartItemsCheckoutObservable;
  }

  // Add to cart
  public addToCart(newOrderItem: OrderItemForCreation): void {
    const canAddToCart = true;
   // canAddToCart = orderItems.filter(orderItem => orderItem.product.id === orderItem.product.id)[0] ? true : false;

    if (canAddToCart) {
    orderItems.push(newOrderItem);
    orderItemsCheckout.push(newOrderItem);
    this.toastrService.success('Produktas pridėtas.');
    localStorage.setItem('cartItem', JSON.stringify(orderItems));
    localStorage.setItem('cartItemCheckcout', JSON.stringify(orderItemsCheckout));
    } else {
     const prod = orderItems.filter(orderItem => {
       return orderItem.product.id === orderItem.product.id;
     })[0];

     prod.assetsCount += newOrderItem.assetsCount;
     prod.totalPrice += newOrderItem.totalPrice;
    }
  }

  // Removed in cart
  removeFromCart(item: OrderItemForCreation): boolean {
    if (item === undefined) { return false; }
      const index = orderItems.indexOf(item);
      orderItems.splice(index, 1);
      orderItemsCheckout.splice(index, 1);
      this._cartItemsSubject.next(orderItems);
      this._cartItemsCheckoutSubject.next(orderItemsCheckout);
      localStorage.setItem('cartItem', JSON.stringify(orderItems));
      localStorage.setItem('cartItemCheckcout', JSON.stringify(orderItemsCheckout));
  }
  clearCart(): void {
    orderItems.splice(0, orderItems.length);
    this._cartItemsSubject.next(orderItems);
    localStorage.setItem('cartItem', JSON.stringify(orderItems));
  }

  // Total amount
  getTotalAmount(): Observable<number> {
    return this._cartItemsSubject.pipe(map((orderItem: OrderItemForCreation[]) => {
      return orderItems.reduce((prev, curr: OrderItemForCreation) => {
        return prev + curr.totalPrice;
      }, 0);
    }));
  }


}
