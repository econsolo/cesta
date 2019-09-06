import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestResponse } from '../models/rest-response.model';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = `${environment.api_url}/products`;

    constructor(private http: HttpClient) { }

    public post(product: Product): Observable<RestResponse> {
        return this.http.post<RestResponse>(this.apiUrl, product);
    }

    public put(product: Product): Observable<RestResponse> {
        return this.http.put<RestResponse>(`${this.apiUrl}/${product.id}`, product);
    }

    public delete(id: string): Observable<RestResponse> {
        return this.http.delete<RestResponse>(`${this.apiUrl}/${id}`);
    }

    public find(id: string): Observable<RestResponse> {
        return this.http.get<RestResponse>(`${this.apiUrl}/${id}`);
    }

    public get(): Observable<RestResponse> {
        return this.http.get<RestResponse>(this.apiUrl);
    }
}
