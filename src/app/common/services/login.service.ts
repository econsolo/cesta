import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestResponse } from '../models/rest-response.model';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private apiUrl = `${environment.api_url}/login`;

    constructor(private http: HttpClient) { }

    public post(user: User): Observable<RestResponse> {
        return this.http.post<RestResponse>(this.apiUrl, user);
    }
}
