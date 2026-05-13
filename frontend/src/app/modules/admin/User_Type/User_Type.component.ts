import { Component, OnInit } from '@angular/core';
import { User_Type } from '../../../models/User_Type';
import { User_RoleService } from '../../../services/User_Role.Service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';

@Component({
    selector: 'app-user-type',
    templateUrl: './User_Type.component.html',
    styleUrls: ['./User_Type.component.css']
})
export class User_TypeComponent implements OnInit {
    User_Type_: User_Type = new User_Type();
    User_Type_Data: User_Type[] = [];
    
    Entry_View: boolean = true;
    EditIndex: number = -1;
    Total_Entries: number = 0;
    Search_Name: string = '';

    constructor(public User_Role_Service_: User_RoleService, public dialogBox: MatDialog) { }

    ngOnInit() {
        this.Search_User_Type();
    }

    New_User_Type() {
        this.Entry_View = true;
        this.EditIndex = -1;
        this.User_Type_ = new User_Type();
    }

    Search_User_Type() {
        this.User_Role_Service_.Search_User_Type().subscribe(
            Rows => {
                this.User_Type_Data = Rows[0];
                this.Total_Entries = this.User_Type_Data.length;
            },
            Rows => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: Rows.error.text, Type: "2" }
                });
            }
        );
    }

    Save_User_Type() {
        if (this.User_Type_.User_Type_Name == undefined || this.User_Type_.User_Type_Name == "") {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: "Enter User Type Name", Type: "3" }
            });
            return;
        }

        this.User_Role_Service_.Save_User_Type(this.User_Type_).subscribe(
            Save_status => {
                if (Number(Save_status[0].User_Type_Id_) > 0) {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: "Saved", Type: "false" }
                    });
                    this.New_User_Type();
                    this.Search_User_Type();
                } else {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: "Not Saved", Type: "2" }
                    });
                }
            },
            Rows => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: Rows.error.text, Type: "2" }
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
                this.User_Role_Service_.Delete_User_Type(User_Type_Id).subscribe(
                    Delete_status => {
                        Delete_status = Delete_status[0];
                        Delete_status = Delete_status[0];
                        if (Delete_status.DeleteStatus == true) {
                            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                panelClass: 'Dialogbox-Class',
                                data: { Message: "Deleted", Type: "false" }
                            });
                            this.User_Type_Data.splice(index, 1);
                            this.Total_Entries = this.Total_Entries - 1;
                        } else {
                            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                panelClass: 'Dialogbox-Class',
                                data: { Message: Delete_status.DeleteMessage, Type: "2" }
                            });
                        }
                    },
                    Rows => {
                        const dialogRef = this.dialogBox.open(DialogBox_Component, {
                            panelClass: 'Dialogbox-Class',
                            data: { Message: Rows.error.text, Type: "2" }
                        });
                    }
                );
            }
        });
    }
}