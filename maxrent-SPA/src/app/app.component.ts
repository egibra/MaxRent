import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   public url: any;

   constructor(translate: TranslateService, private router: Router) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'lt']);
      this.router.events.subscribe((event) => {
         if (event instanceof NavigationEnd) {
           this.url = event.url;
         }
   });
   }

}
