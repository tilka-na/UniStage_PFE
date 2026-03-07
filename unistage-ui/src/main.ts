import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // T-ekdi smit l-component s-hiha

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));