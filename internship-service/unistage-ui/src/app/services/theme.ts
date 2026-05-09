import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  // true = dark mode, false = light mode
  private darkModeSubject = new BehaviorSubject<boolean>(true);

  // components can subscribe to this
  darkMode$ = this.darkModeSubject.asObservable();

  toggleTheme() {
    const isDark = !this.darkModeSubject.value;
    this.darkModeSubject.next(isDark);

    // This is the KEY line
    document.documentElement.classList.toggle('dark', isDark);
  }

  initTheme() {
    // default: dark mode
    document.documentElement.classList.add('dark');
  }
}

