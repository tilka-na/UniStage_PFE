import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Points to YOUR real AuthService

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <nav class="sticky top-0 z-50 w-full bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

      <a routerLink="/" class="flex items-center gap-3 group">
         <span class="text-2xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
            UniStage
         </span>
      </a>

      <div class="hidden md:flex items-center space-x-8">
        <a routerLink="/offres"
           class="text-sm font-bold text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-500 transition-colors flex items-center gap-2">
           Offres de stages
        </a>

        <button (click)="toggleDarkMode()"
                class="p-2.5 rounded-full bg-gray-50 dark:bg-slate-900 text-slate-500 hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-500 transition-all border border-transparent">
          <svg *ngIf="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <svg *ngIf="!isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        </button>

        <ng-container *ngIf="!authService.isLoggedIn()">
          <a routerLink="/login" class="text-sm font-semibold text-slate-600 hover:text-orange-600 dark:text-slate-300">Se connecter</a>
          <a routerLink="/register" class="px-6 py-2.5 text-sm font-bold rounded-full text-white bg-slate-900 dark:bg-white dark:text-black">Créer un compte</a>
        </ng-container>

        <div class="relative ml-2" *ngIf="authService.isLoggedIn()">
          <button (click)="toggleDropdown($event)" class="flex items-center gap-3 focus:outline-none group">
            <div class="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold text-sm">
              {{ getUserInitial() }}
            </div>
            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ authService.getRole() }}</p>
          </button>

          <div *ngIf="dropdownOpen" class="absolute right-0 mt-4 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 p-2">
            <div class="space-y-1">
              <ng-container *ngIf="authService.getRole() === 'STUDENT'">
                <a routerLink="/student/dashboard" (click)="closeMenus()" class="block px-4 py-2 text-sm">Tableau de bord</a>
                <a routerLink="/student/profile" (click)="closeMenus()" class="block px-4 py-2 text-sm">Mon Profil</a>
              </ng-container>

              <ng-container *ngIf="authService.getRole() === 'RECRUITER'">
                <a routerLink="/dashboard" (click)="closeMenus()" class="block px-4 py-2 text-sm">Gestion Recrutement</a>
              </ng-container>

              <button (click)="logout()" class="w-full text-left px-4 py-2 text-sm text-red-600 font-bold border-t dark:border-slate-800 mt-2">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  `
})
export class NavbarComponent {
  dropdownOpen = false;
  mobileMenuOpen = false;
  isDarkMode = false;

  constructor(public authService: AuthService) {}

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeMenus() {
    this.dropdownOpen = false;
    this.mobileMenuOpen = false;
  }

  getUserInitial(): string {
    const role = this.authService.getRole();
    return role ? role.charAt(0).toUpperCase() : 'U';
  }

  logout() {
    this.closeMenus();
    this.authService.logout();
    window.location.href = '/login';
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.closeMenus();
  }
}
