import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PagesComponent } from './components/admin/pages/pages.component';
import { SettingsComponent } from './components/admin/settings/settings.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'sigin', component: SigninComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'pages', component: PagesComponent},
    {path: 'settings', component: SettingsComponent}
  ]}
  // {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
