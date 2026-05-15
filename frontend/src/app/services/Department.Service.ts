import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Department_Service {
  constructor(private http: HttpClient) { }

  Save_Department(Department_): Observable<any> {
    return this.http.post(environment.BasePath + '/Department/Save_Department/', Department_);
  }

  Search_Department(Department_Name_): Observable<any> {
    return this.http.get(environment.BasePath + '/Department/Search_Department', { params: { Department_Name_ } });
  }

  Delete_Department(Department_Id_): Observable<any> {
    return this.http.get(environment.BasePath + '/Department/Delete_Department/' + Department_Id_);
  }
}
