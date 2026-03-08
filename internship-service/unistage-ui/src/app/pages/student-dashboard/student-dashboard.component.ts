import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen
              bg-gray-50 text-gray-900
              dark:bg-[#0a0f1e] dark:text-white">

      <div class="max-w-7xl mx-auto px-4 py-8">

        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold">Tableau de Bord Étudiant</h1>
          <p class="text-gray-500 dark:text-gray-400">
            Bienvenue, {{ studentName }}
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div *ngFor="let stat of dashboardStats"
               class="rounded-xl border p-6
                    bg-white border-gray-200
                    dark:bg-[#141b2e] dark:border-gray-800">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ stat.label }}
            </p>
            <p class="text-2xl font-bold mt-2">
              {{ stat.value }}
            </p>
          </div>

          <!-- Empty stats -->
          <div *ngIf="dashboardStats.length === 0"
               class="col-span-full text-center text-gray-500 py-6">
            Les statistiques apparaîtront après vos premières actions.
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- MAIN -->
          <div class="lg:col-span-2 space-y-6">

            <!-- Applications -->
            <div class="rounded-xl border p-6
                      bg-white border-gray-200
                      dark:bg-[#141b2e] dark:border-gray-800">

              <h2 class="text-xl font-semibold mb-4">
                Mes Candidatures
              </h2>

              <div *ngIf="applications.length === 0"
                   class="text-center text-gray-500 py-10">
                <p>Aucune candidature pour le moment</p>
                <button class="mt-4 px-5 py-2 rounded-lg
                             bg-blue-600 text-white
                             dark:bg-orange-500">
                  Rechercher des stages
                </button>
              </div>

            </div>

            <!-- Recommended Offers -->
            <div class="rounded-xl border p-6
                      bg-white border-gray-200
                      dark:bg-[#141b2e] dark:border-gray-800">

              <h2 class="text-xl font-semibold mb-4">
                Offres Recommandées
              </h2>

              <p *ngIf="recommendedOffers.length === 0"
                 class="text-gray-500 text-center py-6">
                Aucune recommandation pour le moment.
              </p>

            </div>
          </div>

          <!-- SIDEBAR -->
          <div class="space-y-6">

            <!-- Profile completion -->
            <div class="rounded-xl border p-6
                      bg-white border-gray-200
                      dark:bg-[#141b2e] dark:border-gray-800">

              <h3 class="font-semibold mb-4">
                Complétion du Profil
              </h3>

              <div class="mb-3 flex justify-between text-sm">
                <span>{{ profileCompletion }}%</span>
                <span class="text-yellow-500">Bon début</span>
              </div>

              <div class="h-2 rounded-full bg-gray-200 dark:bg-gray-800">
                <div class="h-2 rounded-full
                          bg-blue-600 dark:bg-orange-500"
                     [style.width.%]="profileCompletion">
                </div>
              </div>
            </div>

            <!-- Quick actions -->
            <div class="rounded-xl border p-6
                      bg-white border-gray-200
                      dark:bg-[#141b2e] dark:border-gray-800">

              <h3 class="font-semibold mb-4">
                Actions Rapides
              </h3>

              <div class="space-y-3">
                <button class="w-full py-3 rounded-lg
                             bg-blue-600 text-white
                             dark:bg-orange-500">
                  Rechercher des stages
                </button>

                <button class="w-full py-3 rounded-lg border
                             border-gray-300 dark:border-gray-700">
                  Modifier mon profil
                </button>
              </div>
            </div>

            <!-- Events -->
            <div class="rounded-xl border p-6
                      bg-white border-gray-200
                      dark:bg-[#141b2e] dark:border-gray-800">

              <h3 class="font-semibold mb-4">
                Événements
              </h3>

              <p class="text-gray-500 text-sm text-center">
                Aucun événement à venir.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StudentDashboardComponent {

  studentName = 'Mohammed';
  profileCompletion = 65;

  // EMPTY (backend ready)
  dashboardStats: any[] = [];
  applications: any[] = [];
  recommendedOffers: any[] = [];
}

