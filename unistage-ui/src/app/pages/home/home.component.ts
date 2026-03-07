import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="relative min-h-screen bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300 font-sans">

      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-orange-100/50 to-transparent dark:from-orange-900/10 pointer-events-none z-0"></div>
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none z-0"></div>

      <section class="relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div class="max-w-7xl mx-auto px-6 text-center">

          <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-8">
            Trouvez le stage <br class="hidden md:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-yellow-400">
            qui lance votre carrière
          </span>
          </h1>

          <p class="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            UniStage connecte les talents de demain aux entreprises leaders du Maroc.
            Une plateforme fluide, intelligente et pensée pour votre réussite.
          </p>

          <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4 items-center">
            <a routerLink="/register"
               class="group relative px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Commencer gratuitement
              <svg class="w-4 h-4 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>

            <a routerLink="/login"
               class="px-8 py-4 rounded-full text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Se connecter
            </a>
          </div>

        </div>
      </section>

      <section class="py-10 border-y border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
        <div class="max-w-7xl mx-auto px-6">
          <p class="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
            La confiance de +500 entreprises et écoles
          </p>
          <div class="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span class="text-xl font-bold text-slate-800 dark:text-white">EMSI</span>
            <span class="text-xl font-bold text-slate-800 dark:text-white">OCP Group</span>
            <span class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-1">
            <div class="w-4 h-4 bg-blue-600 rounded-sm"></div> Capgemini
          </span>
            <span class="text-xl font-bold text-slate-800 dark:text-white">ENSAM</span>
            <span class="text-xl font-bold text-slate-800 dark:text-white">Orange</span>
          </div>
        </div>
      </section>

      <section class="py-24 relative">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Tout pour réussir votre recherche</h2>
            <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Une suite d'outils conçue pour optimiser vos chances et simplifier la vie des recruteurs.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div class="md:col-span-2 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-700 transition duration-300 group overflow-hidden relative">
              <div class="relative z-10">
                <div class="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                  <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Recherche Intelligente</h3>
                <p class="text-slate-600 dark:text-slate-400">Ne perdez plus de temps. Notre algorithme filtre des milliers d'offres pour ne vous montrer que celles qui correspondent à 100% à votre profil académique.</p>
              </div>
              <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-orange-100 dark:bg-orange-900/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </div>

            <div class="md:row-span-2 p-8 rounded-3xl bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 text-white flex flex-col justify-between relative overflow-hidden group">
              <div class="relative z-10">
                <div class="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center mb-6">
                  <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 class="text-2xl font-bold mb-2">Profil Certifié</h3>
                <p class="text-slate-400">Générez un CV standardisé et validé qui met en avant vos compétences techniques et soft-skills.</p>
              </div>
              <div class="mt-8 relative h-40 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity">
                <div class="absolute top-4 left-4 right-4 h-2 bg-slate-600 rounded"></div>
                <div class="absolute top-8 left-4 w-1/2 h-2 bg-slate-600 rounded"></div>
              </div>
            </div>

            <div class="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Suivi Temps Réel</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400">Finis les "vus". Sachez exactement quand votre candidature est ouverte.</p>
            </div>

            <div class="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border border-blue-100 dark:border-blue-800">
              <h3 class="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">Dashboards RH</h3>
              <p class="text-sm text-blue-700 dark:text-blue-300">Pour les entreprises, une gestion centralisée des stagiaires.</p>
            </div>

          </div>
        </div>
      </section>

      <section class="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 32px 32px;"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
            <div class="p-4">
              <div class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">5k+</div>
              <div class="mt-2 text-slate-400 text-sm font-medium uppercase tracking-wider">Étudiants</div>
            </div>
            <div class="p-4">
              <div class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">1.2k</div>
              <div class="mt-2 text-slate-400 text-sm font-medium uppercase tracking-wider">Offres</div>
            </div>
            <div class="p-4">
              <div class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">500+</div>
              <div class="mt-2 text-slate-400 text-sm font-medium uppercase tracking-wider">Entreprises</div>
            </div>
            <div class="p-4">
              <div class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">98%</div>
              <div class="mt-2 text-slate-400 text-sm font-medium uppercase tracking-wider">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 px-6">
        <div class="max-w-5xl mx-auto bg-orange-600 dark:bg-orange-600 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-orange-500/40">
          <div class="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <h2 class="relative z-10 text-3xl md:text-5xl font-bold text-white mb-6">
            Votre avenir commence ici.
          </h2>
          <p class="relative z-10 text-orange-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Rejoignez la communauté UniStage et accédez aux meilleures opportunités de stage au Maroc en moins de 2 minutes.
          </p>

          <div class="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
            <a routerLink="/register" class="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition transform hover:scale-105 shadow-lg">
              Créer mon compte
            </a>
            <a routerLink="/login" class="px-8 py-4 bg-transparent border-2 border-orange-400 text-white font-bold rounded-xl hover:bg-orange-700 transition">
              Démo Entreprise
            </a>
          </div>
        </div>
      </section>

    </div>
  `
})
export class HomeComponent {}
