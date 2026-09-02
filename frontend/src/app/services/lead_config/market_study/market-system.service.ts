import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadMarketSystemService {
  private apiUrl = environment.BasePath + '/lead-config/market-system';

  constructor(private http: HttpClient) { }

  getLeadMarketSystems(search: string = '', page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Search`, { params: { search: search, page: page.toString(), _t: Date.now().toString() } });
  }

  getMarketSystem(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Get/${id}`);
  }

  saveMarketSystem(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Save`, data);
  }

  deleteMarketSystem(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Delete/${id}`);
  }
}
