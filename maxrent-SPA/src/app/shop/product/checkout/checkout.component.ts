import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { ProductsService } from 'src/app/_services/products/products.service';
import { OrderItemForApi } from 'src/app/_models/order-models/order-item-for-api';
import { User } from 'src/app/_models/user';
import { OrdersService } from 'src/app/_services/orders/orders.service';
import { Router, NavigationExtras } from '@angular/router';
import { OrderItemForCreation } from 'src/app/_models/order-models/order-item-for-creation';
import { OrderForCreation } from 'src/app/_models/order-models/order-for-creation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // form group
  checkoutForm:  FormGroup;
  checkOutItems:  OrderItemForCreation[] = [];
  orderDetails:  any[] = [];
  amount:  number;

  // Form Validator
  constructor(private fb: FormBuilder, private cartService: CartService, private router: Router,
    private productsService: ProductsService, private ordersService: OrdersService,
    private toastrService: ToastrService) {
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      address: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit() {
    this.cartService.getItems().subscribe(products =>
       this.checkOutItems = products);
    this.getTotal().subscribe(amount => this.amount = amount);
  }
  // Get sub Total
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }
  orderItems() {
    const order: OrderForCreation = new OrderForCreation();
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
      itemForApi.dateTo = cartItem.dateTo.toDateString();
      itemForApi.productId = cartItem.product.id;
      itemForApi.totalPrice = cartItem.totalPrice;
      order.orderItems.push(itemForApi);
    });
    this.ordersService.addOrder(order).subscribe((response: Response) => {
         if (response.status === 200) {
            this.cartService.clearCart();
            this.toastrService.success('Sėkmingai užsakyta.');
            this.router.navigate(['/order-success']);
         }
        }, error => {
          this.toastrService.error('Nepavyko užsakyti.');
        });
  }
}
