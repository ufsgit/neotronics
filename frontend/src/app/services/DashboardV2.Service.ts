import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardV2_Service {
  constructor(private http: HttpClient) {}

  DashboardV2_PipelineTop3(): Observable<any> {
    return this.http.get(environment.BasePath + 'DashboardV2/DashboardV2_PipelineTop3/');
  }

  DashboardV2_PipelineAll(): Observable<any> {
    return this.http.get(environment.BasePath + 'DashboardV2/DashboardV2_PipelineAll/');
  }

  DashboardV2_PipelineMetrics(): Observable<any> {
    return this.http.get(environment.BasePath + 'DashboardV2/DashboardV2_PipelineMetrics/');
  }

  DashboardV2_PulseMetrics(): Observable<any> {
    return this.http.get(environment.BasePath + 'DashboardV2/DashboardV2_PulseMetrics/');
  }

  DashboardV2_SourceMetrics(): Observable<any> {
    return this.http.get(environment.BasePath + 'DashboardV2/DashboardV2_SourceMetrics/');
  }
}
