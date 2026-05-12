/***
 * All routes with in admin module should be defined here
 */
import { Routes } from "@angular/router";

import { Account_GroupComponent } from "./Account_Group/Account_Group.component";
import { Account_YearsComponent } from "./Account_Years/Account_Years.component";
import { Client_AccountsComponent } from "./Client_Accounts/Client_Accounts.component";
import { Contra_EntryComponent } from "./Contra_Entry/Contra_Entry.component";
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
import { SupplierComponent } from "./Supplier/Supplier.component";

import { CompanyComponent } from "./Company/Company.component";

import { BankComponent } from "./Bank/Bank.component";
import { Cheque_BookComponent } from "./Cheque_Book/Cheque_Book.component";
import { AdminComponent } from "./admin.component";
import { purchase_return_masterComponent } from "./Purchase_Return_Master/Purchase_Return_Master.component";



import { QuotationComponent } from "./Quotation/Quotation.component";
import { RequirementComponent } from "./Requirement/Requirement.component";
import { BrandComponent } from "./Brand/Brand.component";
import { Payment_TermComponent } from "./Payment_Term/Payment_Term.component";
import { ModelComponent } from "./Model/Model.component";
import { TermsAndConditionComponent } from "./TermsAndCondition/TermsAndCondition.component";
import { CurrencyComponent } from "./Currency/Currency.component";
import { Country_Of_OrginComponent } from "./Country_Of_Orgin/Country_Of_Orgin.component";
import { Delivery_OrderComponent } from "./Delivery_Order/Delivery_Order.component";
import { Performa_InvoiceComponent } from "./Performa_Invoice/Performa_Invoice.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { Purchase_orderComponent } from "./Purchase_Order/Purchase_Order.component";
import { GRNComponent } from "./grn/grn.component";
import { Packing_ListComponent } from "./Packing_List/Packing_List.component";
import { PurchaseReturnComponent } from "./purchase-return/purchase-return.component";
//import { Credit_NoteComponent } from "./Credit_Note/Credit_Note.component";
//import { debitnoteComponent } from "./debit-note/debit-note.component";
import { Journal_Entry_NewComponent } from "./Journal_Entry_New/Journal_Entry_New.component";
import { ReceiptVoucherComponent } from "./ReceiptVoucher/ReceiptVoucher.component";
import { Stock_ReportsComponent } from "./Stock_Reports/Stock_Reports.component";
import { ProfitAndLossReportComponent } from "./ProfitAndLossReport/ProfitAndLossReport.component";
import { Vat_ReportComponent } from "./Vat_Report/Vat_Report.component";
import { GRN_Vat_ReportComponent } from "./GRN_Vat_Report/GRN_Vat_Report.component";
import { OutstandingReportComponent } from "./OutstandingReport/OutstandingReport.component";
import { StatementOfAccountComponent } from "./statement-of-account/statement-of-account.component";
import { AddStockComponent } from "./AddStock/AddStock.component";
import { Sales_ReturnComponent } from "./Sales_Return/Sales_Return.component";
import{Stock_AdjustComponent}from "./Stock_Adjust/Stock_Adjust.component";
import { StockTakeComponent } from "./StockTake/StockTake.component";
import{StockTakeNameComponent}from "./StockTakeName/StockTakeName.component";
import{Credit_NoteComponent} from "./Credit_Note/Credit_Note.component";
import{Debit_NoteComponent} from "./Debit_Note/Debit_Note.component";
import { LeadComponent } from './Lead/Lead.component';
import { SalesOrderComponent } from './SalesOrder/SalesOrder.component';
import { LeadRequirementComponent } from './LeadRequirement/LeadRequirement.component';
import { LeadRequirementTransactionComponent } from './LeadRequirementTransaction/LeadRequirementTransaction.component';
import { Price_RequestComponent } from './Price_Request/Price_Request.component';
import { Price_ResponseComponent } from './Price_Response/Price_Response.component';

export const AdminRoutes: Routes = [
	{
		path: "",
		component: AdminComponent,
		children: [
			{ path: "", redirectTo: "/Requirement", pathMatch: "full" },
			{ path: "Account_Group", component: Account_GroupComponent },
			{ path: "Account_Years", component: Account_YearsComponent },
			{ path: "Customer", component: CustomerComponent },

			{ path: "Client_Accounts", component: Client_AccountsComponent },
			{ path: "Contra_Entry", component: Contra_EntryComponent },

			{ path: "Employee_Details", component: Employee_DetailsComponent },
			{ path: "General_Settings", component: General_SettingsComponent },
			{ path: "HSN", component: HSNComponent },
			{ path: "Item", component: ItemComponent },
			{ path: "Item_Group", component: Item_GroupComponent },
			{ path: "Journal_Entry", component: Journal_EntryComponent },
			{ path: "Payment_Voucher", component: Payment_VoucherComponent },
		
			{ path: "Purchase_Master", component: Purchase_MasterComponent },
			{ path: "Receipt_Reference", component: Receipt_ReferenceComponent },
			{ path: "Receipt_Voucher", component: Receipt_VoucherComponent },
			{ path: "Sale_Unit", component: Sale_UnitComponent },
			{ path: "Stock", component: StockComponent },
			{ path: "Stock_Add_Details", component: Stock_Add_DetailsComponent },
			{ path: "User_Details", component: User_DetailsComponent },
			{ path: "Ledger", component: LedgerComponent },
			{ path: "Supplier", component: SupplierComponent },
			{ path: "Company", component: CompanyComponent },
			{ path: "Bank", component: BankComponent },
			{ path: "Cheque_Book", component: Cheque_BookComponent },
			{
				path: "Purchase_Return_Master",
				component: purchase_return_masterComponent,
			},
			{ path: "Quotation", component: QuotationComponent },
			{ path: "Requirement", component: RequirementComponent },
			
			{ path: "Purchase_order", component: Purchase_orderComponent },
			{ path: "Sales_Return", component: Sales_ReturnComponent },
			{ path: "Brand", component: BrandComponent },
			{ path: "AddStock", component: AddStockComponent },
			{ path: "Payment_Term", component: Payment_TermComponent },
			{ path: "Model", component: ModelComponent },
			{ path: "Terms_And_Condition", component: TermsAndConditionComponent },
			{ path: "Currency", component: CurrencyComponent },
			{ path: "Country_Of_Orgin", component: Country_Of_OrginComponent },
			{ path: "Delivery_Order", component: Delivery_OrderComponent },
			{ path: "Statement_of_Account", component: StatementOfAccountComponent },
			{ path: "Performa_Invoice", component: Performa_InvoiceComponent },
			{ path: "Invoice", component: InvoiceComponent },
			{ path: "GRN", component: GRNComponent },
			{ path: "Packing_List", component: Packing_ListComponent },
			{path: "Credit_Note", component: Credit_NoteComponent},
			{path: "Debit_Note", component: Debit_NoteComponent},
			{ path: "Purchase_Return", component: PurchaseReturnComponent },
			{ path: "Journal_Entry_New", component: Journal_Entry_NewComponent },
			{ path: "ReceiptVoucher", component: ReceiptVoucherComponent },
			{ path: "Stock_Reports", component: Stock_ReportsComponent },
			{ path: "ProfitAndLossReport", component: ProfitAndLossReportComponent },
			{ path: "Vat_Report", component: Vat_ReportComponent },

			{ path: "GRN_Vat_Report", component: GRN_Vat_ReportComponent },
			{ path: "OutstandingReport", component: OutstandingReportComponent },

			{ path: "Stock_Adjust", component: Stock_AdjustComponent },
			{path:"Stock_Take",component:StockTakeComponent},
			{path:"StockTakeName",component:StockTakeNameComponent},
			{ path: 'Lead', component: LeadComponent },
			{ path: 'LeadRequirement', component: LeadRequirementComponent },
			{ path: 'LeadRequirementTransaction/:id', component: LeadRequirementTransactionComponent },
			{ path: 'SalesOrder', component: SalesOrderComponent },
			{ path: "PriceRequest", component: Price_RequestComponent },
			{ path: "PriceResponse", component: Price_ResponseComponent },


			{ path: "**", redirectTo: "/auth/login" },
		],
	},
];
