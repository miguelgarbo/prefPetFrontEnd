import { ApplicationConfig, provideZoneChangeDetection, PLATFORM_ID, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAppInitializer } from '@angular/core'; // Nova função do Angular 19

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { meuhttpInterceptor } from './services/http-interceptor.service';
import { initKeycloak } from './services/keycloak.service';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),

    // A forma correta para o Angular 19 injetar o Platform ID:
    provideAppInitializer(() => {
  const platformId = inject(PLATFORM_ID);
  return initKeycloak(platformId)();
}),

    provideHttpClient(
      withInterceptors([meuhttpInterceptor])
    )
  ]
};