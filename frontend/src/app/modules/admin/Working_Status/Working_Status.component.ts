import { Component, OnInit } from '@angular/core';
import { Working_Status } from '../../../models/Working_Status';
import { User_RoleService } from '../../../services/User_Role.Service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';

@Component({
    selector: 'app-working-status',
    templateUrl: './Working_Status.component.html',
    styleUrls: ['./Working_Status.component.css']
})
export class Working_StatusComponent implements OnInit {
    Working_Status_: Working_Status = new Working_Status();
    Working_Status_Data: Working_Status[] = [];
    
    Entry_View: boolean = true;
    EditIndex: number = -1;
    Total_Entries: number = 0;
    Search_Name: string = '';

    constructor(public User_Role_Service_: User_RoleService, public dialogBox: MatDialog) { }

    ngOnInit() {
        this.Search_Working_Status();
    }

    New_Working_Status() {
        this.Entry_View = true;
        this.EditIndex = -1;
        this.Working_Status_ = new Working_Status();
    }

    Search_Working_Status() {
        this.User_Role_Service_.Search_Working_Status().subscribe(
            Rows => {
                this.Working_Status_Data = Rows[0];
                this.Total_Entries = this.Working_Status_Data.length;
            },
            Rows => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: Rows.error.text, Type: "2" }
                });
            }
        );
    }

    Save_Working_Status() {
        if (this.Working_Status_.Working_Status_Name == undefined || this.Working_Status_.Working_Status_Name == "") {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: "Enter Working Status Name", Type: "3" }
            });
            return;
        }

        this.User_Role_Service_.Save_Working_Status(this.Working_Status_).subscribe(
            Save_status => {
                if (Number(Save_status[0].Working_Status_Id_) > 0) {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: "Saved", Type: "false" }
                    });
                    this.New_Working_Status();
                    this.Search_Working_Status();
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

    Edit_Working_Status(Working_Status_e: Working_Status, index) {
        this.Entry_View = true;
        this.EditIndex = index;
        this.Working_Status_ = Object.assign({}, Working_Status_e);
    }

    Delete_Working_Status(Working_Status_Id: number, index) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Do you want to delete ?', Type: "true", Heading: 'Confirm' }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'Yes') {
                this.User_Role_Service_.Delete_Working_Status(Working_Status_Id).subscribe(
                    Delete_status => {
                        Delete_status = Delete_status[0];
                        Delete_status = Delete_status[0];
                        if (Delete_status.DeleteStatus == true) {
                            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                panelClass: 'Dialogbox-Class',
                                data: { Message: "Deleted", Type: "false" }
                            });
                            this.Working_Status_Data.splice(index, 1);
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