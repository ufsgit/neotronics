import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadWorkflowService {
  private apiUrl = environment.BasePath + '/lead-config/workflow';

  constructor(private http: HttpClient) { }

  getLeadWorkflows(search: string = '', page: number = 1): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/search`, { search, page });
  }
}
