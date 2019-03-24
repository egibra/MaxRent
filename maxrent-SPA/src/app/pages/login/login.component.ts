import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  isLoggedIn = false;
  constructor(public authService: AuthService, private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(isLoggedIn =>
      this.isLoggedIn = isLoggedIn);
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.toastrService.success('Welcome back ' + this.capitalize(this.model.username));
      this.router.navigate(['/home']);
    }, error => {
      this.toastrService.error(error);
    });
  }

  capitalize(s: string) {
      return s[0].toUpperCase() + s.slice(1);
  }
}
