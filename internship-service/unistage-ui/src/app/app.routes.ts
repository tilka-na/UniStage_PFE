import { Routes } from '@angular/router';
import { LoginCompanyComponent } from './pages/login-company/login-company';
import { RegisterStudentComponent } from './pages/register-student/register-student';
import {RegisterCompanyComponent} from './pages/register-company/register-company';
import {LoginStudentComponent} from './pages/login-student/login-student';
import { HomeComponent } from './pages/home/home.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';

export const routes: Routes = [
  { path: 'login-student', component: LoginStudentComponent },
  { path: 'register-student', component: RegisterStudentComponent },
  { path: 'login-company', component: LoginCompanyComponent },
  { path: 'register-company', component: RegisterCompanyComponent },
  { path: '', component: HomeComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'company-dashboard', component: CompanyDashboardComponent},
  { path: '**', redirectTo: '' }
];
