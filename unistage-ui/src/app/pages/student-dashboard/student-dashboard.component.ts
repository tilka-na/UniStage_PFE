import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12 transition-colors duration-300">

      <div class="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 pt-8 pb-12 px-6">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">
            Bonjour, <span class="text-orange-600">{{ studentName }}</span> 👋
          </h1>
          <p class="mt-2 text-slate-500 dark:text-slate-400">Prêt à booster votre carrière aujourd'hui ?</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div class="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
              <div class="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Candidatures</p>
                <p class="text-2xl font-bold text-slate-900 dark:text-white">0</p>
              </div>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
              <div class="p-3 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Vues Profil</p>
                <p class="text-2xl font-bold text-slate-900 dark:text-white">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 py-8">
        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-6">Que voulez-vous faire ?</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div class="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all cursor-pointer" routerLink="/internships">
            <div class="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h4 class="text-lg font-bold text-slate-900 dark:text-white">Trouver un stage</h4>
            <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Parcourez les offres exclusives et postulez en un clic.</p>
          </div>

          <div class="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all cursor-pointer" (click)="goToProfile()">
            <div class="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <h4 class="text-lg font-bold text-slate-900 dark:text-white">Mettre à jour mon profil</h4>
            <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Un profil complet augmente vos chances de 80%.</p>
          </div>

        </div>
      </div>
    </div>
  `
})
export class StudentDashboardComponent {
  studentName = 'Mohammed';
  constructor(private router: Router) {}
  goToProfile() { this.router.navigate(['/student/profile']); }
}
