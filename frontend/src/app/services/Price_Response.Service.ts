import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Price_Response_Service {
  constructor(private http: HttpClient) { }

  Save_Price_Response(Price_Response_Master_): Observable<any> {
    return this.http.post(environment.BasePath + 'Price_Response/Save_Price_Response/', Price_Response_Master_);
  }

  Search_Price_Response(Look_In_Date, From_Date, To_Date, Supplier_Id, QuotNo): Observable<any> {
    const params = { Look_In_Date, From_Date, To_Date, Supplier_Id: Supplier_Id || 0, Price_RequestNo: QuotNo };
    return this.http.get(environment.BasePath + 'Price_Response/Search_Price_Response', { params });
  }

  Get_Price_Response(Price_Response_Master_Id): Observable<any> {
    return this.http.get(environment.BasePath + 'Price_Response/Get_Price_Response/' + Price_Response_Master_Id);
  }

  Delete_Price_Response(Price_Response_Master_Id): Observable<any> {
    return this.http.get(environment.BasePath + 'Price_Response/Delete_Price_Response/' + Price_Response_Master_Id);
  }

  Get_Next_Price_Response_No(EntryDate_): Observable<any> {
    const params = { EntryDate_ };
    return this.http.get(environment.BasePath + 'Price_Response/Get_Next_Price_Response_No', { params });
  }
}
