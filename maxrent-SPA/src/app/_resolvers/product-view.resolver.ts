import { Product } from '../_models/product-models/product';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductsService } from '../_services/products/products.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductViewResolver implements Resolve<Product> {

    constructor(private productService: ProductsService) {
        console.log('resolver constructor initiated');
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        console.log('startedresolving some shit');
        console.log(route.params);
        return this.productService.getProductById(route.paramMap.get('id'));
   }
}
