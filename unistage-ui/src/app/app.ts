import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterModule, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-[#0a0f1e] flex flex-col">
      <app-navbar></app-navbar>
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `
})
export class AppComponent implements OnInit {
  title = 'unistage';

  // Inject the Router so we can navigate!
  constructor(private router: Router) {}

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // 1. Save the token. (Check your auth.service.ts, it usually looks for 'token')
      localStorage.setItem('token', token);

      // 2. Clean the ugly token out of the address bar
      window.history.replaceState({}, document.title, window.location.pathname);

      // 3. THE MAGIC REDIRECT: Send them to the Student Dashboard!
      this.router.navigate(['/student/dashboard']).then(() => {
        // Force a quick reload so the Navbar runs its isLoggedIn() check again
        window.location.reload();
      });
    }
  }
}
