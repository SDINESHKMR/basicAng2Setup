import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { } 
    login(username: string, password: string) {
        return this.http.post('/clientAdminLogin', { email: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                } 
                return user;
            }).catch(this.handleError);
    }    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}