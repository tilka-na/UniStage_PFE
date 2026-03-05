import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // 👈 Zdt RouterModule hna
import { OffresListComponent } from './components/offres-list/offres-list';
import { OffreDetailsComponent } from './components/offre-details/offre-details';
import { RecruiterDashboardComponent } from './components/recruiter-dashboard/recruiter-dashboard';
import { InternshipDetailsComponent } from './components/internship-details/internship-details'; 

export const routes: Routes = [
  { path: '', component: OffresListComponent },
  { path: 'offres', component: OffresListComponent },
  { path: 'dashboard', component: RecruiterDashboardComponent },
  { path: 'offres/:id', component: OffreDetailsComponent },
  { path: 'internship/:id', component: InternshipDetailsComponent },
  { path: 'internship', component: InternshipDetailsComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }