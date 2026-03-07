import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-[#0a0f1e] min-h-screen text-white">
      <div class="max-w-6xl mx-auto px-4 py-8">

        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold">Espace Recruteur</h1>
          <p class="text-gray-400">Bienvenue, {{ companyName }}</p>
        </div>

        <!-- Minimal Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div class="bg-[#141b2e] p-6 rounded-xl border border-gray-800">
            <p class="text-gray-400 text-sm">Offres publiées</p>
            <p class="text-3xl font-bold text-orange-500">{{ offersCount }}</p>
          </div>

          <div class="bg-[#141b2e] p-6 rounded-xl border border-gray-800">
            <p class="text-gray-400 text-sm">Candidatures reçues</p>
            <p class="text-3xl font-bold text-orange-500">{{ applicationsCount }}</p>
          </div>

          <div class="bg-[#141b2e] p-6 rounded-xl border border-gray-800">
            <p class="text-gray-400 text-sm">Stages actifs</p>
            <p class="text-3xl font-bold text-orange-500">{{ activeOffers }}</p>
          </div>
        </div>

        <!-- Internship Offers -->
        <div class="bg-[#141b2e] rounded-xl border border-gray-800 p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">Mes Offres de Stage</h2>
            <button
              class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              + Ajouter une offre
            </button>
          </div>

          <div *ngIf="offers.length === 0" class="text-gray-400 text-sm">
            Aucune offre publiée pour le moment.
          </div>

          <div *ngFor="let offer of offers"
               class="bg-[#0a0f1e] p-5 rounded-lg border border-gray-800 mb-4">
            <h3 class="font-semibold">{{ offer.title }}</h3>
            <p class="text-sm text-gray-400">{{ offer.location }} • {{ offer.duration }}</p>
            <p class="text-xs text-gray-500 mt-2">
              {{ offer.applications }} candidatures reçues
            </p>
          </div>
        </div>

      </div>
    </div>
  `
})
export class CompanyDashboardComponent {
  companyName = 'TechCorp Morocco';

  offersCount = 2;
  activeOffers = 2;
  applicationsCount = 18;

  offers = [
    {
      title: 'Stage Développeur Angular',
      location: 'Casablanca',
      duration: '6 mois',
      applications: 10
    },
    {
      title: 'Stage Marketing Digital',
      location: 'Rabat',
      duration: '4 mois',
      applications: 8
    }
  ];
}

