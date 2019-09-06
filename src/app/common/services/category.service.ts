import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestResponse } from '../models/rest-response.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private apiUrl = `${environment.api_url}/categories`;

    constructor(private http: HttpClient) { }

    public get(): Observable<RestResponse> {
        return this.http.get<RestResponse>(this.apiUrl);
    }
}
