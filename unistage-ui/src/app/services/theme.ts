import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject: BehaviorSubject<boolean>;
  public darkMode$: Observable<boolean>;

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    this.darkModeSubject = new BehaviorSubject<boolean>(isDark);
    this.darkMode$ = this.darkModeSubject.asObservable();
    this.updateTheme(isDark);
  }
  toggleDarkMode(): void {
    const newMode = !this.darkModeSubject.value;
    this.setDarkMode(newMode);
  }
  setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    this.updateTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  /**
   * Get current dark mode state
   */
  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
  private updateTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

