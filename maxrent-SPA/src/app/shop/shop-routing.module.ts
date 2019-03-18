import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CollectionLeftSidebarComponent } from './product/collection/collection-left-sidebar/collection-left-sidebar.component';
import { CollectionRightSidebarComponent } from './product/collection/collection-right-sidebar/collection-right-sidebar.component';
import { CollectionNoSidebarComponent } from './product/collection/collection-no-sidebar/collection-no-sidebar.component';
import { ProductColumnComponent } from './product/product-details/product-column/product-column.component';
import { ProductAccordianComponent } from './product/product-details/product-accordian/product-accordian.component';
import { WishlistComponent } from './product/wishlist/wishlist.component';
import { ProductCompareComponent } from './product/product-compare/product-compare.component';
import { CartComponent } from './product/cart/cart.component';
import { CheckoutComponent } from './product/checkout/checkout.component';
import { SuccessComponent } from './product/success/success.component';

// Routes
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'left-sidebar/collection/:category',
    component: CollectionLeftSidebarComponent
  },
  {
    path: 'right-sidebar/collection/:category',
    component: CollectionRightSidebarComponent
  },
  {
    path: 'no-sidebar/collection/:category',
    component: CollectionNoSidebarComponent
  },
  {
    path: 'column/product/:id',
    component: ProductColumnComponent
  },
  {
    path: 'accordian/product/:id',
    component: ProductAccordianComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: 'compare',
    component: ProductCompareComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'checkout/success',
    component: SuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
