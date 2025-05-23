import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withFetch()),
        importProvidersFrom(
            LoggerModule.forRoot({
                level: NgxLoggerLevel.TRACE,
                serverLogLevel: NgxLoggerLevel.TRACE,
            }),
        ),
    ],
};
