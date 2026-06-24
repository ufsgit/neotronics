import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Model_Service } from '../../../services/Model.Service';
import { Item_Service } from '../../../services/Item.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Model } from '../../../models/Model';
import { MatDialog } from '@angular/material/dialog';
import { Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Master_Refresh_Service } from '../../../services/Master_Refresh.Service';

@Component({
    selector: 'app-Model',
    templateUrl: './Model.component.html',
    styleUrls: ['./Model.component.css']
})
export class ModelComponent implements OnInit {
    Model_Data: Model[] = [];
    Model_: Model = new Model();
    Item_Data: any[] = [];
    Item_: any;
    Search_Model_: string;
    myInnerHeight: number;
    Entry_View: boolean = true;
    Total_Entries: number = 0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Model_Edit: boolean = true;
    Model_Save: boolean = true;
    Model_Delete: boolean = false;
    Check_Hide: boolean = true;

    constructor(
        public Model_Service_: Model_Service,
        public Item_Service_: Item_Service,
        public dialogBox: MatDialog,
        private Master_Refresh_Service_: Master_Refresh_Service
    ) {}

    ngOnInit() {
        try {
            this.Permissions = Get_Page_Permission(0);
            this.Model_Edit = this.Permissions && this.Permissions.Edit !== undefined ? this.Permissions.Edit : true;
            this.Model_Save = this.Permissions && this.Permissions.Save !== undefined ? this.Permissions.Save : true;
            this.Model_Delete = this.Permissions && this.Permissions.Delete !== undefined ? this.Permissions.Delete : false;
        } catch (e) {
            this.Model_Edit = true;
            this.Model_Save = true;
            this.Model_Delete = false;
        }
        this.Page_Load();
    }

    trackByFn(index, item) {
        return index;
    }

    Page_Load() {
        this.myInnerHeight = window.innerHeight - 300;
        this.Clr_Model();
        this.Search_Model();
        this.Entry_View = false;
        this.Check_Hide = true;
        this.Model_.Checkbox = false;
    }

    Create_New() {
        this.Entry_View = true;
        this.Check_Hide = true;
        this.Item_ = null;
        this.Clr_Model();
    }

    Close_Click() {
        this.Entry_View = false;
        this.Check_Hide = true;
        this.Search_Model();
    }

    Clr_Model() {
        this.Model_.Model_Id = 0;
        this.Model_.Model_Name = '';
        this.Model_.Model_Code = '';
        this.Model_.Item_Id = 0;
        this.Model_.Item_Name = '';
        this.Model_.Is_Update = false;
        this.Model_.Checkbox = false;
        this.Item_Data = [];
        this.Item_ = null;
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

    Search_Model() {
        if (this.Search_Model_ == undefined) this.Search_Model_ = '';
        this.issLoading = true;
        this.Model_Service_.Search_Model(this.Search_Model_).subscribe(
            Rows => {
                this.Model_Data = this.normalizeArrayResponse(Rows);
                this.Total_Entries = this.Model_Data.length;
                if (!this.Model_Data || this.Model_Data.length === 0) {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No Details Found', Type: '3' } });
                }
                this.issLoading = false;
            },
            error => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: '2' } });
            }
        );
    }

    Search_Item_Typeahead(event: any) {
        var Value = "";
        if (event && event.target && event.target.value) {
            Value = event.target.value;
        }

        if (this.Item_Data == undefined || this.Item_Data.length == 0 || Value != "") {
            this.issLoading = true;
            this.Item_Service_.Item_Typeahead(Value).subscribe((response: any) => {
                const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
                if (Rows != null) {
                    if (Array.isArray(Rows) && Array.isArray(Rows[0])) {
                        this.Item_Data = Rows[0];
                    } else if (Array.isArray(Rows)) {
                        this.Item_Data = Rows;
                    }
                }
                this.issLoading = false;
            },
                error => {
                    this.issLoading = false;
                });
        }
    }

    display_Item(Item_: any) {
        if (Item_) { return Item_.Item_Name || Item_.ItemName; }
    }

    Select_Item(item: any) {
        if (!item) return;
        this.Model_.Item_Id = item.Item_Id || 0;
        this.Model_.Item_Name = item.Item_Name || item.ItemName;
    }

    Save_Model() {
        if (!this.Model_.Model_Name || this.Model_.Model_Name.trim() === '') {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Model Name', Type: '3' } });
            return;
        }

        if (this.Item_) {
            if (typeof this.Item_ === 'object') {
                this.Model_.Item_Id = this.Item_.Item_Id || this.Item_.ItemId || 0;
                this.Model_.Item_Name = this.Item_.Item_Name || this.Item_.ItemName || '';
            } else if (typeof this.Item_ === 'string') {
                this.Model_.Item_Name = this.Item_;
            }
        }

        if (!this.Model_.Item_Name || this.Model_.Item_Name.trim() === '') {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter or select the Item Name', Type: '3' } });
            return;
        }

        this.issLoading = true;
        this.Model_Service_.Save_Model(this.Model_)
            .pipe(finalize(() => {
                this.issLoading = false;
            }))
            .subscribe({
                next: (Save_status: any) => {
                    let savedId = 0;
                    if (Array.isArray(Save_status)) {
                        if (Save_status[0] && Save_status[0][0]) {
                            savedId = Number(Save_status[0][0].Model_Id_ || Save_status[0][0].Model_Id || 0);
                        } else if (Save_status[0] && typeof Save_status[0] === 'object' && (Save_status[0].affectedRows || Save_status[0].insertId || Save_status[0].changedRows)) {
                            savedId = Number(this.Model_.Model_Id || 1);
                        }
                    } else if (Save_status && typeof Save_status === 'object') {
                        const saveResult: any = Save_status;
                        if (saveResult.affectedRows || saveResult.changedRows) {
                            savedId = Number(this.Model_.Model_Id || 1);
                        } else if (saveResult.insertId) {
                            savedId = Number(saveResult.insertId);
                        } else if (!saveResult.error && Object.keys(saveResult).length > 0) {
                            savedId = Number(this.Model_.Model_Id || 1);
                        }
                    }
                    if (savedId > 0) {
                        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved Successfully', Type: 'false' } });
                        this.Clr_Model();
                        this.Entry_View = false;
                        this.Search_Model();
                        this.Master_Refresh_Service_.refreshMaster('Model');
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

    Edit_Model(model: Model, index) {
        this.Entry_View = true;
        this.Check_Hide = false;
        this.Model_ = Object.assign({}, model);
        this.Item_ = { Item_Id: this.Model_.Item_Id, Item_Name: this.Model_.Item_Name };
        this.Item_Data = [];
    }
}
