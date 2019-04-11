import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './shop/home/home.component';
import { AppComponent } from './app.component';
import { ProductAccordianComponent } from './shop/product/product-details/product-accordian/product-accordian.component';
import { CollectionLeftSidebarComponent } from './shop/product/collection/collection-left-sidebar/collection-left-sidebar.component';
import { CollectionRightSidebarComponent } from './shop/product/collection/collection-right-sidebar/collection-right-sidebar.component';
import { CollectionNoSidebarComponent } from './shop/product/collection/collection-no-sidebar/collection-no-sidebar.component';
import { CartComponent } from './shop/product/cart/cart.component';
import { CheckoutComponent } from './shop/product/checkout/checkout.component';
import { SuccessComponent } from './shop/product/success/success.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LookbookComponent } from './pages/lookbook/lookbook.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './shop/product/search/search.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CompareComponent } from './pages/compare/compare.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ProfitChartComponent } from './admin/profit-chart/profit-chart.component';
import { ExpensesChartComponent } from './admin/expenses/expenses-chart/expenses-chart.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { AssetListComponent } from './admin/product-assets/asset-list/asset-list.component';
import { ProductViewResolver } from './_resolvers/product-view.resolver';
import { AssetDetailComponent } from './admin/product-assets/asset-detail/asset-detail.component';
import { AllOrdersViewComponent } from './admin/orders/all-orders-view/all-orders-view.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profit-chart',
    component: ProfitChartComponent
  },
  {
    path: 'products-list',
    component: AssetListComponent
  },
  {
    path: 'products-list/asset-detail/:id',
    component: AssetDetailComponent
  },
  {
    path: 'expenses-chart',
    component: ExpensesChartComponent
  },
  {
    path: 'all-orders-view',
    component: AllOrdersViewComponent
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
    path: 'accordian/product/:id',
    runGuardsAndResolvers: 'always',
    component: ProductAccordianComponent,
    resolve: { product: ProductViewResolver }
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'myorders',
    component: MyOrdersComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'checkout/success',
    component: SuccessComponent
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: 'lookbook',
    component: LookbookComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'collection',
    component: CollectionComponent
  },
  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'compare',
    component: CompareComponent
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'typography',
    component: TypographyComponent
  }

];

