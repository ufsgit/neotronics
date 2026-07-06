import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsDashboard_Service {
  constructor(private http: HttpClient) { }

  Get_Operations_Dashboard_Data(filters: any): Observable<any> {
    return this.http.post(environment.BasePath + 'OperationsDashboard/Get_Operations_Dashboard_Data/', filters);
  }
}
