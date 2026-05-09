import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-company',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-[80vh] flex items-center justify-center p-4 transition-colors duration-300">
      <div class="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden relative transition-all">

        <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-500"></div>

        <div class="p-8 pl-10">
          <div class="mb-6">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Espace Recruteur</h2>
            <p class="text-gray-500 dark:text-slate-400 mt-2">Gérez vos offres de stage.</p>
          </div>

          <form>
            <div class="mb-5">
              <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Email Professionnel</label>
              <input type="email"
                     class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                     placeholder="rh@entreprise.com">
            </div>

            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Mot de passe</label>
              <input type="password"
                     class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                     placeholder="••••••••">
            </div>

            <button type="button" class="w-full text-white bg-cyan-600 hover:bg-cyan-700 font-bold rounded-lg px-5 py-3 shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5">
              Connexion Recruteur
            </button>
          </form>

          <div class="mt-6 text-center text-sm">
            <p class="text-gray-500 dark:text-slate-400">
              Pas encore inscrit ?
              <a routerLink="/register-company" class="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">Créer un compte</a>
            </p>
            <p class="text-xs text-gray-400 mt-4">
              Vous êtes étudiant ?
              <a routerLink="/login-student" class="text-amber-500 hover:underline">Retour espace étudiant</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class LoginCompanyComponent {}
