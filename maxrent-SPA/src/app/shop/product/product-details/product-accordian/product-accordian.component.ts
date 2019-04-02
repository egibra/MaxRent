import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { CartService } from '../../../../shared/services/cart.service';
import { Product } from 'src/app/_models/product';
import { ProductsService } from 'src/app/_services/products/products.service';
import { OrdersService } from 'src/app/_services/orders/orders.service';
import { ToastrService } from 'ngx-toastr';
import { OrderItemForCreation } from 'src/app/_models/order-item-for-creation';

@Component({
  selector: 'app-product-accordian',
  templateUrl: './product-accordian.component.html',
  styleUrls: ['./product-accordian.component.scss']
})
export class ProductAccordianComponent implements OnInit {

  public product:   Product;
  public products:   Product[] = [];
  public assetsCount = 1;
  public selectedSize:   any = '';
  dateFormat = 'yyyy/MM/dd';
  public start: Date = new Date ('2019-03-15');
  public end: Date = new Date ('2019-04-07');
  public locale = 'lt';
  value: Date;
  totalDays = 0;
  totalPrice = 0;
  AvailableQuantity = 0;
  constructor(private route: ActivatedRoute, private router: Router,
    public productsService: ProductsService, private cartService: CartService,
    private ordersService: OrdersService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data['product'];
    });

    this.productsService.getAllProducts().subscribe(product => this.products = product);
  }

  onChange(newDates: Date) {
    this.assetsCount = 1;
    this.totalDays = newDates[1].getDate() - newDates[0].getDate() + 1;
    this.value = newDates;
    this.calculateTotalPrice();
    this.ordersService.getAvailableAssetsCount(this.product.id, this.value[0],
    this.value[1]).subscribe(availableAssetsCount => {
      this.AvailableQuantity = availableAssetsCount;
      if (this.AvailableQuantity > 0) {
        this.toastrService.success('Laisvos kameros: ' + this.AvailableQuantity);
      } else {
        this.toastrService.error('Laisvų kamerų pasirinktu laikotarpiu nėra.');
      }
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.totalDays * this.product.priceForDay;
    if (this.value[0].getDay() === 6 && this.value[1].getDay() === 0) {
      this.totalPrice = this.product.priceForWeekend * this.assetsCount;
    }

    if (this.totalDays  === 7) {
      this.totalPrice = this.product.priceForWeek * this.assetsCount;
    }
    if (this.totalDays > 7) {
      const weeksCount = this.totalDays / 7;
      const daysCount = this.totalDays - (weeksCount * 7);
      this.totalPrice = (weeksCount * this.product.priceForWeek +
                        daysCount * this.product.priceForDay) * this.assetsCount;
    }
 }  // tslin}t:disable-next-line:member-ordering
  // tslint:disable-next-line:member-ordering
  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  };

  // tslint:disable-next-line:member-ordering
  public slideNavConfig = {
    vertical: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-slick',
    arrows: false,
    dots: false,
    focusOnSelect: true
  };

  public increment() {
      this.assetsCount += 1;
      this.calculateTotalPrice();
  }

  public decrement() {
      if (this.assetsCount >= 1) {
          this.assetsCount -= 1;
          this.calculateTotalPrice();
      }
  }


  // Add to cart
  public addToCart() {
     // tslint:disable-next-line:radix
     const orderItem: OrderItemForCreation = new OrderItemForCreation();
     orderItem.product = this.product;
     orderItem.assetsCount = this.assetsCount;
     orderItem.dateFrom = this.value[0];
     orderItem.dateTo = this.value[1];
     orderItem.totalPrice = this.totalPrice;
     this.cartService.addToCart(orderItem);
  }



  // Add to wishlist
  public addToWishlist(product: Product) {
  }

  // Change variant
  public changeSizeVariant(variant) {
     this.selectedSize = variant;
  }



}
