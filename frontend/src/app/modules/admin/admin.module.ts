/***
 * Admin module
 * Declare all componets that is used in admin module
 */
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import {
	MatTableModule,
	MatProgressSpinnerModule,
	MatDialogModule,
	MatAutocompleteModule,
	MatPaginatorModule,
	MatToolbarModule,
	MatSidenavModule,
	MatSortModule,
	MatMenuModule,
	MatIconModule,
	MatButtonModule,
	MatSelectModule,
	MatFormFieldModule,
	MatDatepickerModule,
	MatExpansionModule,
} from "@angular/material";
import { MatNativeDateModule } from "@angular/material";
import { SharedModule } from "../shared-module/shared-module";
import { AdminRoutes } from "./admin.routing";
import { AdminComponent } from "./admin.component";
import { HttpClientModule } from "@angular/common/http";
import { GoogleChartsModule } from "angular-google-charts";
import { Account_GroupComponent } from "./Account_Group/Account_Group.component";
import { Account_YearsComponent } from "./Account_Years/Account_Years.component";
import { Client_AccountsComponent } from "./Client_Accounts/Client_Accounts.component";
import { Contra_EntryComponent } from "./Contra_Entry/Contra_Entry.component";
import { Damage_MasterComponent } from "./Damage_Master/Damage_Master.component";
import { Employee_DetailsComponent } from "./Employee_Details/Employee_Details.component";
import { General_SettingsComponent } from "./General_Settings/General_Settings.component";
import { HSNComponent } from "./HSN/HSN.component";
import { ItemComponent } from "./Item/Item.component";
import { Item_GroupComponent } from "./Item_Group/Item_Group.component";
import { Journal_EntryComponent } from "./Journal_Entry/Journal_Entry.component";
import { Payment_VoucherComponent } from "./Payment_Voucher/Payment_Voucher.component";
import { Purchase_MasterComponent } from "./Purchase_Master/Purchase_Master.component";
import { Receipt_ReferenceComponent } from "./Receipt_Reference/Receipt_Reference.component";
import { Receipt_VoucherComponent } from "./Receipt_Voucher/Receipt_Voucher.component";
import { Sale_UnitComponent } from "./Sale_Unit/Sale_Unit.component";
import { StockComponent } from "./Stock/Stock.component";
import { Stock_Add_DetailsComponent } from "./Stock_Add_Details/Stock_Add_Details.component";
import { User_DetailsComponent } from "./User_Details/User_Details.component";
import { LedgerComponent } from "./Ledger/Ledger.component";
import { CustomerComponent } from "./Customer/Customer.component";
import { Cheque_BookComponent } from "./Cheque_Book/Cheque_Book.component";
import { BankComponent } from "./Bank/Bank.component";
import { CompanyComponent } from "./Company/Company.component";
import { SupplierComponent } from "./Supplier/Supplier.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { purchase_return_masterComponent } from "./Purchase_Return_Master/Purchase_Return_Master.component";
import { QuotationComponent } from "./Quotation/Quotation.component";
import { RequirementComponent } from "./Requirement/Requirement.component";
import { ChatService } from "app/services/Chat.Service";
import { BrandComponent } from "./Brand/Brand.component";
import { Payment_TermComponent } from "./Payment_Term/Payment_Term.component";
import { CurrencyComponent } from "./Currency/Currency.component";
import { Country_Of_OrginComponent } from "./Country_Of_Orgin/Country_Of_Orgin.component";
import { Delivery_OrderComponent } from "./Delivery_Order/Delivery_Order.component";
import { Performa_InvoiceComponent } from "./Performa_Invoice/Performa_Invoice.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InvoiceComponent } from './invoice/invoice.component';
import { Purchase_orderComponent } from "./Purchase_Order/Purchase_Order.component";
import { GRNComponent } from './grn/grn.component';
import { Packing_ListComponent } from "./Packing_List/Packing_List.component";
import { PurchaseReturnComponent } from "./purchase-return/purchase-return.component";
//import { CreditNoteComponent } from "./Credit_Note/Credit_Note.component";
//import { debitnoteComponent } from './debit-note/debit-note.component';
import { Journal_Entry_NewComponent } from "./Journal_Entry_New/Journal_Entry_New.component";
import { ReceiptVoucherComponent } from "./ReceiptVoucher/ReceiptVoucher.component";
import { Stock_ReportsComponent } from "./Stock_Reports/Stock_Reports.component";
import { ProfitAndLossReportComponent } from "./ProfitAndLossReport/ProfitAndLossReport.component";
import { Vat_ReportComponent } from "./Vat_Report/Vat_Report.component";
import { GRN_Vat_ReportComponent } from "./GRN_Vat_Report/GRN_Vat_Report.component";
import { OutstandingReportComponent } from "./OutstandingReport/OutstandingReport.component";
import { StatementOfAccountComponent } from './statement-of-account/statement-of-account.component';
import { Sales_ReturnComponent } from "./Sales_Return/Sales_Return.component";
import { AddStockComponent } from "./AddStock/AddStock.component";
import { Damage_DetailsComponent } from "./Damage_Details/Damage_Details.component";
import { DashboardComponent } from "./Dashboard/Dashboard.component";
import { DaybookComponent } from "./Daybook/Daybook.component";
import { Journal_ReportComponent } from "./Journal_Report/Journal_Report.component";
import { Stock_ReportComponent } from "./Stock_Report/Stock_Report.component";
import { countryComponent } from "./country/country.component";
import { currencydetailsComponent } from "./currencydetails/currencydetails.component";
import { performainvoicemasterComponent } from "./performainvoicemaster/performainvoicemaster.component";
import { purchaseordermasterComponent } from "./purchaseordermaster/purchaseordermaster.component";
import { salesquotationmasterComponent } from "./salesquotationmaster/salesquotationmaster.component";
import{Stock_AdjustComponent}from "./Stock_Adjust/Stock_Adjust.component";
import { StockTakeComponent } from "./StockTake/StockTake.component";
import{StockTakeNameComponent}from "./StockTakeName/StockTakeName.component";
import{Credit_NoteComponent} from "./Credit_Note/Credit_Note.component";
import{Debit_NoteComponent} from "./Debit_Note/Debit_Note.component";
import { LeadComponent } from './Lead/Lead.component';
import { SalesOrderComponent} from './SalesOrder/SalesOrder.component';
import { LeadRequirementComponent } from './LeadRequirement/LeadRequirement.component';
import { LeadRequirementTransactionComponent } from './LeadRequirementTransaction/LeadRequirementTransaction.component';
import { Price_RequestComponent } from './Price_Request/Price_Request.component';

import { CommonModule } from '@angular/common';
import { from } from "rxjs";

@NgModule({
	imports: [
		RouterModule.forChild(AdminRoutes),
		SharedModule,
		MatTableModule,
		HttpClientModule,
		MatPaginatorModule,
		MatSortModule,
		MatIconModule,
		MatMenuModule,
		GoogleChartsModule,
		MatSelectModule,
		MatButtonModule,
		MatDialogModule,
		MatToolbarModule,
		MatExpansionModule,
		MatSidenavModule,
		MatAutocompleteModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		MatDatepickerModule,
		ScrollingModule,
		FormsModule,  
		HttpModule,
		MatCheckboxModule,
		CommonModule,
		MatNativeDateModule,
	],

	declarations: [
		AdminComponent,	
		Account_GroupComponent,
		Cheque_BookComponent,
		Account_YearsComponent,
		
		BankComponent,
		Client_AccountsComponent,
		Contra_EntryComponent,
		SupplierComponent,
		Damage_MasterComponent,
		Employee_DetailsComponent,
		CustomerComponent,
		General_SettingsComponent,
		HSNComponent,
		ItemComponent,
		Item_GroupComponent,
		Journal_EntryComponent,
		Payment_VoucherComponent,
		Purchase_MasterComponent,
		Receipt_ReferenceComponent,
		Receipt_VoucherComponent,
		Sale_UnitComponent,
		StockComponent,
		Stock_Add_DetailsComponent,
		User_DetailsComponent,
		Sales_ReturnComponent,
		AddStockComponent,
		LedgerComponent,
		CompanyComponent,
		purchase_return_masterComponent,
		QuotationComponent,
		RequirementComponent,
		Purchase_orderComponent,BrandComponent,Payment_TermComponent,CurrencyComponent,Country_Of_OrginComponent,
		Delivery_OrderComponent,
		Purchase_orderComponent,BrandComponent,Payment_TermComponent,CurrencyComponent,Country_Of_OrginComponent,
		Performa_InvoiceComponent,
		InvoiceComponent,
		Purchase_orderComponent,
		GRNComponent,
		Packing_ListComponent,
		PurchaseReturnComponent,
		Credit_NoteComponent,
		Debit_NoteComponent,
		Journal_Entry_NewComponent,
		ReceiptVoucherComponent,
		StatementOfAccountComponent,
		Stock_ReportsComponent,
		ProfitAndLossReportComponent,
		Vat_ReportComponent,
		GRN_Vat_ReportComponent,
		OutstandingReportComponent,
		Damage_DetailsComponent,
		DashboardComponent,
		DaybookComponent,
		Journal_ReportComponent,
		Stock_ReportComponent,
		countryComponent,
		currencydetailsComponent,
		performainvoicemasterComponent,
		purchaseordermasterComponent,
		salesquotationmasterComponent,
		Stock_AdjustComponent,
		StockTakeComponent,
		StockTakeNameComponent,
		LeadComponent,
		LeadRequirementComponent,
		LeadRequirementTransactionComponent,
		SalesOrderComponent,
		Price_RequestComponent
	],
	providers: [ChatService],
	bootstrap: [],
})
export class AdminModule {}
