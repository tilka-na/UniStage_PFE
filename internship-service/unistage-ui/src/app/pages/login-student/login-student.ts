import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-student',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-[80vh] flex items-center justify-center p-4 transition-colors duration-300">
      <div class="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden relative transition-all">

        <div class="h-2 w-full bg-gradient-to-r from-amber-400 to-orange-600"></div>

        <div class="p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Espace Étudiant</h2>
          <p class="text-gray-500 dark:text-slate-400 mb-6">Connectez-vous pour voir les offres.</p>

          <form>
            <div class="mb-5">
              <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Email Académique</label>
              <input type="email"
                     class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                     placeholder="etudiant@umi.ac.ma">
            </div>

            <div class="mb-6">
              <div class="flex justify-between items-center mb-1">
                <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300">Mot de passe</label>
                <a href="#" class="text-xs text-amber-600 dark:text-amber-400 hover:underline">Oublié ?</a>
              </div>
              <input type="password"
                     class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                     placeholder="••••••••">
            </div>

            <button type="button" class="w-full text-white bg-amber-500 hover:bg-amber-600 font-bold rounded-lg px-5 py-3 shadow-lg hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5">
              Se Connecter
            </button>
          </form>

          <div class="mt-6 text-center text-sm space-y-2">
            <p class="text-gray-500 dark:text-gray-400">
              Nouveau sur UniStage ?
              <a routerLink="/register-student" class="text-amber-600 dark:text-amber-400 hover:underline font-semibold">Créer un compte</a>
            </p>
            <p class="text-xs text-gray-400">
              Vous êtes recruteur ?
              <a routerLink="/login-company" class="text-cyan-600 dark:text-cyan-400 hover:underline">Accéder à l'espace pro</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class LoginStudentComponent {}
