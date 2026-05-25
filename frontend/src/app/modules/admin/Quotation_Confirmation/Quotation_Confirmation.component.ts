import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Sales_Master_Service } from '../../../services/Sales_Master.Service';
import { Quotation_Master } from '../../../models/Quotation_Master';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { DecimalPipe } from '@angular/common';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY' },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'DD/MM/YYYY',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-Quotation-Confirmation',
    templateUrl: './Quotation_Confirmation.component.html',
    styleUrls: ['./Quotation_Confirmation.component.css'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        DecimalPipe
    ]
})
export class Quotation_ConfirmationComponent implements OnInit, AfterViewInit {
    @ViewChild('topDiv', { static: false }) topDiv: ElementRef;

    isLoading: boolean = false;
    Quotation_Master_Data: any[] = [];
    Total_Entries: number = 0;
    Total_Amount: number = 0;

    // Filter properties
    Search_Customer: string = '';
    Search_QuotationNo: string = '';
    Search_ReferenceNo: string = '';
    Search_FromDate: any = moment().startOf('month');
    Search_ToDate: any = moment();
    Date_Check: boolean = true;
    
    Status_Filter: any = 2; // Default to Pending
    Payment_Status_Filter: any = 0;

    Status_Data: any[] = [
        { id: 0, name: 'All Status' },
        { id: 1, name: 'Draft' },
        { id: 2, name: 'Pending' },
        { id: 3, name: 'Approved' },
        { id: 4, name: 'Rejected' },
        { id: 5, name: 'Confirmed' }
    ];

    // Permissions
    permissions: any;
    Menu_Id: number = 119; // Using Quotation Menu ID for now or a new one

    // Side Drawer / Preview
    selectedQuotation: any = null;
    showPreview: boolean = false;

    constructor(
        public sales_Master_Service_: Sales_Master_Service,
        private router: Router,
        public dialog: MatDialog,
        private decimalPipe: DecimalPipe
    ) { }

    ngOnInit() {
        this.permissions = Get_Page_Permission(this.Menu_Id);
        this.Search_Quotation_Confirmation();
    }

    ngAfterViewInit() { }

    Search_Quotation_Confirmation() {
        this.isLoading = true;
        const fromDate = this.Search_FromDate ? moment(this.Search_FromDate).format('YYYY-MM-DD') : null;
        const toDate = this.Search_ToDate ? moment(this.Search_ToDate).format('YYYY-MM-DD') : null;
        
        const dateCheckValue = this.Date_Check ? 1 : 0;
        const customerValue = this.Search_Customer === "" ? 0 : this.Search_Customer;
        const quotNoValue = this.Search_QuotationNo === "" ? undefined : this.Search_QuotationNo;
        const referenceNoValue = this.Search_ReferenceNo === "" ? undefined : this.Search_ReferenceNo;

        this.sales_Master_Service_.Search_Quotation(
            dateCheckValue as any,
            fromDate,
            toDate,
            customerValue as any,
            quotNoValue,
            undefined, // partNo
            0, // Item_Group_Id
            0, // CurrencyDetails_Id
            0, // User_Details_Id
            localStorage.getItem('User_Type'),
            localStorage.getItem('Login_User')
        ).subscribe((response: any) => {
            if (response.success) {
                this.Quotation_Master_Data = response.data[0] || [];
                
                // Normalize status values based on Status_Id and Status
                this.Quotation_Master_Data.forEach(q => {
                    if (q.Status_Id !== undefined && q.Status_Id !== null) {
                        const sid = parseInt(q.Status_Id);
                        if (sid === 1) {
                            if (q.workflow_status === 'CONFIRMED' || q.Status == 5) {
                                q.Status = 5;
                                q.Status_Name = 'Confirmed';
                            } else {
                                q.Status = 2;
                                q.Status_Name = 'Pending';
                            }
                        } else if (sid === 2) {
                            if (q.workflow_status === 'CONFIRMED' || q.Status == 5) {
                                q.Status = 5;
                                q.Status_Name = 'Confirmed';
                            } else {
                                q.Status = 3;
                                q.Status_Name = 'Approved';
                            }
                        } else if (sid === 3) {
                            q.Status = 4;
                            q.Status_Name = 'Rejected';
                        }
                    } else {
                        // Fallback using traditional Status column if Status_Id is missing
                        const statusVal = parseInt(q.Status);
                        if (statusVal === 2) {
                            q.Status_Id = 1;
                            q.Status_Name = 'Pending';
                        } else if (statusVal === 3) {
                            q.Status_Id = 2;
                            q.Status_Name = 'Approved';
                        } else if (statusVal === 4) {
                            q.Status_Id = 3;
                            q.Status_Name = 'Rejected';
                        } else if (statusVal === 5) {
                            q.Status_Id = 2;
                            q.Status_Name = 'Approved';
                        } else if (statusVal === 1) {
                            q.Status_Id = 1;
                            q.Status_Name = 'Draft';
                        }
                    }
                });
                
                // Client-side filtering for Status if needed
                if (this.Status_Filter != 0) {
                    this.Quotation_Master_Data = this.Quotation_Master_Data.filter(q => q.Status == this.Status_Filter);
                }
                
                this.Total_Entries = this.Quotation_Master_Data.length;
                this.Total_Amount = this.Quotation_Master_Data.reduce((acc, curr) => acc + (curr.NetTotal || 0), 0);
            } else {
                this.Quotation_Master_Data = [];
                this.Total_Entries = 0;
                this.Total_Amount = 0;
            }
            this.isLoading = false;
        }, error => {
            this.isLoading = false;
            this.Show_Message("Error loading quotations", false);
        });
    }

    Reset_Filters() {
        this.Search_Customer = '';
        this.Search_QuotationNo = '';
        this.Search_ReferenceNo = '';
        this.Search_FromDate = moment().startOf('month');
        this.Search_ToDate = moment();
        this.Status_Filter = 2;
        this.Search_Quotation_Confirmation();
    }

    Refresh_Click() {
        this.Search_Quotation_Confirmation();
    }

    Confirm_Quotation(quotation: any) {
        const dialogRef = this.dialog.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Are you sure you want to confirm this quotation?', Type: "true" },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'Yes') {
                this.isLoading = true;
                this.sales_Master_Service_.Update_Quotation_Workflow_Status(quotation.SalesQuotationMaster_Id, 'CONFIRMED').subscribe(response => {
                    this.isLoading = false;
                    this.Show_Message("Quotation Confirmed Successfully", true);
                    this.Search_Quotation_Confirmation();
                }, error => {
                    this.isLoading = false;
                    this.Show_Message("Failed to confirm quotation", false);
                });
            }
        });
    }

    Cancel_Confirmation(quotation: any) {
        const dialogRef = this.dialog.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Are you sure you want to cancel the confirmation?', Type: "true" },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'Yes') {
                this.isLoading = true;
                this.sales_Master_Service_.Update_Quotation_Workflow_Status(quotation.SalesQuotationMaster_Id, 'APPROVED').subscribe(response => {
                    this.isLoading = false;
                    this.Show_Message("Confirmation Cancelled", true);
                    this.Search_Quotation_Confirmation();
                }, error => {
                    this.isLoading = false;
                    this.Show_Message("Failed to cancel confirmation", false);
                });
            }
        });
    }

    Approve_Quotation(quotation: any) {
        const dialogRef = this.dialog.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Are you sure you want to approve this quotation?', Type: "true" },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'Yes') {
                this.isLoading = true;
                this.sales_Master_Service_.Update_Quotation_Workflow_Status(quotation.SalesQuotationMaster_Id, 'APPROVED').subscribe(response => {
                    this.isLoading = false;
                    this.Show_Message("Quotation Approved Successfully", true);
                    this.Search_Quotation_Confirmation();
                }, error => {
                    this.isLoading = false;
                    this.Show_Message("Failed to approve quotation", false);
                });
            }
        });
    }

    Reject_Quotation(quotation: any) {
        const dialogRef = this.dialog.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Are you sure you want to reject this quotation?', Type: "true" },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'Yes') {
                this.isLoading = true;
                this.sales_Master_Service_.Update_Quotation_Workflow_Status(quotation.SalesQuotationMaster_Id, 'REJECTED').subscribe(response => {
                    this.isLoading = false;
                    this.Show_Message("Quotation Rejected Successfully", true);
                    this.Search_Quotation_Confirmation();
                }, error => {
                    this.isLoading = false;
                    this.Show_Message("Failed to reject quotation", false);
                });
            }
        });
    }

    View_Quotation(quotation: any) {
        this.isLoading = true;
        this.sales_Master_Service_.Load_SalesQuotationMaster(quotation.SalesQuotationMaster_Id).subscribe((masterResp: any) => {
            const masterData = (masterResp && typeof masterResp === "object" && "data" in masterResp) ? masterResp.data : masterResp;
            let fullQuotation = Object.assign({}, quotation);
            if (masterData && masterData[0] && masterData[0][0]) {
                fullQuotation = Object.assign(fullQuotation, masterData[0][0]);
            }
            
            this.sales_Master_Service_.Get_Quotation_Details(quotation.SalesQuotationMaster_Id).subscribe(detailsResp => {
                const detailsData = (detailsResp && typeof detailsResp === "object" && "data" in detailsResp) ? detailsResp.data : detailsResp;
                this.selectedQuotation = fullQuotation;
                this.selectedQuotation.items = (detailsData && detailsData[0]) ? detailsData[0] : [];
                this.showPreview = true;
                this.isLoading = false;
            }, err => {
                this.isLoading = false;
                this.selectedQuotation = fullQuotation;
                this.selectedQuotation.items = [];
                this.showPreview = true;
            });
        }, err => {
            this.isLoading = false;
            this.Show_Message("Error loading quotation details.", false);
        });
    }

    Close_Preview() {
        this.showPreview = false;
        this.selectedQuotation = null;
    }

    Convert_To_SalesOrder(quotation: any) {
        localStorage.setItem('QuotationNo', quotation.SalesQuotationMaster_Id.toString());
        this.router.navigateByUrl('/SalesOrder');
    }

    Print_Quotation(quotation: any) {
        if (!quotation || !quotation.SalesQuotationMaster_Id) {
            return;
        }

        this.isLoading = true;
        this.sales_Master_Service_.Print_Quotation(quotation.SalesQuotationMaster_Id).subscribe(blob => {
            this.isLoading = false;
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        }, err => {
            console.error('Error generating PDF:', err);
            this.isLoading = false;
            this.Show_Message("Error generating PDF.", false);
        });
    }

    Export_To_Excel() {
        if (this.Quotation_Master_Data.length > 0) {
            this.sales_Master_Service_.exportExcel(this.Quotation_Master_Data, 'Quotation_Confirmation_List');
        } else {
            this.Show_Message("No data to export", false);
        }
    }

    Show_Message(message: string, isSuccess: boolean) {
        this.dialog.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: message, Type: isSuccess ? "false" : "2" },
        });
    }

    Get_Status_Class(statusId: any) {
        const id = parseInt(statusId);
        switch (id) {
            case 3: return 'status-approved';
            case 5: return 'status-confirmed';
            case 2: return 'status-pending';
            case 4: return 'status-rejected';
            default: return 'status-draft';
        }
    }

    Get_Status_Name(statusId: any) {
        const id = parseInt(statusId);
        const status = this.Status_Data.find(s => s.id == id);
        return status ? status.name : (statusId || 'Unknown');
    }
}
