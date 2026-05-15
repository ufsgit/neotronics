import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentStatus_Service {
  constructor(private http: HttpClient) { }

  Save_DepartmentStatus(DepartmentStatus_): Observable<any> {
    return this.http.post(environment.BasePath + '/DepartmentStatus/Save_DepartmentStatus/', DepartmentStatus_);
  }

  Search_DepartmentStatus(DepartmentStatus_Name_): Observable<any> {
    return this.http.get(environment.BasePath + '/DepartmentStatus/Search_DepartmentStatus', { params: { DepartmentStatus_Name_ } });
  }

  Delete_DepartmentStatus(DepartmentStatus_Id_): Observable<any> {
    return this.http.get(environment.BasePath + '/DepartmentStatus/Delete_DepartmentStatus/' + DepartmentStatus_Id_);
  }
}
