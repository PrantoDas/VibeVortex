import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from "./features/layout/footer/footer.component";
import { NotificationsComponent } from "./features/notifications/notifications.component";
import { SearchComponent } from "./features/search/search.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './core/store/auth.reducer';
import { AuthEffects } from './core/store/auth.effects';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatSnackBarModule,
        MatButtonModule,

        FooterComponent,
        NotificationsComponent,
        SearchComponent,
        StoreModule.forRoot({ auth: authReducer }),
        EffectsModule.forRoot([AuthEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ]
})
export class AppModule { }
