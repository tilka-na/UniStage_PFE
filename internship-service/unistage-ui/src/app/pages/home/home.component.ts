// pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="
    bg-white text-gray-900
    dark:bg-[#0a0f1e] dark:text-white
  ">

      <!-- HERO -->
      <section class="relative overflow-hidden">
        <div class="
        absolute inset-0
        bg-gradient-to-br
        from-blue-500/10 via-transparent to-yellow-400/10
        dark:from-orange-500/10 dark:to-purple-500/10
      "></div>

        <div class="max-w-7xl mx-auto px-6 py-24 relative text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Trouvez le
            <span class="text-blue-600 dark:text-orange-500">
            Stage Parfait
          </span>
            <br />pour Votre Avenir
          </h1>

          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            UniStage connecte les étudiants talentueux avec les meilleures
            opportunités de stage dans les entreprises innovantes du Maroc.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/student-dashboard"
               class="px-8 py-4 rounded-lg font-semibold text-lg
                    bg-blue-600 text-white
                    dark:bg-orange-500">
              Je cherche un stage
            </a>

            <a routerLink="/company-dashboard"
               class="px-8 py-4 rounded-lg font-semibold text-lg border
                    border-blue-600 text-blue-600
                    hover:bg-blue-600 hover:text-white
                    dark:border-orange-500 dark:text-orange-500
                    dark:hover:bg-orange-500 dark:hover:text-white">
              Je recrute des stagiaires
            </a>
          </div>
        </div>
      </section>

      <!-- STATS -->
      <section class="
      py-16
      bg-gray-100
      dark:bg-[#141b2e]
    ">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div *ngFor="let stat of stats">
              <div class="text-4xl font-bold text-blue-600 dark:text-orange-500 mb-2">
                {{ stat.value }}
              </div>
              <div class="text-gray-600 dark:text-gray-400">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FEATURES -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold mb-4">
              Pourquoi choisir UniStage ?
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400">
              La plateforme complète pour votre recherche de stage
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div *ngFor="let feature of features"
                 class="p-8 rounded-xl border
                      bg-white border-gray-200
                      dark:bg-[#141b2e] dark:border-gray-800
                      hover:border-blue-600 dark:hover:border-orange-500">

              <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4
                        bg-blue-500/10 dark:bg-orange-500/10">
                <div class="text-blue-600 dark:text-orange-500"
                     [innerHTML]="feature.icon">
                </div>
              </div>

              <h3 class="text-xl font-semibold mb-3">
                {{ feature.title }}
              </h3>

              <p class="text-gray-600 dark:text-gray-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  `
})

export class HomeComponent {
  stats = [
    { value: '5000+', label: 'Étudiants inscrits' },
    { value: '1200+', label: 'Offres de stage' },
    { value: '500+', label: 'Entreprises partenaires' },
    { value: '95%', label: 'Taux de satisfaction' }
  ];

  features = [
    {
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',
      title: 'Recherche Intelligente',
      description: 'Trouvez des opportunités qui correspondent parfaitement à votre profil et vos ambitions.'
    },
    {
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
      title: 'Profil Professionnel',
      description: 'Créez un profil détaillé qui met en valeur vos compétences et expériences.'
    },
    {
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      title: 'Suivi Simplifié',
      description: 'Gérez toutes vos candidatures en un seul endroit avec un tableau de bord intuitif.'
    }
  ];

  steps = [
    {
      title: 'Créez votre profil',
      description: 'Inscrivez-vous gratuitement et complétez votre profil en quelques minutes.'
    },
    {
      title: 'Postulez aux offres',
      description: 'Parcourez les offres et postulez en un clic aux stages qui vous intéressent.'
    },
    {
      title: 'Décrochez votre stage',
      description: 'Les entreprises consultent votre profil et vous contactent pour un entretien.'
    }
  ];
}
