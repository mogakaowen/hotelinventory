import { InjectionToken } from "@angular/core";

export const localStorageToken = new InjectionToken<any>('local storage', {
    providedIn: 'root',
    factory(){
        return localStorage
    },
});

// You can use session storage or other apis like window.localStorage, window.sessionStorage, etc for 