import { Routes } from "@angular/router"
export  default 
[
    {
        path: 'Sign-in',
        loadComponent: () => import('./sign-in/sign-in')
    },

    {
        path: 'Sign-up',
        loadComponent: () => import('./sign-up/sign-up')
    },

] as Routes;