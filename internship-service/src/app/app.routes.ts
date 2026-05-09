import { Routes } from '@angular/router';
import { OffreDetailsComponent } from './components/offre-details/offre-details';
import { OffresListComponent } from './components/offres-list/offres-list'; 
import { RecruiterDashboardComponent } from './components/recruiter-dashboard/recruiter-dashboard';
export const routes: Routes = [
  { path: '', component: OffresListComponent }, // Page d'accueil
  { path: 'admin', component: RecruiterDashboardComponent }, // Page Admin
  { path: 'offres/:id', component: OffreDetailsComponent } // Détails de l'offre
];