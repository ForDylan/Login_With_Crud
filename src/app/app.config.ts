import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()), provideFirebaseApp(() => initializeApp({ projectId: "curriculo-6349f", appId: "1:618344449037:web:f9ee7bda393ca00fe2c144", storageBucket: "curriculo-6349f.firebasestorage.app", apiKey: "AIzaSyCSMApfWIEgNby9JlPPudieY0HR43vyn40", authDomain: "curriculo-6349f.firebaseapp.com", messagingSenderId: "618344449037", measurementId: "G-X2XQL1ZW7V" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
