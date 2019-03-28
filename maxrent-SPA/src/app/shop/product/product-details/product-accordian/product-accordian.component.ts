import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { CartService } from '../../../../shared/services/cart.service';
import { Product } from 'src/app/_models/product';
import { ProductsService } from 'src/app/_services/products/products.service';

@Component({
  selector: 'app-product-accordian',
  templateUrl: './product-accordian.component.html',
  styleUrls: ['./product-accordian.component.scss']
})
export class ProductAccordianComponent implements OnInit {

  public product:   Product;
  public products:   Product[] = [];
  public counter = 1;
  public selectedSize:   any = '';

  // Get Product By Id
  constructor(private route: ActivatedRoute, private router: Router,
    public productsService: ProductsService, private wishlistService: WishlistService,
    private cartService: CartService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data['product'];
    });
    // this.route.params.subscribe(params => {
    //   const id = +params['id'];
    //   console.log(id);
    //   this.productsService.getProductById(id).subscribe(product => this.product = product);
    // });
    this.productsService.getAllProducts().subscribe(product => this.products = product);
  }

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
      this.counter += 1;
  }

  public decrement() {
      if (this.counter > 1) {
          this.counter -= 1;
      }
  }


  // Add to cart
  public addToCart(product: Product, quantity) {
     // tslint:disable-next-line:radix
     this.cartService.addToCart(product, parseInt(quantity));
  }

  // Add to cart
  public buyNow(product: Product, quantity) {
     if (quantity > 0) {
       // tslint:disable-next-line:radix
       this.cartService.addToCart(product, parseInt(quantity));
     }
       this.router.navigate(['/home/checkout']);
  }

  // Add to wishlist
  public addToWishlist(product: Product) {
     this.wishlistService.addToWishlist(product);
  }

  // Change variant
  public changeSizeVariant(variant) {
     this.selectedSize = variant;
  }



}
