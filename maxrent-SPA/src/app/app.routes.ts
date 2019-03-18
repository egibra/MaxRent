import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './shop/home/home.component';
import { AppComponent } from './app.component';
import { ProductAccordianComponent } from './shop/product/product-details/product-accordian/product-accordian.component';
import { CollectionLeftSidebarComponent } from './shop/product/collection/collection-left-sidebar/collection-left-sidebar.component';
import { CollectionRightSidebarComponent } from './shop/product/collection/collection-right-sidebar/collection-right-sidebar.component';
import { CollectionNoSidebarComponent } from './shop/product/collection/collection-no-sidebar/collection-no-sidebar.component';
import { ProductColumnComponent } from './shop/product/product-details/product-column/product-column.component';
import { WishlistComponent } from './shop/product/wishlist/wishlist.component';
import { ProductCompareComponent } from './shop/product/product-compare/product-compare.component';
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
import { GridTwoColComponent } from './pages/portfolio/grid-two-col/grid-two-col.component';
import { GridThreeColComponent } from './pages/portfolio/grid-three-col/grid-three-col.component';
import { GridFourColComponent } from './pages/portfolio/grid-four-col/grid-four-col.component';
import { MasonaryTwoGridComponent } from './pages/portfolio/masonary-two-grid/masonary-two-grid.component';
import { MasonaryThreeGridComponent } from './pages/portfolio/masonary-three-grid/masonary-three-grid.component';
import { MasonaryFourGridComponent } from './pages/portfolio/masonary-four-grid/masonary-four-grid.component';
import { MasonaryFullwidthComponent } from './pages/portfolio/masonary-fullwidth/masonary-fullwidth.component';
import { ProfitChartComponent } from './admin/profit-chart/profit-chart.component';
import { ExpensesChartComponent } from './admin/expenses/expenses-chart/expenses-chart.component';
import { ExpensesListComponent } from './admin/expenses/expenses-list/expenses-list.component';

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
    path: 'expenses-chart',
    component: ExpensesChartComponent
  },
  {
    path: 'expenses-list',
    component: ExpensesListComponent
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
    path: 'wishlist',
    component: WishlistComponent
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
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'grid/two/column',
    component: GridTwoColComponent
  },
  {
    path: 'grid/three/column',
    component: GridThreeColComponent
  },
  {
    path: 'grid/four/column',
    component: GridFourColComponent
  },
  {
    path: 'grid/two/masonary',
    component: MasonaryTwoGridComponent
  },
  {
    path: 'grid/three/masonary',
    component: MasonaryThreeGridComponent
  },
  {
    path: 'grid/four/masonary',
    component: MasonaryFourGridComponent
  },
  {
    path: 'fullwidth/masonary',
    component: MasonaryFullwidthComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

