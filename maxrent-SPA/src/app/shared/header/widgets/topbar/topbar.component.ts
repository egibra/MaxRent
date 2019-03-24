import { Component, OnInit } from '@angular/core';
import { Product } from '../../../classes/product';
import { WishlistService } from '../../../services/wishlist.service';
import { ProductsService } from '../../../../shared/services/products.service';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  userName: string;
  isLoggedIn = false;

  constructor(public productsService: ProductsService, public authService: AuthService,
    public toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
    this.authService.getUserName().subscribe(userName => this.userName = userName);
    this.authService.isLoggedIn().subscribe(isLoggedIn =>
      this.isLoggedIn = isLoggedIn);
   }
  capitalize(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }
  logout() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
