import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({providedIn: 'root'})
export class Requirement_Master_Service {
    constructor(private http: HttpClient) { }

    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension = '.xlsx';

    public exportExcel(jsonData: any[], fileName: string): void 
    {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
      const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      this.saveExcelFile(excelBuffer, fileName);
    }

    private saveExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], { type: this.fileType });
      FileSaver.saveAs(data, fileName + this.fileExtension);
    }

    Save_Requirement(Requirement_Master_) {
        return this.http.post(environment.BasePath + 'requirementmaster/Save_Requirement/', Requirement_Master_);
    }


Search_Requirement(look_In_Date_Value,From_Date,To_Date,Customer,RequirementNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
    User_Type_,Login_User_Id_ ):Observable<any>
{
    // if(Item_Name==undefined)
    //     Item_Name="";  
    var Search_Data = { 
        'Is_Date_Check_': look_In_Date_Value,
        'From_Date_': From_Date,
        'To_Date_': To_Date,
        'Customer_': Customer,
        'RequirementNo_': RequirementNo,
        'partNo_': partNo,
        'Item_Group_Id_': Item_Group_Id_,
        'CurrencyDetails_Id_': CurrencyDetails_Id_,
        'User_Details_Id_': User_Details_Id_,
        'User_Type_':User_Type_,
        'Login_User_Id_':Login_User_Id_
    }
    return this.http.get(environment.BasePath + 'requirementmaster/Search_Requirement/',  { params: Search_Data });
}


    Get_Requirement_Master(Requirement_Master_Id): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_Requirement_Master/' + Requirement_Master_Id);
    }

    Get_Requirement_Details(Requirement_Master_Id): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_Requirement_Details/' + Requirement_Master_Id);
    }

    Delete_Requirement_Master(Requirement_Master_Id) {
        return this.http.get(environment.BasePath + 'requirementmaster/Delete_Requirement_Master/' + Requirement_Master_Id);
    }


    Load_RequirementMaster(Requirement_Master_Id) {
        return this.http.get(environment.BasePath + 'requirementmaster/Load_RequirementMaster/' + Requirement_Master_Id);
    }

    Change_Bill_Status(Requirement_Master_Id, Bill_Type) {
        return this.http.get(environment.BasePath + 'requirementmaster/Change_Bill_Status/' + Requirement_Master_Id + '/' + Bill_Type);
    }

    Load_Cess(): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Load_Cess');
    }

    Load_Company_Bank(): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Load_Company_Bank');
    }

    Load_Bill_Mode(): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Load_Bill_Mode');
    }

    Load_Bill_Type(Group_Id): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_Bill_Type/' + Group_Id);
    }

    Load_Company(): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Load_Company/');
    }

    Get_Location(): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_Location/');
    }

    Load_Vat_Percentage(): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Load_Vat_Percentage/');
    }

    Search_Customer_Typeahead_1(Client_Id, Name): Observable<any> {
        if (Name == undefined) Name = "";
        var Search_Data = { 'Client_Id': Client_Id, 'AccountName': Name }
        return this.http.get(environment.BasePath + 'Client_Accounts/Accounts_Typeahead_1/', { params: Search_Data });
    }

    Get_Purchase_Item_Code_Typeahead(Item_Code): Observable<any> {
        if (Item_Code.includes('+')) {
            Item_Code = Item_Code.replace(/\+/g, '%2B');
        }
        const Search_Data = { 'Item_Code': Item_Code };
        return this.http.get(environment.BasePath + 'Stock/Get_Purchase_Item_Code_Typeahead/', { params: Search_Data });
    }

    Search_Item_Typeahead(Item_Name): Observable<any> {
        var Search_Data = { 'Item_Name': Item_Name }
        return this.http.get(environment.BasePath + 'Stock/Get_Stock_Item_Typeahead/', { params: Search_Data });
    }

    Search_Barcode_Typeahead(Barcode): Observable<any> {
        if (Barcode == undefined) Barcode = "";
        return this.http.get(environment.BasePath + 'Stock/Get_Barcode_Typeahead/' + Barcode);
    }

    Get_Salesmaster_Requirement_Details(Requirement_Master_Id_Edit): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_Salesmaster_Requirement_Details/' + Requirement_Master_Id_Edit);
    }

    Get_DeliveryOrder_Requirement_Details(Requirement_Master_Id_Edit): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_DeliveryOrder_Requirement_Details/' + Requirement_Master_Id_Edit);
    }

    Get_PackingList_Requirement_Details(Requirement_Master_Id_Edit): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_PackingList_Requirement_Details/' + Requirement_Master_Id_Edit);
    }

    Get_PurchaseOrder_Requirement_Details(Requirement_Master_Id_Edit): Observable<any> {
        return this.http.get(environment.BasePath + 'Requirement_Master/Get_PurchaseOrder_Requirement_Details/' + Requirement_Master_Id_Edit);
    }

    Load_Profoma_Items_Pending_List_ByRequirement(Requirement_Master_Id): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Load_Profoma_Items_Pending_List_ByRequirement/' + Requirement_Master_Id);
    }

    Load_Invoice_Items_Pending_List_ByRequirement(Requirement_Master_Id): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Load_Invoice_Items_Pending_List_ByRequirement/' + Requirement_Master_Id);
    }

    Load_Delivery_Items_Pending_List_ByRequirement(Requirement_Master_Id): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Load_Delivery_Items_Pending_List_ByRequirement/' + Requirement_Master_Id);
    }

    Load_Purchase_Items_Pending_List_ByRequirement(Requirement_Master_Id): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Load_Purchase_Items_Pending_List_ByRequirement/' + Requirement_Master_Id);
    }

    Load_PackingList_Items_Pending_List_ByRequirement(Requirement_Master_Id): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Load_PackingList_Items_Pending_List_ByRequirement/' + Requirement_Master_Id);
    }

    Get_Proforma_Requirement_Details(Requirement_Master_Id_Edit): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_Proforma_Requirement_Details/' + Requirement_Master_Id_Edit);
    }

    Get_Quotation_Requirement_Details(Requirement_Master_Id_Edit): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_Quotation_Requirement_Details/' + Requirement_Master_Id_Edit);
    }

    Get_PriceRequest_Requirement_Details(Requirement_Master_Id_Edit): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_PriceRequest_Requirement_Details/' + Requirement_Master_Id_Edit);
    }

    Get_Quotation_Pending_Items(Requirement_Master_Id): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_Quotation_Pending_Items/' + Requirement_Master_Id);
    }

    Get_PriceRequest_Pending_Items(Requirement_Master_Id): Observable<any> {
        return this.http.get(environment.BasePath + 'requirementmaster/Get_PriceRequest_Pending_Items/' + Requirement_Master_Id);
    }
}
