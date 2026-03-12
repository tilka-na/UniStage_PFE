import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { AuthService } from '../../../services/auth.service';
=======
import { AuthService } from '../auth.service';
>>>>>>> origin/feat-last-push

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">

        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Mot de passe oublié ?</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-2">Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
        </div>

        <form *ngIf="!submitted" (ngSubmit)="onSubmit()" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email associé au compte</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="nom@exemple.com"
                   class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-white">
          </div>

          <button type="submit" [disabled]="isLoading"
                  class="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 disabled:opacity-70">
            <span *ngIf="!isLoading">Envoyer le lien</span>
            <span *ngIf="isLoading">Envoi en cours...</span>
          </button>
        </form>

        <div *ngIf="submitted" class="text-center animate-fade-in">
          <div class="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl mb-6 text-sm">
            Un email a été envoyé à <strong>{{ email }}</strong>. Vérifiez votre boîte de réception !
          </div>
          <button (click)="submitted = false" class="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white underline">
            Renvoyer l'email
          </button>
        </div>

        <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <a routerLink="/login" class="font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Retour à la connexion
          </a>
        </div>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  email = '';
  isLoading = false;
  submitted = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (!this.email) return;

    this.isLoading = true;
    this.errorMessage = '';


    this.authService.forgotPassword(this.email).subscribe({
<<<<<<< HEAD
      next: (response:any) => {
        this.isLoading = false;
        this.submitted = true;
      },
      error: (error:any) => {
=======
      next: (response) => {
        this.isLoading = false;
        this.submitted = true;
      },
      error: (error) => {
>>>>>>> origin/feat-last-push
        console.error('Erreur lors de l\'envoi:', error);
        this.isLoading = false;
        this.submitted = true;
      }
    });
  }
}
