import { Component, OnInit } from '@angular/core';
import { User_Type } from '../../../models/User_Type';
import { User_RoleService } from '../../../services/User_Role.Service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-type',
    templateUrl: './User_Type.component.html',
    styleUrls: ['./User_Type.component.css']
})
export class User_TypeComponent implements OnInit {
    User_Type_: User_Type = new User_Type();
    User_Type_Data: User_Type[] = [];
    
    Entry_View: boolean = false;
    EditIndex: number = -1;
    Total_Entries: number = 0;
    Search_Name: string = '';

    myInnerHeight: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean = false;

    Permissions: any;
    User_Type_Edit: boolean = false;
    User_Type_Save: boolean = false;
    User_Type_Delete: boolean = false;

    constructor(
        public User_Role_Service_: User_RoleService, 
        public dialogBox: MatDialog,
        private router: Router
    ) { }

    ngOnInit() {
        this.Permissions = Get_Page_Permission(14); // Assuming 14 for User Type or using fallback
        if (this.Permissions == undefined || this.Permissions == null) {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/auth/login');
        } else {
            this.User_Type_Edit = this.Permissions.Edit;
            this.User_Type_Save = this.Permissions.Save;
            this.User_Type_Delete = this.Permissions.Delete;
            this.Page_Load();
        }
    }

    Page_Load() {
        this.myInnerHeight = (window.innerHeight);
        this.myInnerHeight = this.myInnerHeight - 330;
        this.Clr_User_Type();
        this.Search_User_Type();
        this.Entry_View = false;
    }

    Create_New() {
        this.Entry_View = true;
        this.Clr_User_Type();
    }

    Close_Click() {
        this.Clr_User_Type();
        this.Entry_View = false;
    }

    Clr_User_Type() {
        this.User_Type_ = new User_Type();
        this.User_Type_.User_Type_Id = 0;
        this.User_Type_.User_Type_Name = "";
        this.EditIndex = -1;
    }

    trackByFn(index, item) {
        return index;
    }

    Search_User_Type() {
        this.issLoading = true;
        this.User_Role_Service_.Search_User_Type().subscribe(
            Rows => {
                this.User_Type_Data = Rows[0];
                this.Total_Entries = this.User_Type_Data.length;
                this.issLoading = false;
            },
            Rows => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Error Occured', Type: "2" }
                });
            }
        );
    }

    Save_User_Type() {
        if (this.User_Type_.User_Type_Name == undefined || this.User_Type_.User_Type_Name == null || this.User_Type_.User_Type_Name == "") {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: "Enter User Type Name", Type: "3" }
            });
            return;
        }

        this.issLoading = true;
        this.User_Role_Service_.Save_User_Type(this.User_Type_).subscribe(
            Save_status => {
                if (Save_status && Save_status.length > 0 && Number(Save_status[0].User_Type_Id_) > 0) {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: "Saved", Type: "false" }
                    });
                    this.Search_User_Type();
                    this.Clr_User_Type();
                    this.Entry_View = false;
                } else {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: "Error Occured", Type: "2" }
                    });
                }
                this.issLoading = false;
            },
            Rows => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Error Occured', Type: "2" }
                });
            }
        );
    }

    Edit_User_Type(User_Type_e: User_Type, index) {
        this.Entry_View = true;
        this.EditIndex = index;
        this.User_Type_ = Object.assign({}, User_Type_e);
    }

    Delete_User_Type(User_Type_Id: number, index) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Do you want to delete ?', Type: "true", Heading: 'Confirm' }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'Yes') {
                this.issLoading = true;
                this.User_Role_Service_.Delete_User_Type(User_Type_Id).subscribe(
                    Delete_status => {
                        this.issLoading = false;
                        if (Delete_status && Delete_status[0] && Delete_status[0][0] && Delete_status[0][0].DeleteStatus == true) {
                            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                panelClass: 'Dialogbox-Class',
                                data: { Message: "Deleted", Type: "false" }
                            });
                            this.Search_User_Type();
                        } else {
                            const msg = (Delete_status && Delete_status[0] && Delete_status[0][0]) ? Delete_status[0][0].DeleteMessage : 'Error Occured';
                            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                panelClass: 'Dialogbox-Class',
                                data: { Message: msg, Type: "2" }
                            });
                        }
                    },
                    Rows => {
                        this.issLoading = false;
                        const dialogRef = this.dialogBox.open(DialogBox_Component, {
                            panelClass: 'Dialogbox-Class',
                            data: { Message: 'Error Occured', Type: "2" }
                        });
                    }
                );
            }
        });
    }
}