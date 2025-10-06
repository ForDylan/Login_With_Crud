import { CanActivateFn} from "@angular/router";
import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthStateService } from "../shared/data-acces/auth-state.service";
import { map } from "rxjs";

export const privateGuard = (): CanActivateFn =>
{
    return()=>
    {
        const router = inject(Router);
        const AuthStat = inject(AuthStateService);

        return AuthStat.authState$.pipe
        (
            map((state) => 
                {
                    console.log(state);
                    if(!state)
                    {
                        router.navigateByUrl('/auth/Sign-in');
                        return false;
                    }

                    return true;
                })
        );   
    };
};


export const publicGuard = (): CanActivateFn =>
{
    return()=>
    {
        const router = inject(Router);
        const AuthStat = inject(AuthStateService);

        return AuthStat.authState$.pipe
        (
            map(state => 
                {
                    if(state)
                    {
                        router.navigateByUrl('/tasks');
                        return false;
                    }

                    return true;
                })
        );
    };
};