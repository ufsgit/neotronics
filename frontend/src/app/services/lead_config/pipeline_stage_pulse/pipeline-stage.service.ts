import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadPipelineStageService {
  private apiUrl = environment.BasePath + '/lead-config/pipeline-stage';

  constructor(private http: HttpClient) { }

  getLeadPipelineStages(search: string = '', page: number = 1): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/search`, { search, page });
  }
}
