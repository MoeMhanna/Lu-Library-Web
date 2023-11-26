import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from './service/token.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private isAuthenticated: boolean;
  private subscription$ = new Subscription();

  constructor(private tokenService: TokenService,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit(): void {
    this.authenticationSubscription();
    this.tokenService.$authenticationSubject.next(null);
  }

  protected authenticationSubscription() {
    const $authenticationSubscription = this.tokenService
      .$authenticationSubject
      .subscribe({
        next: async () => {
          this.isAuthenticated = this.tokenService.isAuthenticated;
          if (!this.isAuthenticated) {
            return await this.router.navigate(['/login']);
          }
          this.changeDetectorRef.detectChanges();
          return null;
        },
        error: (err) => {
          console.log(err);
        }
      });
    this.subscription$.add($authenticationSubscription);
  }
}
