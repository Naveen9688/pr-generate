import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    MatSnackBarModule,
    // { 
    //   provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    //   useValue: {
    //     duration: 5000, // Default duration to 5 seconds
    //     horizontalPosition: 'right', // Default horizontal position to right
    //     verticalPosition: 'top' // Default vertical position to top
    //   }
    // }
  ]
};
