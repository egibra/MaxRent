import { Component, OnInit } from '@angular/core';
import { OrderForUserView } from 'src/app/_models/order-for-user-view';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { OrdersService } from 'src/app/_services/orders/orders.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orders: OrderForUserView[];
  pagination: Pagination;
  constructor(private toastrService: ToastrService, private orderService: OrdersService) { }

  ngOnInit() {
    this.pagination = new Pagination();
    this.pagination.currentPage = 1;
    this.pagination.itemsPerPage = 4;
    this.loadOrders();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadOrders();
  }

  loadOrders() {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));

    this.orderService.getPaginatedOrdersForUser(this.pagination.currentPage,
      this.pagination.itemsPerPage, currentUser.id).subscribe((res: PaginatedResult<OrderForUserView[]>) => {
        this.orders = res.result;
        this.pagination = res.pagination;
        console.log(this.orders);
      }, error => {
        this.toastrService.error(error);
      });
  }

}
