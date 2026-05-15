import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { TermsAndCondition_Service } from '../../../services/TermsAndCondition.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { TermsAndCondition } from '../../../models/TermsAndCondition';
import { MatDialog } from '@angular/material/dialog';
import { Get_Page_Permission } from '../../../components/sidebar/sidebar.component';

@Component({
    selector: 'app-TermsAndCondition',
    templateUrl: './TermsAndCondition.component.html',
    styleUrls: ['./TermsAndCondition.component.css']
})
export class TermsAndConditionComponent implements OnInit {
    Terms_Data: TermsAndCondition[] = [];
    Term_: TermsAndCondition = new TermsAndCondition();
    Search_Caption: string = '';
    myInnerHeight: number;
    Entry_View: boolean = true;
    Total_Entries: number = 0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Term_Edit: boolean = true;
    Term_Save: boolean = true;
    Term_Delete: boolean = false;
    Check_Hide: boolean = true;

    constructor(
        public Terms_Service_: TermsAndCondition_Service,
        public dialogBox: MatDialog
    ) {}

    ngOnInit() {
        try {
            this.Permissions = Get_Page_Permission(0);
            this.Term_Edit = this.Permissions && this.Permissions.Edit !== undefined ? this.Permissions.Edit : true;
            this.Term_Save = this.Permissions && this.Permissions.Save !== undefined ? this.Permissions.Save : true;
            this.Term_Delete = this.Permissions && this.Permissions.Delete !== undefined ? this.Permissions.Delete : false;
        } catch (e) {
            this.Term_Edit = true;
            this.Term_Save = true;
            this.Term_Delete = false;
        }
        this.Page_Load();
    }

    trackByFn(index, item) {
        return index;
    }

    Page_Load() {
        this.myInnerHeight = window.innerHeight - 300;
        this.Clr_Term();
        this.Search_Term();
        this.Entry_View = false;
        this.Check_Hide = true;
    }

    Create_New() {
        this.Entry_View = true;
        this.Check_Hide = true;
        this.Clr_Term();
    }

    Close_Click() {
        this.Entry_View = false;
        this.Check_Hide = true;
        this.Search_Term();
    }

    Clr_Term() {
        this.Term_.Term_Id = 0;
        this.Term_.Caption = '';
        this.Term_.Terms_Text = '';
        this.Term_.Description = '';
        this.Term_.Is_Update = false;
        this.Term_.Checkbox = false;
    }

    private normalizeArrayResponse(response: any): any[] {
        if (Array.isArray(response)) {
            return response;
        }
        if (!response || typeof response !== 'object') {
            return [];
        }
        const firstArray = Object.values(response).find(value => Array.isArray(value)) as any[];
        return firstArray || [];
    }

    Search_Term() {
        if (this.Search_Caption == undefined) this.Search_Caption = '';
        this.issLoading = true;
        this.Terms_Service_.Search_TermsAndCondition(this.Search_Caption).subscribe(
            Rows => {
                this.Terms_Data = this.normalizeArrayResponse(Rows);
                this.Total_Entries = this.Terms_Data.length;
                if (!this.Terms_Data || this.Terms_Data.length === 0) {
                    this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No Details Found', Type: '3' } });
                }
                this.issLoading = false;
            },
            error => {
                this.issLoading = false;
                this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: '2' } });
            }
        );
    }

    Save_Term() {
        if (!this.Term_.Caption || this.Term_.Caption.trim() === '') {
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Caption', Type: '3' } });
            return;
        }
        // if (!this.Term_.Terms_Text || this.Term_.Terms_Text.trim() === '') {
        //     this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Terms & Condition', Type: '3' } });
        //     return;
        // }

        this.issLoading = true;
        this.Terms_Service_.Save_TermsAndCondition(this.Term_)
            .pipe(finalize(() => {
                this.issLoading = false;
            }))
            .subscribe({
                next: (Save_status: any) => {
                    console.log('Terms save response:', Save_status);
                    let savedId = 0;
                    let actualData = Save_status;

                    // Handle wrapped response from autoResponseWrapper
                    if (Save_status && Save_status.success === true && Save_status.data) {
                        actualData = Save_status.data;
                    }

                    if (Array.isArray(actualData) && actualData[0] && actualData[0][0]) {
                        savedId = Number(actualData[0][0].Term_Id_ || actualData[0][0].Term_Id || 0);
                    } else if (Array.isArray(actualData) && actualData[0]) {
                        savedId = Number(actualData[0].Term_Id_ || actualData[0].Term_Id || 0);
                    } else if (actualData && actualData.affectedRows) {
                        savedId = Number(actualData.insertId || this.Term_.Term_Id || 1);
                    }

                    if (savedId > 0) {
                        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved Successfully', Type: 'false' } });
                        this.Clr_Term();
                        this.Entry_View = false;
                        this.Search_Term();
                    } else {
                        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: '2' } });
                    }
                },
                error: error => {
                    this.issLoading = false;
                    this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Server Error', Type: '2' } });
                }
            });
    }

    Edit_Term(term: TermsAndCondition, index) {
        this.Entry_View = true;
        this.Check_Hide = false;
        this.Term_ = Object.assign({}, term);
    }
}
