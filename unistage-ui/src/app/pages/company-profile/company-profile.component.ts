import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 transition-colors duration-300">
      <div class="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">

        <div class="bg-slate-900 dark:bg-black px-8 py-6">
          <h1 class="text-2xl font-bold text-white">Profil Entreprise</h1>
          <p class="text-slate-400 text-sm mt-1">Présentez votre entreprise aux futurs talents.</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="p-8 space-y-6">

          <div>
            <h3 class="text-sm uppercase tracking-wider text-slate-500 font-bold mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Identité</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Nom de l'entreprise</label>
                <input type="text" [(ngModel)]="companyName" name="companyName" required
                       class="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white">
              </div>
              <div>
                <label class="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Email Contact</label>
                <input type="email" [(ngModel)]="email" name="email" readonly
                       class="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-500 border border-transparent cursor-not-allowed dark:bg-slate-950 dark:text-slate-500">
              </div>
              <div>
                 <label class="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Site Web</label>
                 <input type="url" [(ngModel)]="website" name="website" placeholder="https://"
                        class="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white">
              </div>
              <div>
                 <label class="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Téléphone</label>
                 <input type="text" [(ngModel)]="phone" name="phone" required
                        class="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white">
              </div>
            </div>
          </div>

          <div>
             <label class="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Adresse / Siège</label>
             <input type="text" [(ngModel)]="address" name="address" required
                    class="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white">
          </div>

          <div>
            <h3 class="text-sm uppercase tracking-wider text-slate-500 font-bold mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 mt-4">À propos</h3>
            <label class="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
            <textarea [(ngModel)]="description" name="description" rows="4" placeholder="Parlez-nous de votre culture, vos missions..."
                      class="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"></textarea>
          </div>

          <div>
            <h3 class="text-sm uppercase tracking-wider text-slate-500 font-bold mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Logo</h3>
            <div class="flex items-center gap-4">
              <div class="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-600">
                 <span *ngIf="!logoFile" class="text-xs text-slate-400">Logo</span>
                 <span *ngIf="logoFile" class="text-xs font-bold text-orange-600">OK</span>
              </div>
              <label class="cursor-pointer px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                 Choisir une image
                 <input type="file" (change)="onFileSelected($event)" class="hidden" accept="image/*">
              </label>
            </div>
            <p *ngIf="logoFile" class="mt-2 text-sm text-green-600">{{ logoFile.name }}</p>
          </div>

          <div class="pt-4 border-t border-gray-100 dark:border-slate-800">
             <div *ngIf="error" class="mb-4 text-red-500">{{ error }}</div>
             <div *ngIf="success" class="mb-4 text-green-500">{{ success }}</div>
             <button type="submit" class="w-full md:w-auto px-8 py-3 bg-slate-900 dark:bg-orange-600 text-white font-bold rounded-lg shadow hover:opacity-90 transition-all">
               Sauvegarder les informations
             </button>
          </div>

        </form>
      </div>
    </div>
  `
})
export class CompanyProfileComponent implements OnInit {
  companyName = '';
  email = '';
  phone = '';
  address = '';
  website = '';
  description = '';
  logoFile: File | null = null;
  error: string = '';
  success: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.email = payload.sub;
      } catch(e){}
    }
  }
  onFileSelected(event: any) { this.logoFile = event.target.files[0]; }
  onSubmit() {
    if (!this.companyName || !this.phone || !this.address) {
      this.error = 'Veuillez remplir les champs requis'; return;
    }
    this.success = 'Profil sauvegardé (Simulation)';
    setTimeout(() => this.router.navigate(['/company/dashboard']), 1000);
  }
}
