import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BarRatingModule } from 'ngx-bar-rating';
import { RangeSliderModule  } from 'ngx-rangeslider-component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxImgZoomModule } from 'ngx-img-zoom';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

// home- components
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './home/slider/slider.component';
import { AboutComponent } from './home/about/about.component';
import { CollectionBannerComponent } from './home/collection-banner/collection-banner.component';
import { InformationComponent } from './home/information/information.component';
import { ProductSliderComponent } from './home/product-slider/product-slider.component';
import { ProductTabComponent } from './home/product-tab/product-tab.component';
import { BlogComponent } from './home/blog/blog.component';
import { LogoComponent } from './home/logo/logo.component';
// Products Components
import { ProductComponent } from './product/product.component';
import { ProductBoxHoverComponent } from './product/product-box-hover/product-box-hover.component';
import { CollectionLeftSidebarComponent } from './product/collection/collection-left-sidebar/collection-left-sidebar.component';
import { CollectionRightSidebarComponent } from './product/collection/collection-right-sidebar/collection-right-sidebar.component';
import { CollectionNoSidebarComponent } from './product/collection/collection-no-sidebar/collection-no-sidebar.component';
import { ColorComponent } from './product/collection/filter/color/color.component';
import { BrandComponent } from './product/collection/filter/brand/brand.component';
import { PriceComponent } from './product/collection/filter/price/price.component';
import { ProductAccordianComponent } from './product/product-details/product-accordian/product-accordian.component';
import { RelatedProductsComponent } from './product/product-details/related-products/related-products.component';
import { SidebarComponent } from './product/product-details/sidebar/sidebar.component';
import { CategoriesComponent } from './product/widgets/categories/categories.component';
import { QuickViewComponent } from './product/widgets/quick-view/quick-view.component';
import { ModalCartComponent } from './product/widgets/modal-cart/modal-cart.component';
import { NewProductComponent } from './product/widgets/new-product/new-product.component';
import { SearchComponent } from './product/search/search.component';
import { CartComponent } from './product/cart/cart.component';
import { ExitPopupComponent } from './product/widgets/exit-popup/exit-popup.component';
import { AgeVerificationComponent } from './product/widgets/age-verification/age-verification.component';
import { NewsletterComponent } from './product/widgets/newsletter/newsletter.component';
import { SafePipe } from '../_services/safe-pipe/safe-pipe';
import { CheckoutComponent } from './product/checkout/checkout.component';
import { SuccessComponent } from './product/success/success.component';

@NgModule({
  exports: [ExitPopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShopRoutingModule,
    SharedModule,
    SlickCarouselModule,
    BarRatingModule,
    RangeSliderModule,
    InfiniteScrollModule,
    DateRangePickerModule,
    NgxPayPalModule,
    NgxImgZoomModule
  ],
  declarations: [
    // home
    SafePipe,
    HomeComponent,
    SliderComponent,
    AboutComponent,
    CollectionBannerComponent,
    InformationComponent,
    ProductSliderComponent,
    ProductTabComponent,
    BlogComponent,
    LogoComponent,
    // Product
    ProductComponent,
    ProductBoxHoverComponent,
    CollectionLeftSidebarComponent,
    CollectionRightSidebarComponent,
    CollectionNoSidebarComponent,
    ColorComponent,
    BrandComponent,
    PriceComponent,
    ProductAccordianComponent,
    RelatedProductsComponent,
    SidebarComponent,
    CategoriesComponent,
    QuickViewComponent,
    ModalCartComponent,
    NewProductComponent,
    SearchComponent,
    CartComponent,
    ExitPopupComponent,
    AgeVerificationComponent,
    NewsletterComponent,
    CheckoutComponent,
    SuccessComponent
  ]
})
export class ShopModule { }
