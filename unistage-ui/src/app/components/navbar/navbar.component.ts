import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';

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

      <div class="hidden md:flex items-center space-x-6">

        <button (click)="toggleDarkMode()"
                class="p-2.5 rounded-full bg-gray-50 dark:bg-slate-900 text-slate-500 hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-500 transition-all border border-transparent hover:border-orange-200 dark:hover:border-slate-700">
          <svg *ngIf="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg *ngIf="!isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <ng-container *ngIf="!authService.isLoggedIn()">
          <a routerLink="/login" class="text-sm font-semibold text-slate-600 hover:text-orange-600 dark:text-slate-300 transition-colors">Se connecter</a>
          <a routerLink="/register" class="px-6 py-2.5 text-sm font-bold rounded-full text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-black transition-all shadow-sm hover:-translate-y-0.5">Créer un compte</a>
        </ng-container>

        <div class="relative ml-2" *ngIf="authService.isLoggedIn()">
          <button (click)="toggleDropdown()" class="flex items-center gap-3 focus:outline-none group">
            <div class="w-10 h-10 rounded-full bg-orange-100 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold text-sm">
              {{ getUserInitial() }}
            </div>
            <svg class="w-4 h-4 text-slate-400 group-hover:text-slate-600" [class.rotate-180]="dropdownOpen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>

          <div *ngIf="dropdownOpen" class="absolute right-0 mt-4 w-56 origin-top-right bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-100 dark:border-slate-800 p-2 animate-in fade-in zoom-in-95 duration-200">
            <div class="px-4 py-3 border-b border-gray-50 dark:border-slate-800 mb-2">
              <p class="text-xs text-gray-400 uppercase tracking-wider font-bold">Compte</p>
              <p class="text-sm font-medium text-slate-900 dark:text-white truncate mt-1">{{ authService.getRole() }}</p>
            </div>
            <div class="space-y-1">
              <button (click)="logout()" class="w-full text-left flex items-center px-4 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                Déconnexion
              </button>
            </div>
          </div>
        </div>

      </div>

      <div class="flex md:hidden items-center gap-4">
        <button (click)="toggleDarkMode()" class="text-slate-500 dark:text-slate-400 p-2">
             <svg *ngIf="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             <svg *ngIf="!isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        </button>

        <button (click)="mobileMenuOpen = !mobileMenuOpen" class="text-slate-800 dark:text-white p-2">
          <svg *ngIf="!mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg *ngIf="mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

    </div>

    <div *ngIf="mobileMenuOpen" class="md:hidden bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 shadow-xl">
      <div class="px-6 py-6 space-y-4">
        <ng-container *ngIf="!authService.isLoggedIn()">
          <a routerLink="/login" (click)="closeMenus()" class="block text-lg font-medium text-slate-900 dark:text-white">Se connecter</a>
          <a routerLink="/register" (click)="closeMenus()" class="block text-lg font-bold text-orange-600">Créer un compte</a>
        </ng-container>
        <ng-container *ngIf="authService.isLoggedIn()">
           <div class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu</div>
           <button (click)="logout()" class="block w-full text-left text-lg font-medium text-red-500">Déconnexion</button>
        </ng-container>
      </div>
    </div>
  </nav>
  `
})
export class NavbarComponent {
  dropdownOpen = false;
  mobileMenuOpen = false;
  isDarkMode = false;

  constructor(public authService: AuthService) {
    if (typeof window !== 'undefined') {
        this.isDarkMode = document.documentElement.classList.contains('dark');
    }
  }

  toggleDropdown() { this.dropdownOpen = !this.dropdownOpen; }
  closeMenus() { this.dropdownOpen = false; this.mobileMenuOpen = false; }

  getUserInitial(): string {
    return 'U';
  }

  logout() {
    this.closeMenus();
    this.authService.logout();
    window.location.href = '/';
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('nav')) {
       this.closeMenus();
    }
  }
}

