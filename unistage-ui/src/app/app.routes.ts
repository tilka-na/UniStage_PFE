import { Routes } from '@angular/router';

// --- YOUR IMPORTS ---
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';

// --- YOUR FRIEND'S IMPORTS (Corrected Paths) ---
import { OffresListComponent } from './components/offres-list/offres-list';
import { OffreDetailsComponent } from './components/offre-details/offre-details';
import { RecruiterDashboardComponent } from './components/recruiter-dashboard/recruiter-dashboard';
import { InternshipDetailsComponent } from './components/internship-details/internship-details';

export const routes: Routes = [
  // YOUR MAIN ROUTE
  { path: '', component: HomeComponent },

  // YOUR AUTH ROUTES
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // YOUR STUDENT ROUTES
  {
    path: 'student',
    children: [
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'profile', component: StudentProfileComponent },
    ]
  },

  // YOUR FRIEND'S EXACT ROUTES
  { path: 'offres', component: OffresListComponent },
  { path: 'dashboard', component: RecruiterDashboardComponent },
  { path: 'offres/:id', component: OffreDetailsComponent },
  { path: 'internship/:id', component: InternshipDetailsComponent },
  { path: 'internship', component: InternshipDetailsComponent },

  // 404 FALLBACK (Must remain at the very bottom!)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

