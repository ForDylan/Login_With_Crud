import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { AuthStateService } from "../data-acces/auth-state.service";


@Component
({
    standalone: true,
    imports: [RouterModule, RouterLink],
    selector: "app-layout",
    styleUrls: ['./layout.css'],
    template: `
    <header class="mi-header">
        <nav class="mi-nav">
            <a class="mi-logo" routerLink="/tasks">Ng Task</a>
            <button class="mi-btn" (click)="logOut()">Salir</button>
        </nav>
    </header>
    <router-outlet></router-outlet>`,
})

export default class LayoutComponent 
{
    private _authState = inject(AuthStateService);
    private _router = inject(Router);
  
    async logOut()
    {
        await this._authState.logOut();
        this._router.navigateByUrl('/auth/Sign-in');
    }
}