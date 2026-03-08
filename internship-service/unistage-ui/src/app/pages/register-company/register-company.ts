import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-[80vh] flex items-center justify-center p-4 transition-colors duration-300">
      <div class="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 relative transition-all">

        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Inscription Entreprise</h2>
        <p class="text-gray-500 dark:text-slate-400 mb-8">Créez un profil pour publier vos offres.</p>

        <form>
          <div class="mb-5">
            <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Nom de l'entreprise</label>
            <input type="text"
                   class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                   placeholder="Ex: Tech Solutions">
          </div>

          <div class="mb-5">
            <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Email Professionnel</label>
            <input type="email"
                   class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                   placeholder="contact@entreprise.com">
          </div>

          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Mot de passe</label>
            <input type="password"
                   class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                   placeholder="••••••••">
          </div>

          <button type="button" class="w-full text-white bg-cyan-600 hover:bg-cyan-700 font-bold rounded-lg px-5 py-3 shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5">
            Créer Compte Entreprise
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Déjà inscrit ? <a routerLink="/login-company" class="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">Connexion</a>
        </p>
      </div>
    </section>
  `
})
export class RegisterCompanyComponent {}
