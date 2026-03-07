import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      <div class="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 class="text-2xl font-bold">Espace Recruteur</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Gérez vos offres et votre image de marque.</p>
          </div>
          <div class="flex gap-3">
             <button (click)="goToProfile()" class="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-sm font-semibold transition-colors">
               Gérer le profil
             </button>
             <button class="px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-orange-600 text-white text-sm font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
               Nouvelle Offre
             </button>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 py-8">

        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-bold flex items-center gap-2">
            <span class="w-2 h-6 bg-orange-500 rounded-full"></span>
            Mes Offres Actives
          </h2>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden min-h-[300px]">

          <div *ngIf="offers.length === 0" class="flex flex-col items-center justify-center h-full py-16 text-center">
            <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-800 dark:text-white">Aucune offre publiée</h3>
            <p class="text-slate-500 dark:text-slate-400 max-w-sm mt-2">Commencez à recruter les meilleurs talents en publiant votre première offre de stage.</p>
          </div>

          </div>
      </div>
    </div>
  `
})
export class CompanyDashboardComponent {
  companyName = 'TechCorp Morocco';
  offers = []; // Empty for now
  constructor(private router: Router) {}
  goToProfile() { this.router.navigate(['/company/profile']); }
}




