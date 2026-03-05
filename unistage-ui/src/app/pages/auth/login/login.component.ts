import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service'; // Adjust path as needed
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">

        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Bon retour!</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-2">Connectez-vous pour accéder à votre espace.</p>
        </div>

        <button type="button" (click)="loginWithGoogle()" class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all mb-6 group">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google Logo">
          <span class="text-slate-700 dark:text-slate-200 font-medium group-hover:text-slate-900 dark:group-hover:text-white">Continuer avec Google</span>
        </button>

        <div class="relative mb-6">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200 dark:border-slate-700"></div></div>
          <div class="relative flex justify-center text-sm"><span class="px-2 bg-white dark:bg-slate-900 text-slate-500">ou avec votre email</span></div>
        </div>

        <form (ngSubmit)="onLogin()" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="nom@exemple.com"
                   class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-white">
          </div>

          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Mot de passe</label>
              <a routerLink="/forgot-password" class="text-sm font-medium text-orange-600 hover:text-orange-500 hover:underline">Mot de passe oublié ?</a>
            </div>
            <input type="password" [(ngModel)]="password" name="password" required placeholder="••••••••"
                   class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-white">
          </div>

          <div *ngIf="errorMessage" class="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ errorMessage }}
          </div>

          <button type="submit" [disabled]="isLoading"
                  class="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 disabled:opacity-70 disabled:cursor-not-allowed">
            <span *ngIf="!isLoading">Se connecter</span>
            <span *ngIf="isLoading" class="flex items-center justify-center gap-2">
               <svg class="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
               Connexion...
            </span>
          </button>
        </form>

        <p class="text-center mt-8 text-slate-600 dark:text-slate-400">
          Pas encore de compte ?
          <a routerLink="/register" class="font-bold text-slate-900 dark:text-white hover:underline">Créer un compte</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  //  Inject HttpClient in the constructor
constructor(private authService: AuthService, private router: Router) {}

onLogin() {
  this.isLoading = true;
  const credentials = { email: this.email, password: this.password };

  this.authService.login(credentials).subscribe({
    next: () => {
      this.isLoading = false;
      // Now that we have the token, we can go to the dashboard
      this.router.navigate(['/student/dashboard']);
    },
    error: (err: any) => {
      this.isLoading = false;
      this.errorMessage = "Email ou mot de passe incorrect.";
    }
  });
}

  // ... rest of your code
  loginWithGoogle() {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  }
}


