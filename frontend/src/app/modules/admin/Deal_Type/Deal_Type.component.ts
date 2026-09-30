import { Component, OnInit } from '@angular/core';
import { Deal_Type } from '../../../models/Deal_Type';
import { Deal_TypeService } from '../../../services/Deal_Type.Service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';

@Component({
    selector: 'app-deal-type',
    templateUrl: './Deal_Type.component.html',
    styleUrls: ['./Deal_Type.component.css']
})
export class Deal_TypeComponent implements OnInit {
    Deal_Type_: Deal_Type = new Deal_Type();
    Deal_Type_Data: Deal_Type[] = [];

    Entry_View: boolean = true;
    EditIndex: number = -1;
    Total_Entries: number = 0;
    Search_Name: string = '';

    issLoading: boolean = false;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;

    constructor(public Deal_Type_Service_: Deal_TypeService, public dialogBox: MatDialog) { }

    ngOnInit() {
        this.Search_Deal_Type();
    }

    New_Deal_Type() {
        this.Entry_View = true;
        this.EditIndex = -1;
        this.Deal_Type_ = new Deal_Type();
    }

    Search_Deal_Type() {
        this.Deal_Type_Service_.Search_Deal_Type(this.Search_Name).subscribe(
            Rows => {
                this.Deal_Type_Data = Rows[0];
                this.Total_Entries = this.Deal_Type_Data.length;
            },
            Rows => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: Rows.error.text, Type: '2' }
                });
            }
        );
    }

    Save_Deal_Type() {
        if (this.Deal_Type_.Deal_Type_Name == undefined || this.Deal_Type_.Deal_Type_Name == '') {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: 'Enter Deal Type Name', Type: '3' }
            });
            return;
        }

        this.Deal_Type_Service_.Save_Deal_Type(this.Deal_Type_).subscribe(
            Save_status => {
                if (Number(Save_status[0].Deal_Type_Id_) > 0) {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: 'Saved', Type: 'false' }
                    });
                    this.New_Deal_Type();
                    this.Search_Deal_Type();
                } else {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: 'Not Saved', Type: '2' }
                    });
                }
            },
            Rows => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: Rows.error.text, Type: '2' }
                });
            }
        );
    }

    Edit_Deal_Type(Deal_Type_e: Deal_Type, index) {
        this.Entry_View = true;
        this.EditIndex = index;
        this.Deal_Type_ = Object.assign({}, Deal_Type_e);
    }

    Delete_Deal_Type(Deal_Type_Id: number, index) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Do you want to delete ?', Type: 'true', Heading: 'Confirm' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result == 'Yes') {
                this.Deal_Type_Service_.Delete_Deal_Type(Deal_Type_Id).subscribe(
                    Delete_status => {
                        Delete_status = Delete_status[0];
                        Delete_status = Delete_status[0];
                        if (Delete_status.DeleteStatus == true) {
                            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                panelClass: 'Dialogbox-Class',
                                data: { Message: 'Deleted', Type: 'false' }
                            });
                            this.Deal_Type_Data.splice(index, 1);
                            this.Total_Entries = this.Total_Entries - 1;
                        } else {
                            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                panelClass: 'Dialogbox-Class',
                                data: { Message: Delete_status.DeleteMessage, Type: '2' }
                            });
                        }
                    },
                    Rows => {
                        const dialogRef = this.dialogBox.open(DialogBox_Component, {
                            panelClass: 'Dialogbox-Class',
                            data: { Message: Rows.error.text, Type: '2' }
                        });
                    }
                );
            }
        });
    }
}
