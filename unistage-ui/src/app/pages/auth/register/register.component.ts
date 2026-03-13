import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">

        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Créer un compte</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-2">Rejoignez la communauté Unistage.</p>
        </div>

        <button type="button" (click)="signupWithGoogle()" class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all mb-6 group">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google Logo">
          <span class="text-slate-700 dark:text-slate-200 font-medium group-hover:text-slate-900 dark:group-hover:text-white">S'inscrire avec Google</span>
        </button>

        <div class="relative mb-6">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200 dark:border-slate-700"></div></div>
          <div class="relative flex justify-center text-sm"><span class="px-2 bg-white dark:bg-slate-900 text-slate-500">ou avec votre email</span></div>
        </div>

        <form (ngSubmit)="onRegister()" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Prénom</label>
              <input type="text" [(ngModel)]="registerData.firstName" name="firstName" required class="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500 outline-none dark:text-white">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Nom</label>
              <input type="text" [(ngModel)]="registerData.lastName" name="lastName" required class="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500 outline-none dark:text-white">

            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Email</label>
            <input type="email" [(ngModel)]="registerData.email" name="email" required class="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500 outline-none dark:text-white">

          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Mot de passe</label>
            <input type="password" [(ngModel)]="registerData.password" name="password" required class="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500 outline-none dark:text-white">
           
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-2">Je suis un(e)...</label>
            <div class="grid grid-cols-2 gap-3">
              <button type="button" (click)="setRole('STUDENT')"
                      [class]="registerData.role === 'STUDENT' ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'"
                      class="py-2.5 rounded-lg border text-sm font-semibold transition-all">
                Étudiant
              </button>
              <button type="button" (click)="setRole('RECRUITER')"
                      [class]="registerData.role === 'RECRUITER' ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'"

                      class="py-2.5 rounded-lg border text-sm font-semibold transition-all">
                Recruteur
              </button>
            </div>
          </div>

          <button type="submit" [disabled]="isLoading"
                  class="w-full py-3.5 mt-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/30 disabled:opacity-70">
            <span *ngIf="!isLoading">Créer mon compte</span>
            <span *ngIf="isLoading">Création en cours...</span>
          </button>
        </form>

        <p class="text-center mt-6 text-sm text-slate-600 dark:text-slate-400">
          En vous inscrivant, vous acceptez nos <a href="#" class="underline">Conditions d'utilisation</a>.
        </p>

        <div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <p class="text-slate-600 dark:text-slate-400">Déjà inscrit ? <a routerLink="/login" class="font-bold text-orange-600 hover:underline">Se connecter</a></p>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  isLoading = false;

  // This object perfectly matches your Spring Boot backend's expected JSON
  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'STUDENT'
  };

  constructor(private authService: AuthService, private router: Router) {}

  // Update role when they click the buttons
  setRole(selectedRole: 'STUDENT' | 'RECRUITER') {
    this.registerData.role = selectedRole;
  }

  onRegister() {
    this.isLoading = true;

    // Make the REAL API call to your database
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        // At this point, they are successfully in the DB and logged in.
        // Now the AuthGuard will allow them into the dashboard!
        if (this.registerData.role === 'STUDENT') {
          this.router.navigate(['/student/profile']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur lors de la création du compte:', err);
        alert('Échec de l\'inscription. Vérifiez vos informations.');
      }
    });

  }

  signupWithGoogle() {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  }

}
