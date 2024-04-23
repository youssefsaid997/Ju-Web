import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { ContestComponent } from './Components/contest/contest.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { GroupComponent } from './Components/group/group.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { ProblemComponent } from './Components/problem/problem.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ProtectedAuthGuard } from './Guards/auth.guard';
import { ProblemDetailsComponent } from './Components/problem-details/problem-details.component';
import { SubmitProblemComponent } from './Components/submit-problem/submit-problem.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',

    // lazy loading for the component;
    loadComponent: () =>
      import('./Components/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'problem',
    canActivate: [ProtectedAuthGuard],
    component: ProblemComponent,
  },
  {
    path: 'contest',
    canActivate: [ProtectedAuthGuard],
    component: ContestComponent,
  },
  {
    path: 'group',
    canActivate: [ProtectedAuthGuard],
    component: GroupComponent,
  },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  {
    path: 'changePassword',
    canActivate: [ProtectedAuthGuard],
    component: ChangePasswordComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'problem/:source/:problemCode', component: ProblemDetailsComponent },
  { path: 'submit', component: SubmitProblemComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
