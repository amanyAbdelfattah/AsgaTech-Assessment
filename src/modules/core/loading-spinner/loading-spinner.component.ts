import { Component, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingSpinnerService } from 'src/services/loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnDestroy{
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    public loader: LoadingSpinnerService
    ) {
    const routerSubscription = router.events.subscribe((event) => {
      this.navigationInterceptor(event as RouterEvent);
    });
    this.subscriptions.push(routerSubscription);
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
        this.loader.start();
    }
    if (event instanceof NavigationEnd) {
        this.loader.stop();
    }
    if (event instanceof NavigationCancel) {
        this.loader.stop();
    }
    if (event instanceof NavigationError) {
        this.loader.stop();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
