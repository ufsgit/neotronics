import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardV3_Service {
  constructor(private http: HttpClient) {}

  getDashboardV3Data(): Observable<any> {
    return this.http.get(environment.BasePath + 'DashboardV3/');
  }

  getKPI(): Observable<any> {
    return this.http.get(environment.BasePath + 'DashboardV3/KPI');
  }

  getPipeline(): Observable<any> {
    return this.http.get(environment.BasePath + 'DashboardV3/Pipeline');
  }

  getFollowUpSummary(): Observable<any> {
    return this.http.get(environment.BasePath + 'DashboardV3/FollowUpSummary');
  }

  getActivityDay(fromDate?: string, toDate?: string): Observable<any> {
    let params: any = {};
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;
    return this.http.get(environment.BasePath + 'DashboardV3/ActivityDay', { params });
  }

  getActivityWeek(fromDate?: string, toDate?: string): Observable<any> {
    let params: any = {};
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;
    return this.http.get(environment.BasePath + 'DashboardV3/ActivityWeek', { params });
  }

  getActivityMonth(fromDate?: string, toDate?: string): Observable<any> {
    let params: any = {};
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;
    return this.http.get(environment.BasePath + 'DashboardV3/ActivityMonth', { params });
  }
}
