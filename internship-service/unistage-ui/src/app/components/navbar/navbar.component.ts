import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-[#0a0f1e] border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <a routerLink="/" class="text-2xl font-bold">
              <span class="text-white">Uni</span>
              <span class="text-orange-500">Stage</span>
            </a>
          </div>

          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/" routerLinkActive="text-orange-500" [routerLinkActiveOptions]="{exact: true}"
               class="text-gray-300 hover:text-orange-500 transition-colors">
              Accueil
            </a>
            <a routerLink="/student-dashboard" routerLinkActive="text-orange-500"
               class="text-gray-300 hover:text-orange-500 transition-colors">
              Espace Étudiant
            </a>
            <a routerLink="/company-dashboard" routerLinkActive="text-orange-500"
               class="text-gray-300 hover:text-orange-500 transition-colors">
              Espace Recruteur
            </a>
          </div>

          <div class="flex items-center space-x-4">
            <button class="text-gray-300 hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            <button
              routerLink="/register-student"
              class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors font-medium">
              M'inscrire
            </button>

          </div>

          <button (click)="toggleMenu()" class="md:hidden text-gray-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div *ngIf="isMenuOpen" class="md:hidden bg-[#141b2e] border-t border-gray-800">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a routerLink="/" routerLinkActive="bg-gray-800 text-orange-500" [routerLinkActiveOptions]="{exact: true}"
             class="block px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md">
            Accueil
          </a>
          <a routerLink="/student-dashboard" routerLinkActive="bg-gray-800 text-orange-500"
             class="block px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md">
            Espace Étudiant
          </a>
          <a routerLink="/company-dashboard" routerLinkActive="bg-gray-800 text-orange-500"
             class="block px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md">
            Espace Recruteur
          </a>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
