import { Routes } from "@angular/router"
import { privateGuard, publicGuard } from "./core/auth.guard";

export const routes: Routes = 
[
    {
        path: '',
        loadComponent: () => import('./auth/features/sign-in/sign-in').then(m => m.default)
    },
    
    {
        canActivateChild: [publicGuard()],
        path: 'auth',
        loadChildren: () => import('./auth/features/auth.routes').then(m => m.default)
    },

    {
        canActivateChild: [privateGuard()],
        path: 'tasks',
        loadComponent: () => import('./shared/ui/layout'),
        loadChildren: () => import('./task/features/task.routes')
    },

    {
        path: '**',
        loadComponent: () => import('./auth/features/sign-in/sign-in').then(m => m.default)
    }
];