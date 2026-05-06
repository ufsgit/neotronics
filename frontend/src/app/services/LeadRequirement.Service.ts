import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeadRequirementService {
  constructor(private http: HttpClient) {}

  List(Lead_Id: number): Observable<any> {
    const params: any = { Lead_Id: String(Lead_Id || 0) };
    return this.http.get(environment.BasePath + 'LeadRequirement/List/', { params });
  }

  Save(payload: any): Observable<any> {
    return this.http.post(environment.BasePath + 'LeadRequirement/Save/', payload);
  }

  Get(LeadRequirementMaster_Id: number): Observable<any> {
    return this.http.get(environment.BasePath + 'LeadRequirement/Get/' + LeadRequirementMaster_Id);
  }
}

