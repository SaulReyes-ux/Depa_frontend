import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StayService } from '../services/stay.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AccountExpirationService } from '../services/account-expiration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private stayService: StayService,
    private translate: TranslateService,
    private accountExpirationService: AccountExpirationService) {
    translate.setDefaultLang('en')
    translate.use('en')
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.accountExpirationService.init();
    });
  }

  ngOnInit() {
    this.accountExpirationService.init();
  }

  title = 'airbnb';
}
