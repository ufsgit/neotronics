import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerticalService {
  private apiUrl = environment.BasePath + '/lead-config/vertical'; // Adjust URL as needed

  constructor(private http: HttpClient) { }

  getVerticals(search: string = '', page: number = 1): Observable<any> {
    // Modify according to the actual endpoint
    return this.http.post<any>(`${this.apiUrl}/search`, { search, page });
  }

  // add methods for Add, Edit, Delete as needed
}
