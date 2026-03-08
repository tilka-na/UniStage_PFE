import { Routes } from '@angular/router';

import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';


import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { AuthGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { OffresListComponent } from './components/offres-list/offres-list';
import { OffreDetailsComponent } from './components/offre-details/offre-details';
import { RecruiterDashboardComponent } from './components/recruiter-dashboard/recruiter-dashboard';
import { InternshipDetailsComponent } from './components/internship-details/internship-details';

export const routes: Routes = [
  // PUBLIC ROUTES
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'offres', component: OffresListComponent },
  { path: 'offres/:id', component: OffreDetailsComponent },
  { path: 'internship/:id', component: InternshipDetailsComponent },
  { path: 'internship', component: InternshipDetailsComponent },

  // STUDENT ROUTES
  {
    path: 'student',
    canActivate: [AuthGuard],
    data: { role: 'STUDENT' },
    children: [
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'profile', component: StudentProfileComponent },
    ]
  },

  // RECRUITER ROUTES
  {
    path: 'dashboard',
    component: RecruiterDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'RECRUITER' }
  },


  // 404 FALLBACK (Must be last)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
