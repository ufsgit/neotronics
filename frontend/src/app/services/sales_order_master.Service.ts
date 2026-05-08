import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({ providedIn: 'root' })
export class Sales_Order_Master_Service {

  constructor(private http: HttpClient) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], fileName: string): void {
    const ws: any = XLSX.utils.json_to_sheet(jsonData);
    const wb: any = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' as any });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  Save_Sales_Order(Sales_Order_Master_: any) {
    return this.http.post(environment.BasePath + 'sales_order_master/Save_Sales_Order/', Sales_Order_Master_).pipe(timeout(60000));
  }

  Search_Sales_Order(
    look_In_Date_Value: any,
    From_Date: any,
    To_Date: any,
    Customer: any,
    QuotNo: any,
    partNo: any,
    Item_Group_Id_: any,
    CurrencyDetails_Id_: any,
    Account_Type_Id_: any,
    User_Details_Id_: any,
    User_Type: any,
    Login_User_Id: any
  ): Observable<any> {
    var Search_Data = {
      'Is_Date_Check_': look_In_Date_Value,
      'From_Date_': From_Date,
      'To_Date_': To_Date,
      'Customer_': Customer,
      'QuotNo_': QuotNo,
      'partNo_': partNo,
      'Item_Group_Id_': Item_Group_Id_,
      'CurrencyDetails_Id_': CurrencyDetails_Id_,
      'Account_Type_Id_': Account_Type_Id_,
      'User_Details_Id_': User_Details_Id_,
      'User_Type': User_Type,
      'Login_User_Id': Login_User_Id
    };
    return this.http.get(environment.BasePath + 'sales_order_master/Search_Sales_Order/', { params: Search_Data });
  }

  Get_Sales_Order_Details(Sales_Order_Master_Id: any): Observable<any> {
    return this.http.get(environment.BasePath + 'sales_order_master/Get_Sales_Order_Details/' + Sales_Order_Master_Id);
  }

  Delete_Sales_Order_Master(Sales_Order_Master_Id: any) {
    return this.http.get(environment.BasePath + 'sales_order_master/Delete_Sales_Order_Master/' + Sales_Order_Master_Id);
  }

  Load_Sales_Order_Master(Sales_Order_Master_Id: any) {
    return this.http.get(environment.BasePath + 'sales_order_master/Load_Sales_Order_Master/' + Sales_Order_Master_Id);
  }

  Get_Sales_Order_Master(Sales_Order_Master_Id: any): Observable<any> {
    return this.http.get(environment.BasePath + 'sales_order_master/Get_Sales_Order_Master/' + Sales_Order_Master_Id);
  }

  Search_Item_Typeahead(Item_Name: any): Observable<any> {
    var Search_Data = { 'Item_Name': Item_Name };
    return this.http.get(environment.BasePath + 'Stock/Get_Stock_Item_Typeahead/', { params: Search_Data });
  }

  Search_Sales_Item_Typeahead(Item_Name: any): Observable<any> {
    var Search_Data = { 'Item_Name': Item_Name };
    return this.http.get(environment.BasePath + 'Stock/Get_Sales_Item_Typeahead/', { params: Search_Data });
  }

  Search_Customer_Typeahead(Client_Id: any, Item_Name: any): Observable<any> {
    if (Item_Name == undefined) Item_Name = '';
    return this.http.get(environment.BasePath + 'Client_Accounts/Accounts_Typeahead/' + Client_Id + '/' + Item_Name);
  }

  Search_Customer_Typeahead_1(Client_Id: any, Name: any): Observable<any> {
    if (Name == undefined) Name = '';
    var Search_Data = { 'Client_Id': Client_Id, 'AccountName': Name };
    return this.http.get(environment.BasePath + 'Client_Accounts/Accounts_Typeahead_1/', { params: Search_Data });
  }

  Get_Sales_Barcode_Typeahead(Barcode: any): Observable<any> {
    var Search_Data = { 'Barcode': Barcode };
    return this.http.get(environment.BasePath + 'Stock/Get_Sales_Barcode_Typeahead/', { params: Search_Data });
  }

  Get_Item_Code_Typeahead(Item_Code: any): Observable<any> {
    var Search_Data = { 'Item_Code': Item_Code };
    return this.http.get(environment.BasePath + 'Stock/Get_Item_Code_Typeahead/', { params: Search_Data });
  }

  Load_Company(): Observable<any> {
    return this.http.get(environment.BasePath + 'Sales_Master/Load_Company/');
  }

  Load_Bill_Mode(): Observable<any> {
    return this.http.get(environment.BasePath + 'Sales_Master/Load_Bill_Mode');
  }

  Load_Bill_Type(Group_Id: any): Observable<any> {
    return this.http.get(environment.BasePath + 'Sales_Master/Get_Bill_Type/' + Group_Id);
  }

  Load_Cess(): Observable<any> {
    return this.http.get(environment.BasePath + 'Sales_Master/Load_Cess');
  }
}
