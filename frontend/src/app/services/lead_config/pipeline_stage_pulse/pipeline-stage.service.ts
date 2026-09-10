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
    return this.http.post<any>(`${this.apiUrl}/Search`, { search, page });
  }

  getPipelineStage(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Get/${id}`);
  }

  savePipelineStage(data: {
    Pipeline_Stage_Id: number;
    Pipeline_Stage_Name: string;
    Stage_Type: number;
    Followup_Required: number;
    Color: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Save`, data);
  }

  deletePipelineStage(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Delete/${id}`);
  }
}
