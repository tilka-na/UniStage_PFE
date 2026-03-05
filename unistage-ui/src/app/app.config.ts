import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Import these!
import { routes } from './app.routes';
import { authInterceptor } from './pages/auth/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]) // This plugs the interceptor into the system
    )
  ]
};
