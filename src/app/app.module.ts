import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AdminComponent } from './components/admin/admin.component';

// Services
import { JwtInterceptorService } from './services/jwtInterceptor/jwt-interceptor.service';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PagesComponent } from './components/admin/pages/pages.component';
import { SettingsComponent } from './components/admin/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    AdminComponent,
    DashboardComponent,
    PagesComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
