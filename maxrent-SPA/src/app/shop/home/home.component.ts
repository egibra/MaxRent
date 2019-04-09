import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from 'src/app/_services/products/products.service';
import { Product } from '../../_models/product-models/product';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public products: Product[] = [];

  constructor(private _productsService: ProductsService) {   }

  ngOnInit() {
    this._productsService.getAllProducts().subscribe(products => {
        this.products = products;
        console.log(this.products);
      });
  //    document.getElementsByClassName('header-type')[0].classList.add('green-gradient');
  //    document.getElementsByClassName('footer-type')[0].classList.add('footer-5');
  //    // Change Heder logo
  //    document.getElementsByClassName('headerlogo')[0].innerHTML = '<img src=\'assets/images/icon/logo-3.png\'>';
  // //
}

}
