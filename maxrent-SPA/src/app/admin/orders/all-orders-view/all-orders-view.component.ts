import { Component, OnInit } from '@angular/core';
import { OrderForUserView } from '../../../_models/order-models/order-for-user-view';
import { Pagination, PaginatedResult } from '../../../_models/pagination';
import { OrdersService } from '../../../_services/orders/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-orders-view',
  templateUrl: './all-orders-view.component.html',
  styleUrls: ['./all-orders-view.component.scss']
})
export class AllOrdersViewComponent implements OnInit {

  orders: OrderForUserView[];
  pagination: Pagination;
  constructor(private toastrService: ToastrService, private orderService: OrdersService) { }

  ngOnInit() {
    this.pagination = new Pagination();
    this.pagination.currentPage = 1;
    this.pagination.itemsPerPage = 3;
    this.loadOrders();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getPaginatedOrdersForAdmin(this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((res: PaginatedResult<OrderForUserView[]>) => {
        this.orders = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.toastrService.error(error);
      });
  }

  changeState(id, state) {
    this.orderService.changeOrderState(id, state).subscribe( () => {
      this.toastrService.success('Būsena sėkmingai pakeista');
      this.loadOrders();
    });
  }
}
