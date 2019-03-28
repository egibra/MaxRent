import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopModule } from './shop/shop.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { rootRouterConfig } from './app.routes';
import { PaginationModule } from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AdminModule } from './admin/admin.module';
import { ProductViewResolver } from './_resolvers/product-view.resolver';
import { SafePipe } from './_services/safe-pipe/safe-pipe';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent
      ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    PagesModule,
    ShopModule,
    AdminModule,
    SharedModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth']
      }
  }),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: false,
      enableHtml: true,
    }),
    RouterModule.forRoot(rootRouterConfig)
  ],
  providers: [ ProductViewResolver ],
  bootstrap: [AppComponent]
})
export class AppModule { }
