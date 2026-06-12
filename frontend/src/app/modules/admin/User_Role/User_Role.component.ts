import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { User_RoleService } from '../../../services/User_Role.Service';
import { User_Role } from '../../../models/User_Role';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Get_Page_Permission } from '../../../components/sidebar/sidebar.component';

@Component({
    selector: 'app-user-role',
    templateUrl: './User_Role.component.html',
    styleUrls: ['./User_Role.component.css']
})
export class User_RoleComponent implements OnInit {
    User_Role_Data: any[] = [];
    User_Role_: User_Role = new User_Role();
    Search_User_Role_Name: string = "";
    Entry_View: boolean = false;
    myInnerHeight: number;
    Total_Entries: number = 0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean = false;
    Permissions: any;
    User_Role_Edit: boolean = true;
    User_Role_Save: boolean = true;
    User_Role_Delete: boolean = true;

    User_Type_Data: any[] = [];
    Working_Status_Data: any[] = [];

    constructor(
        public User_Role_Service_: User_RoleService,
        private route: ActivatedRoute,
        private router: Router,
        public dialogBox: MatDialog
    ) { }

    ngOnInit() {
        this.Permissions = Get_Page_Permission(110); 
        if (this.Permissions == undefined || this.Permissions == null) {
            this.User_Role_Edit = true;
            this.User_Role_Save = true;
            this.User_Role_Delete = true;
        } else {
            this.User_Role_Edit = this.Permissions.Edit;
            this.User_Role_Save = this.Permissions.Save;
            this.User_Role_Delete = this.Permissions.Delete;
        }
        this.Page_Load();
    }

    Page_Load() {
        this.myInnerHeight = (window.innerHeight);
        this.myInnerHeight = this.myInnerHeight - 330;
        this.Clr_User_Role();
        this.Search_User_Role_Name = "";
        this.Search_User_Role();
        this.Entry_View = false;
    }



    Create_New() {
        this.Entry_View = true;
        this.Clr_User_Role();
    }

    Close_Click() {
        this.Entry_View = false;
        this.Search_User_Role();
    }

    Clr_User_Role() {
        this.User_Role_.User_Role_Id = 0;
        this.User_Role_.User_Role_Name = "";
        this.User_Role_.User_Type_Id = 1; // Default to 1
        this.User_Role_.Working_Status_Id = 1; // Default to 1
    }

    Search_User_Role() {
        this.issLoading = true;
        this.User_Role_Service_.Search_User_Role(this.Search_User_Role_Name).subscribe(Rows => {
            console.log('Search_User_Role Results:', JSON.stringify(Rows));
            if (Rows && Rows.error) {
                this.User_Role_Data = [];
                console.error('Backend Search Error:', Rows.error);
            } else if (Rows && Array.isArray(Rows)) {
                this.User_Role_Data = Rows;
            } else {
                this.User_Role_Data = [];
            }
            this.Total_Entries = this.User_Role_Data.length;
            this.issLoading = false;
        },
        error => {
            this.issLoading = false;
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occurred', Type: "2" } });
        });
    }

    Save_User_Role() {
        if (this.User_Role_.User_Role_Name == undefined || this.User_Role_.User_Role_Name == null || this.User_Role_.User_Role_Name == "") {
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter User Role Name', Type: "3" } });
            return;
        }


        this.issLoading = true;
        this.User_Role_Service_.Save_User_Role(this.User_Role_).pipe(
            finalize(() => {
                this.issLoading = false;
            })
        ).subscribe({
            next: (Save_status: any) => {
                console.log('Save_User_Role Response:', JSON.stringify(Save_status));
                if (Save_status && Save_status.error) {
                    this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: 'Error: ' + (Save_status.error.message || 'Database error'), Type: "2" }
                    });
                    return;
                }

                // Check for success in various common response formats
                let isSuccess = false;
                if (Save_status) {
                    if (Save_status.affectedRows > 0 || Save_status.insertId > 0) isSuccess = true;
                    else if (Save_status.data && Save_status.data[0] && (Save_status.data[0].affectedRows > 0 || Save_status.data[0].insertId > 0)) isSuccess = true;
                    else if (Save_status[0] && (Save_status[0].affectedRows > 0 || Save_status[0].insertId > 0)) isSuccess = true;
                    else if (Save_status.success === true) isSuccess = true; // Fallback for general success flag
                }

                if (isSuccess) {
                    this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: 'Saved Successfully', Type: "false" }
                    });
                    this.Clr_User_Role();
                    this.Search_User_Role();
                    this.Entry_View = false;
                } else {
                    this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: 'Error Occurred', Type: "2" }
                    });
                }
            },
            error: (error) => {
                this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Error Occurred', Type: "2" }
                });
            }
        });
    }

    Edit_User_Role(User_Role_e: any) {
        this.Entry_View = true;
        this.User_Role_ = Object.assign({}, User_Role_e);
    }

    Delete_User_Role(User_Role_Id, index) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Do you want to delete ?', Type: "true", Heading: 'Confirm' } });
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'Yes') {
                this.issLoading = true;
                this.User_Role_Service_.Delete_User_Role(User_Role_Id).subscribe(Delete_status => {
                    this.issLoading = false;
                    this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted Successfully', Type: "false" } });
                    this.Search_User_Role();
                }, err => {
                    this.issLoading = false;
                    this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occurred', Type: "2" } });
                });
            }
        });
    }
}