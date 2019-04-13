import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderItemForCreation } from 'src/app/_models/order-models/order-item-for-creation';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  checkOutItems:  OrderItemForCreation[];
  totalSum = 0;
  myDate: Date = new Date();
  tomorrowDate: Date = new Date();
  constructor(private _cartService: CartService) {
  }

  ngOnInit() {
    this._cartService.getItemsCheckout().subscribe(items => {
      this.checkOutItems = items;
      this.checkOutItems.forEach(item => {
        this.totalSum = this.totalSum + item.totalPrice;
      });
    });
    this.tomorrowDate.setDate( this.tomorrowDate.getDate() + 1 );

  }
  openPrint() {
    window.print();
  }
}
