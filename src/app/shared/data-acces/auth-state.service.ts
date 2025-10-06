import { inject, Injectable } from "@angular/core";
import { Auth,authState, getAuth, signOut} from "@angular/fire/auth";
import { get } from "@angular/fire/database";
import { Observable } from "rxjs";
import { } from "rxjs/operators";

@Injectable
({
    providedIn: 'root'
})

export class AuthStateService
{
    private _auth = inject(Auth);

    get authState$(): Observable<any>
    {
        return authState(this._auth );
    }

    get currentUser()
    {
        return getAuth().currentUser;
    }

    logOut()
    {
        return signOut(this._auth);
    }
}