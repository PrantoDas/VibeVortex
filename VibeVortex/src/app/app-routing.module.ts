import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsfeedComponent } from './features/newsfeed/newsfeed.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: '', component: NewsfeedComponent },
  { path: '*', component: NewsfeedComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
