import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.js';

@Injectable({
  providedIn: 'root'
})
export class Company_Size_Service {
  constructor(private http: HttpClient) { }

  Save_Company_Size(Company_Size_) {
    return this.http.post(environment.BasePath + 'Company_Size/Save_Company_Size/', Company_Size_);
  }

  Search_Company_Size(Company_Size_Name): Observable<any> {
    let params = new HttpParams();
    if (Company_Size_Name) {
      params = params.set('Company_Size_Name_', Company_Size_Name);
    }
    return this.http.get(environment.BasePath + 'Company_Size/Search_Company_Size/', { params: params });
  }

  Get_All_Company_Sizes(): Observable<any> {
    return this.http.get(environment.BasePath + 'Company_Size/Get_All_Company_Sizes/');
  }

  Delete_Company_Size(Company_Size_Id) {
    return this.http.get(environment.BasePath + 'Company_Size/Delete_Company_Size/' + Company_Size_Id);
  }

  Get_Company_Size(Company_Size_Id) {
    return this.http.get(environment.BasePath + 'Company_Size/Get_Company_Size/' + Company_Size_Id);
  }
}
