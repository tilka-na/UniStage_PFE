// components/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-slate-50 dark:bg-slate-950 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
          <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div class="col-span-2 md:col-span-1">
                <span class="text-xl font-bold text-slate-900 dark:text-white">Uni<span class="text-orange-500">Stage</span></span>
                <p class="mt-4 text-sm text-slate-500">
                  La plateforme #1 pour les stages au Maroc. Connecter les talents, construire l'avenir.
                </p>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 dark:text-white mb-4">Plateforme</h4>
                <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><a href="#" class="hover:text-orange-500">Étudiants</a></li>
                  <li><a href="#" class="hover:text-orange-500">Entreprises</a></li>
                  <li><a href="#" class="hover:text-orange-500">Tarifs</a></li>
                </ul>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 dark:text-white mb-4">Ressources</h4>
                <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><a href="#" class="hover:text-orange-500">Blog</a></li>
                  <li><a href="#" class="hover:text-orange-500">Guide des stages</a></li>
                  <li><a href="#" class="hover:text-orange-500">Aide</a></li>
                </ul>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 dark:text-white mb-4">Légal</h4>
                <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><a href="#" class="hover:text-orange-500">Confidentialité</a></li>
                  <li><a href="#" class="hover:text-orange-500">CGU</a></li>
                </ul>
              </div>
            </div>
            <div class="text-center text-xs text-slate-400 pt-8 border-t border-slate-200 dark:border-slate-800">
              © 2026 UniStage Inc.
            </div>
          </div>
        </footer>

  `
})
export class FooterComponent {}
