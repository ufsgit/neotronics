import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox_Component } from '../modules/admin/DialogBox/DialogBox.component';

@Injectable({
    providedIn: 'root'
})
export class User_RoleService {
    private apiUrl = environment.BasePath;

    constructor(private http: HttpClient, public dialogBox: MatDialog) { }

    Open_Dialog(data: any) {
        return this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: data.Data, Type: data.Message_Type, Confirm_Type: data.Confirm_Type }
        });
    }

    Save_User_Role(User_Role_: any): Observable<any> {
        return this.http.post(this.apiUrl + 'User_Role/Save_User_Role/', User_Role_);
    }

    Search_User_Role(User_Role_Name: string): Observable<any> {
        return this.http.get(this.apiUrl + 'User_Role/Search_User_Role/?User_Role_Name=' + User_Role_Name);
    }

    Delete_User_Role(User_Role_Id: number): Observable<any> {
        return this.http.get(this.apiUrl + 'User_Role/Delete_User_Role/' + User_Role_Id);
    }

    Search_User_Type(): Observable<any> {
        return this.http.get(this.apiUrl + 'User_Type/Search_User_Type/?User_Type_Name=');
    }

    Search_Working_Status(): Observable<any> {
        return this.http.get(this.apiUrl + 'Working_Status/Search_Working_Status/?Working_Status_Name=');
    }

    Save_User_Type(User_Type_: any): Observable<any> {
        return this.http.post(this.apiUrl + 'User_Type/Save_User_Type/', User_Type_);
    }

    Delete_User_Type(User_Type_Id: number): Observable<any> {
        return this.http.get(this.apiUrl + 'User_Type/Delete_User_Type/' + User_Type_Id);
    }

    Save_Working_Status(Working_Status_: any): Observable<any> {
        return this.http.post(this.apiUrl + 'Working_Status/Save_Working_Status/', Working_Status_);
    }

    Delete_Working_Status(Working_Status_Id: number): Observable<any> {
        return this.http.get(this.apiUrl + 'Working_Status/Delete_Working_Status/' + Working_Status_Id);
    }
}