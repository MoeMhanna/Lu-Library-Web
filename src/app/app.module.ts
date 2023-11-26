import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideBootstrapEffects } from '../utils';
import { TopNavBarModule } from './top-nav-bar/top-nav-bar.module';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { UsersModule } from './users/users.module';
import { HttpClientModule } from '@angular/common/http';
import { USERS_KEY, UsersReducer } from './users/+state/users.reducers';
import { UsersEffects } from './users/+state/users.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPopoverBoxModule } from './popover-box/mat-popover-box.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPopoverBoxModule,
    OverlayModule,
    StoreModule.forRoot({
      [USERS_KEY]: UsersReducer
    }, {
      runtimeChecks: {
        strictActionTypeUniqueness: true,
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    EffectsModule.forRoot([
      UsersEffects
    ]),
    TopNavBarModule,
    UsersModule
  ],
  providers: [
    provideBootstrapEffects([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(protected library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
