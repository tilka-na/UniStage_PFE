import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-[80vh] flex items-center justify-center p-4 transition-colors duration-300">

      <div class="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 relative overflow-hidden transition-all duration-300">

        <div class="absolute top-0 right-0 w-32 h-32 bg-amber-100 dark:bg-amber-900/30 rounded-bl-full -mr-8 -mt-8 transition-colors"></div>

        <div class="relative z-10">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Créer un compte Étudiant</h2>
          <p class="text-gray-500 dark:text-slate-400 mb-8">Rejoignez UniStage pour trouver votre stage idéal.</p>

          <form>
            <div class="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Prénom</label>
                <input type="text"
                       class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                       placeholder="Yassine">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Nom</label>
                <input type="text"
                       class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                       placeholder="Benali">
              </div>
            </div>

            <div class="mb-5">
              <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Email Universitaire</label>
              <input type="email"
                     class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                     placeholder="etudiant@umi.ac.ma">
            </div>

            <div class="mb-8">
              <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Mot de passe</label>
              <input type="password"
                     class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                     placeholder="••••••••">
            </div>

            <button type="button" class="w-full text-white bg-amber-500 hover:bg-amber-600 font-bold rounded-lg px-5 py-3 shadow-lg hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5">
              S'inscrire
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Déjà un compte ? <a routerLink="/login-student" class="text-amber-600 dark:text-amber-400 hover:underline font-semibold">Se connecter</a>
          </p>
        </div>
      </div>
    </section>
  `
})
export class RegisterStudentComponent {}
