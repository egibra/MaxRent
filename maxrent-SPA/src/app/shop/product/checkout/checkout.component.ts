import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { CartService } from '../../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { OrderItem } from 'src/app/_models/order-item';
import { ProductsService } from 'src/app/_services/products/products.service';
import { Order } from 'src/app/_models/order';
import { OrderItemForApi } from 'src/app/_models/order-item-for-api';
import { User } from 'src/app/_models/user';
import { OrdersService } from 'src/app/_services/orders/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // form group
  checkoutForm:  FormGroup;
  cartItems:  Observable<OrderItem[]> = of([]);
  checkOutItems:  OrderItem[] = [];
  orderDetails:  any[] = [];
  amount:  number;

  // Form Validator
  constructor(private fb: FormBuilder, private cartService: CartService, private router: Router,
    public productsService: ProductsService, private ordersService: OrdersService) {
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      address: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(products =>
       this.checkOutItems = products);
    this.getTotal().subscribe(amount => this.amount = amount);
  }
  // Get sub Total
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }
  orderItems() {
    const order: Order = new Order();
    const currentUser: User = JSON.parse(localStorage.getItem('user'));

    order.customerAddress = this.checkoutForm.get('address').value;
    order.customerName = this.checkoutForm.get('firstname').value;
    order.customerNumber = this.checkoutForm.get('phone').value;
    order.userId = currentUser.id;
    order.orderItems = [];
    this.checkOutItems.forEach(cartItem => {
      const itemForApi: OrderItemForApi = new OrderItemForApi();
      itemForApi.assetsCount = cartItem.assetsCount;
      itemForApi.dateFrom = cartItem.dateFrom.toDateString();
      itemForApi.dateTo = cartItem.dateFrom.toDateString();
      itemForApi.productId = cartItem.product.id;
      itemForApi.totalPrice = cartItem.totalPrice;
      order.orderItems.push(itemForApi);
    });
    this.ordersService.addOrder(order).subscribe((response: Response) => {
         if (response.status === 200) {
            localStorage.removeItem('cartItem');
            this.router.navigate(['/checkout/success']);
         }
        });
  }
}
