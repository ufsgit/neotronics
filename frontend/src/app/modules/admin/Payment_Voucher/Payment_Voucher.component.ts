import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from 'rxjs/operators';

import { Payment_Voucher_Service } from "../../../services/Payment_Voucher.Service";
import { Journal_Entry_Service } from "../../../services/Journal_Entry.Service";
import { Receipt_Voucher_Service } from "../../../services/Receipt_Voucher.Service";
import { Client_Accounts_Service } from "../../../services/Client_Accounts.Service";
import { Sales_Master_Service } from "../../../services/Sales_Master.Service"; 
import { currencydetails_Service } from "../../../services/currencydetails.Service";
import { Payment_Reference_Service } from "../../../services/Payment_Reference.Service";
import { DialogBox_Component } from "../DialogBox/DialogBox.component";
import { Payment_Voucher } from "../../../models/Payment_Voucher";
import { currencydetails} from"../../../models/currencydetails";
import { Purchase_Payment } from "../../../models/Purchase_Payment";
import { Client_Accounts } from "../../../models/Client_Accounts";
import { Payment_Reference } from "../../../models/Payment_Reference";
import { Company } from "../../../models/Company";
import { PaymentMode } from "../../../models/PaymentMode";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
	parse: {
		dateInput: "DD/MM/YYYY",
	},
	display: {
		dateInput: "DD/MM/YYYY",
		monthYearLabel: "MMM YYYY",
		dateA11yLabel: "DD/MM/YYYY",
		monthYearA11yLabel: "MMMM YYYY",
	},
};

import { MatDialog } from "@angular/material";
import {
	ROUTES,
	Get_Page_Permission,
} from "../../../components/sidebar/sidebar.component";

@Component({
	selector: "app-Payment_Voucher",
	templateUrl: "./Payment_Voucher.component.html",
	styleUrls: ["./Payment_Voucher.component.css"],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class Payment_VoucherComponent implements OnInit {
	Payment_Voucher_Data: Payment_Voucher[];
	Payment_Voucher_: Payment_Voucher = new Payment_Voucher();
	Payment_Voucher_Name_Search: string;

	Payment_Mode_Data: PaymentMode[];
	Payment_Mode_: PaymentMode = new PaymentMode();
	Mode_Temp: PaymentMode = new PaymentMode();
	FromAccount_: Client_Accounts = new Client_Accounts();
	Client_Accounts_Data: Client_Accounts[];
	From_Client_Accounts_Data: Client_Accounts[];
	Print_Client_: Client_Accounts = new Client_Accounts();
	Client_Accounts_Data_: Client_Accounts[];
	Company_Temp: Company = new Company();
	Company_Data: Company[];
	Company_Search: Company = new Company();
	Print_Company_: Company = new Company();
	currency:currencydetails = new currencydetails();
	currencyData:currencydetails[];
	currencyTemp:currencydetails = new currencydetails();
	currencyName:string;
	Image_Url: string;
	Company_Sign: string;
	Company_Seal: string;

	ToAccount_: Client_Accounts = new Client_Accounts();
	Search_FromDate: Date = new Date();
	Search_ToDate: Date = new Date();
	FromAccount_Search: Client_Accounts = new Client_Accounts();
	ToAccount_Search: Client_Accounts = new Client_Accounts();
	Voucher_No_search: number;
	CurrencySearch : currencydetails;
	FromAccount_Temp: Client_Accounts = new Client_Accounts();
	ToAccount_Temp: Client_Accounts = new Client_Accounts();
	Mobile:string;
	Print_Date_: Date;
	Entry_View: boolean = true;
	myInnerHeight: number;
	myInnerHeightTwo: number;
	EditIndex: number;
	Total_Entries: number = 0;
	color = "primary";
	mode = "indeterminate";
	value = 50;
	Total_Amounts: number = 0;
	Look_In_Date: Boolean = false;
	month: any;
	day: any;
	date: any;
	year: any;
	Login_User: string = "0";
	issLoading: boolean;
	Permissions: any;
	Permissions1: any;
	Payment_Voucher_Edit: boolean=false;
	Payment_Voucher_Save: boolean=false;
	Payment_Voucher_Delete: boolean=false;
	Payment_Voucher_Status: boolean=false;
	Payment_Voucher_Print: boolean=false;

	Purchase_Payment_: Purchase_Payment = new Purchase_Payment();
	Purchase_Payment_Data: Purchase_Payment[];
	Payment_Reference: Payment_Reference = new Payment_Reference();
	Paymnet_Ref_Print: Payment_Reference = new Payment_Reference();
	Payment_Reference_Data:Payment_Reference[]=[];
	Payment_Ref_Print_Data:Payment_Reference[]=[];
	Payment_Reference_Data_temp:Payment_Reference[]=[];
	Purchase_Payment_Data_temp: Purchase_Payment[];invoiceDate;invoiceAmount;InvoiceNo_;
	Customer_Data = [];Search_Customer:Client_Accounts= new Client_Accounts();
	Voucher_Data=[];Invoice_Data=[];Bill_Type;Bank_Data=[];Search_Bank;
	Address1='';Address2='';Address3='';Address4='';PinCode="";GSTNo="";
	Voucher_Temp;
	User_Type: string;
	User_Type_Id:number;

	constructor(
		public Payment_Voucher_Service_: Payment_Voucher_Service,
		public Client_Accounts_Service_: Client_Accounts_Service,
		public Receipt_Voucher_Service_: Receipt_Voucher_Service,
		public Journal_Entry_Service_: Journal_Entry_Service,
		public Sales_Master_Service_:Sales_Master_Service,
		public currencydetails_Service_ : currencydetails_Service,
		public Payment_Reference_Service_:Payment_Reference_Service,
		private route: ActivatedRoute,
		private router: Router,
		public dialogBox: MatDialog
	) {}
	ngOnInit() {
		this.Login_User = localStorage.getItem("Login_User");
		this.User_Type_Id = Number(localStorage.getItem('User_Type_Id'));
		
		this.Permissions = Get_Page_Permission(20);
		this.Permissions1 = Get_Page_Permission(20);
		if (this.Permissions == undefined || this.Permissions == null) {
			localStorage.removeItem("token");
			this.router.navigateByUrl("/auth/login");
		} else {
			this.Payment_Voucher_Edit = this.Permissions.Edit;
			this.Payment_Voucher_Save = this.Permissions.Save;
			this.Payment_Voucher_Delete = this.Permissions.Delete;
			this.Payment_Voucher_Status = this.Permissions1.status;
			this.Page_Load();
		}
	}
	New_Date(Date_) {
		this.date = Date_;
		this.year = this.date.getFullYear();
		this.month = this.date.getMonth() + 1;
		if (this.month < 10) {
			this.month = "0" + this.month;
		}
		this.day = this.date.getDate().toString();
		if (Number.parseInt(this.day) < 10) {
			this.day = "0" + this.day;
		}
		this.date = this.year + "-" + this.month + "-" + this.day;
		return this.date;
	}
	Print_Date(Date_) {
		this.date = Date_;
		this.year = this.date.getFullYear();
		this.month = this.date.getMonth() + 1;
		if (this.month < 10) {
			this.month = "0" + this.month;
		}
		this.day = this.date.getDate().toString();
		if (Number.parseInt(this.day) < 10) {
			this.day = "0" + this.day;
		}
		this.date = this.day + "-" + this.month + "-" + this.year;
		return this.date;
	}

	Page_Load() {
		this.myInnerHeight = window.innerHeight;
		this.myInnerHeight = this.myInnerHeight - 200;
		this.myInnerHeightTwo = this.myInnerHeight -150;

		//this.Accounts_Typeahead();
		this.Search_FromDate = this.New_Date(this.Search_FromDate);
		this.Search_ToDate = this.New_Date(this.Search_ToDate);
		this.Clr_Payment_Voucher();
		//this.Search_Payment_Voucher();
		this.Get_Payment_Mode();
		this.Clr_Purchase_Payment();
		this.Entry_View = false;
		//this.Payment_Voucher_Print = false;
		this.Search_Company();
		this.Load_Currency();
		debugger
		this.Get_Voucher_Type();
	}

	From_Accounts_Typeahead(event: any) {
		this.issLoading = true;
		var Value = "";
		if (event.target.value == "") Value = undefined;
		else Value = event.target.value;

		this.Journal_Entry_Service_.Accounts_Typeahead("11,4,5", Value).subscribe(
			(Rows) => {
				if (Rows != null) {
					this.From_Client_Accounts_Data = Rows[0];
					//this.Print_Client_=this.Client_Accounts_Data[0];
				}
				this.issLoading = false;
			},
			(Rows) => {
				this.issLoading = false;
			}
		);
	}

	Accounts_Typeahead(event: any) {
		this.issLoading = true;
		var Value = "";
		if (event.target.value == "") Value = undefined;
		else Value = event.target.value;

		this.Receipt_Voucher_Service_.Get_Client_Accounts_Typeahead(
			Value
		).subscribe(
			(Rows) => {
				if (Rows != null) {
					this.Client_Accounts_Data = Rows[0];
					//this.Print_Client_=this.Client_Accounts_Data[0];
				}

				this.issLoading = false;
			},
			(Rows) => {
				this.issLoading = false;
			}
		);
	}
	Get_Client_Accounts() {
		this.Client_Accounts_Service_.Get_Client_Accounts(
			this.FromAccount_.Client_Accounts_Id
		).subscribe(
			(Rows) => {
				this.Client_Accounts_Data_ = Rows[0];
				//  this.Company_Info = Rows[0];
				// this.Company_Temp.Company_Id = 0;
				// this.Company_Temp.Company_Name = "Select";
				// this.Company_Data.unshift(this.Company_Temp);
				this.Print_Client_ = this.Client_Accounts_Data_[0];
			},
			(Rows) => {
				//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
			}
		);
	}

	Get_Payment_Mode() {
		this.Payment_Voucher_Service_.Get_Payment_Mode().subscribe(
			(Rows) => {
				this.Payment_Mode_Data = Rows[0];
				this.Mode_Temp.Payment_Mode_Id = 0;
				this.Mode_Temp.Payment_Mode_Name = "Select";
				this.Payment_Mode_Data.unshift(this.Mode_Temp);
				this.Payment_Mode_ = this.Payment_Mode_Data[0];
			},
			(Rows) => {
				//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
			}
		);
	}
	Search_Company() {
		this.Receipt_Voucher_Service_.Search_Company().subscribe(
			(Rows) => {
				this.Company_Data = Rows[0];
				//  this.Company_Info = Rows[0];
				// this.Company_Temp.Company_Id = 0;
				// this.Company_Temp.Company_Name = "Select";
				// this.Company_Data.unshift(this.Company_Temp);
				this.Print_Company_ = this.Company_Data[0];
			},
			(Rows) => {
				//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
			}
		);
	}

	Get_Voucher_Type() {
		debugger
		this.Receipt_Voucher_Service_.Search_Voucher_Type_By_Status('3,4,5').subscribe(
			(Rows) => {
				debugger
				this.Voucher_Data = Rows[0];
				// this.Voucher_Temp.Voucher_Type_Id = 0;
				// this.Voucher_Temp.Voucher_Type_Name = "Select";
				// this.Voucher_Data.unshift(this.Voucher_Temp);
				// this.Bill_Type = this.Voucher_Data[0];
				
				
			},
			(Rows) => {
				//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
			}
		);
	}

	Print_Click() {
		// this.Get_Client_Accounts();

		// this.Image_Url = "/assets/img/" + this.Print_Company_.Company_Id + ".jpg";
		// this.Company_Sign =
		// 	"/assets/img/Sign_" + this.Print_Company_.Company_Id + ".jpg";
		// this.Company_Seal =
		// 	"/assets/img/Seal_" + this.Print_Company_.Company_Id + ".jpg";
		this.Payment_Voucher_.Date = this.New_Date(new Date(moment(this.Payment_Voucher_.Entry_Date).format("YYYY-MM-DD")));
		this.Address1 = this.ToAccount_.Address1;
		this.Address2 = this.ToAccount_.Address2;
		this.Address3 = this.ToAccount_.Address3;
		this.Address4 = this.ToAccount_.Address4;
		// for (let i = 0; i < this.currencyData.length; i++) {
		// 	if(this.Payment_Voucher_.CurrencyId = this.currencyData[i].CurrencyDetails_Id){
		// 		this.currency.CurrecnyName = this.currencyData[i].CurrecnyName;
		// 		this.currencyName = this.currencyData[i].CurrecnyName
		// 	}			
		//    }
		   setTimeout(()=>{
			let popupWinindow;
			let innerContents = document.getElementById("Print_Div1").innerHTML;
			popupWinindow = window.open(
				"",
				"_blank",
				"width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
			);
			popupWinindow.document.open();
			popupWinindow.document.write(
				'<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' +
					innerContents +
					"</html>"
			);
			popupWinindow.document.close();
		   })
		
		// }
		//}
	}
	Create_New() {
		//this.Payment_Voucher_Print = false;
		this.Clr_Payment_Voucher();
		this.Clr_Purchase_Payment();
		this.Payment_Voucher_.Payment_Status = 0;
		this.Payment_Voucher_Save=true;
		this.Entry_View = true;
	}
	Close_Click() {
		this.Clr_Purchase_Payment();
		//this.Search_Payment_Voucher();
		this.Clr_Payment_Voucher();
		this.Entry_View = false;
		this.Payment_Voucher_Save=false;
		this.Payment_Voucher_Print=false;
	}
	trackByFn(index, item) {
		return index;
	}
	Address_Change(FromAccount1) {
		// this.Get_Client_Accounts_Change(Client_Accounts_Id);
		//this.Payment_Voucher_.Address1 = FromAccount1.Address1;
		this.Payment_Voucher_.Customer_Name=FromAccount1.Client_Accounts_Name;
		this.Payment_Voucher_.Address1=FromAccount1.Address1;
		this.Payment_Voucher_.Address2=FromAccount1.Address2;
		this.Payment_Voucher_.Address3=FromAccount1.Address3;
		this.Payment_Voucher_.Address4=FromAccount1.Address4;
		this.Payment_Voucher_.PinCode=FromAccount1.PinCode;
		this.Payment_Voucher_.GSTNo=FromAccount1.GSTNo;
		this.Payment_Voucher_.Mobile=FromAccount1.Mobile;

debugger;
		this.Payment_Voucher_Service_.SelectSettledBills(
			FromAccount1.Client_Accounts_Id
		).subscribe(
			(Rows) => {
				debugger;
				if (Rows != null) {
					this.Payment_Reference_Data = Rows[0];
				}
				this.issLoading = false;
			},
			(Rows) => {
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Error Occured", Type: "2" },
				});
			}
		);
	}

	// Address_Change(FromAccount1)
	// { 		
	// 		this.Payment_Voucher_.Address1 =FromAccount1.Address1;    
	// 	this.Payment_Voucher_Service_.SelectSettledBills(FromAccount1.Client_Accounts_Id).subscribe(Rows => {
	// 		if (Rows != null) {
	// 		this.Purchase_Payment_Data = Rows[0];
	// 		}
	// 		this.issLoading = false;
	// 	},
	// 		Rows => {
	// 			 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
	// 		});
	// }

	Clr_Payment_Voucher() {
		this.Payment_Voucher_.Payment_Voucher_Id = 0;
		this.Payment_Voucher_.Date = new Date();
		this.Payment_Voucher_.Date = this.New_Date(this.Payment_Voucher_.Date);

		this.Payment_Voucher_.Entry_Date = new Date();
		this.Payment_Voucher_.Entry_Date = this.New_Date(this.Payment_Voucher_.Entry_Date)
		this.Payment_Voucher_.Voucher_No = null;
		this.Payment_Voucher_.From_Account_Id = 0;
		this.Payment_Voucher_.Amount = null;
		this.Payment_Voucher_.To_Account_Id = 0;
		this.Payment_Voucher_.Mode = '';
		this.Payment_Voucher_.User_Id = 0;
		this.FromAccount_ = null;
		this.ToAccount_ = null;
		this.Payment_Voucher_.Address1 = "";
		if (this.currencyData != null && this.currencyData != undefined)
			this.currency = this.currencyData[0];
		this.Payment_Voucher_.Payment_Status = 0;
		this.Payment_Voucher_.Description = "";
		this.Payment_Voucher_Print = false;
		this.Bill_Type=null;
		this.InvoiceNo_=null;
		this.invoiceDate = null;
		this.invoiceAmount = null;
		this.Payment_Reference_Data = [];
		this.Payment_Reference_Data_temp = [];
			this.Payment_Ref_Print_Data=[];
	}
	Clr_Purchase_Payment() {
		this.Purchase_Payment_.Purchase_Payment_Id = 0;
		this.Purchase_Payment_.Purchase_Payment_Id = 0;
		this.Purchase_Payment_.Payment_Voucher_Id = 0;
		this.Purchase_Payment_.Date = new Date();
		this.Purchase_Payment_.Date = this.New_Date(this.Purchase_Payment_.Date);
		this.Purchase_Payment_.Account_Party_Id = 0;
		this.Purchase_Payment_.Paying_Amount = 0;
		this.Purchase_Payment_.Discount = 0;
		this.Purchase_Payment_.NetTotal = 0;
		this.Purchase_Payment_.BalAmt = 0;
		this.Purchase_Payment_Data = [];
		this.Payment_Reference_Data_temp=[];
		this.Payment_Reference_Data = [];
		this.Payment_Ref_Print_Data=[];
	}
	Search_Payment_Voucher() {
		var look_In_Date_Value = 0,
			ClientAccount = 0,
			Voucher_No_search_ = 0,
			ClientAccounts_Id = 0,CurrencyId = 0;
		this.Total_Amounts = 0;
		if (this.Look_In_Date == true) look_In_Date_Value = 1;

		if (this.ToAccount_Search != undefined && this.ToAccount_Search != null)
			if (
				this.ToAccount_Search.Client_Accounts_Id != undefined &&
				this.ToAccount_Search.Client_Accounts_Id != null
			)
				ClientAccounts_Id = this.ToAccount_Search.Client_Accounts_Id;


		
		if (
			this.Voucher_No_search == undefined ||
			this.Voucher_No_search == null ||
			this.Voucher_No_search == 0
		)
		Voucher_No_search_=0;
		else
			Voucher_No_search_ = this.Voucher_No_search;

			debugger
			if (
				this.CurrencySearch == undefined ||
				this.CurrencySearch == null ||
				this.CurrencySearch.CurrencyDetails_Id == 0
			)
			CurrencyId=0;
			else
			CurrencyId = this.CurrencySearch.CurrencyDetails_Id;

		this.issLoading = true;
		debugger
		this.Payment_Voucher_Service_.Search_Payment_Voucher(
			moment(this.Search_FromDate).format("YYYY-MM-DD"),
			moment(this.Search_ToDate).format("YYYY-MM-DD"),
			ClientAccounts_Id,
			Voucher_No_search_,
			look_In_Date_Value,
			CurrencyId,
			this.Login_User,
			this.User_Type_Id
		).subscribe(
			(Rows) => {
				debugger
				this.Payment_Voucher_Data = Rows[0];

				this.Total_Entries = this.Payment_Voucher_Data.length;

				for (var i = 0; i < this.Payment_Voucher_Data.length; i++) {
					this.Total_Amounts =
						Number(this.Total_Amounts) +
						Number(this.Payment_Voucher_Data[i].Amount);
				}
				this.Total_Amounts =Number(this.Total_Amounts.toFixed(3));

				if (this.Payment_Voucher_Data.length == 0) {
					const dialogRef = this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "No Details Found", Type: "3" },
					});
				}
				this.issLoading = false;
			},
			(Rows) => {
				this.issLoading = false;
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Error Occured", Type: "2" },
				});
			}
		);
	}
	display_FromAccount(Client_Accounts_e: Client_Accounts) {
		if (Client_Accounts_e) {
			return Client_Accounts_e.Client_Accounts_Name;
		}
	}
	Delete_Payment_Voucher(Payment_Voucher_Id, index) {
		const dialogRef = this.dialogBox.open(DialogBox_Component, {
			panelClass: "Dialogbox-Class",
			data: {
				Message: "Do you want to delete ?",
				Type: "true",
				Heading: "Confirm",
			},
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result == "Yes") {
				this.issLoading = true;
				debugger
				this.Payment_Voucher_Service_.Delete_Payment_Voucher(
					Payment_Voucher_Id
				).subscribe(
					(Delete_status) => {
						debugger
						if (Delete_status[0][0].Payment_Voucher_Id_ > 0) {
							this.Total_Entries = this.Total_Entries - 1;
							this.Total_Amounts =
								Number(this.Total_Amounts) -
								Number(this.Payment_Voucher_Data[index].Amount);
							this.Payment_Voucher_Data.splice(index, 1);
							const dialogRef = this.dialogBox.open(DialogBox_Component, {
								panelClass: "Dialogbox-Class",
								data: { Message: "Deleted", Type: "false" },
							});
						} else {
							//this.Payment_Voucher_Data.splice(index, 1);
							const dialogRef = this.dialogBox.open(DialogBox_Component, {
								panelClass: "Dialogbox-Class",
								data: { Message: "Deleted", Type: "false" },
							});
						}
						this.issLoading = false;
					},
					(Rows) => {
						this.issLoading = false;
						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Error Occured", Type: "2" },
						});
					}
				);
			}
		});
	}

	Calculate_Sum_check(index) {
		let bal = 0,		
		  invamt = 0,
		  paid = 0,
		  pay=0,
		  sum = 0;
		  debugger;
		  if (Boolean(this.Payment_Reference_Data[index].Check_Box) == true) {
							invamt = Number(this.Payment_Reference_Data[index].Amount);
				(this.Payment_Reference_Data[index].Paying_Amount)=Number(invamt.toFixed(3));	
				(this.Payment_Reference_Data[index].BalAmt)=Number(paid.toFixed(3));						
			}
			else
			{
				(this.Payment_Reference_Data[index].Paying_Amount)=Number(paid.toFixed(3));	
				pay=Number (this.Payment_Reference_Data[index].Paying_Amount);
				invamt = Number(this.Payment_Reference_Data[index].Amount);
				bal=invamt-pay;
				(this.Payment_Reference_Data[index].BalAmt)=Number(bal.toFixed(3));	
			}

			for (let j = 0; j < this.Payment_Reference_Data.length; j++) {
				sum += Number(this.Payment_Reference_Data[j].Paying_Amount);
			  }
		debugger;
		this.Payment_Voucher_.Amount =  Number(sum.toFixed(3));
		}
	
	
	Calculate_Sum(index) {
	let bal = 0,
      pay = 0,
      disc = 0,
      invamt = 0,
      paid = 0;
	  debugger;
    invamt = Number(this.Payment_Reference_Data[index].Amount);
    pay = Number(this.Payment_Reference_Data[index].Paying_Amount);
    //disc = Number(this.Payment_Reference_Data[index].Discount);
    paid = pay + disc;
    bal = invamt - paid;
    this.Payment_Reference_Data[index].BalAmt = Number(bal.toFixed(3));
    let sum = 0;
    for (let j = 0; j < this.Payment_Reference_Data.length; j++) {
      sum += Number(this.Payment_Reference_Data[j].Paying_Amount);
    }
	debugger;
    this.Payment_Voucher_.Amount =  Number(sum.toFixed(3));
	}

	Save_Payment_Voucher() {
		debugger
		if (
			this.FromAccount_ == undefined ||
			this.FromAccount_.Client_Accounts_Id == 0 ||
			this.FromAccount_ == null ||
			this.FromAccount_.Client_Accounts_Id == undefined
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select The From account", Type: "3" },
			});
			return;
		} else if (
			this.Payment_Voucher_.Amount == undefined ||
			this.Payment_Voucher_.Amount == null ||
			this.Payment_Voucher_.Amount == undefined ||
			this.Payment_Voucher_.Amount == 0
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter the Amount", Type: "3" },
			});
			return;
		} else if (
			this.ToAccount_ == undefined ||
			this.ToAccount_ == null ||
			this.ToAccount_.Client_Accounts_Id == undefined ||
			this.ToAccount_.Client_Accounts_Id == 0
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Supplier", Type: "3" },
			});
			return;
		}
		// else if (
		// 	this.Payment_Mode_ == null ||
		// 	this.Payment_Mode_ == undefined ||
		// 	this.Payment_Mode_.Payment_Mode_Id == undefined ||
		// 	this.Payment_Mode_.Payment_Mode_Id == 0
		// ) {
		// 	const dialogRef = this.dialogBox.open(DialogBox_Component, {
		// 		panelClass: "Dialogbox-Class",
		// 		data: { Message: "Select The Payment Mode", Type: "3" },
		// 	});
		// 	return;
		// }
		debugger
		/*var Purchase_Payment_Check = false;
		this.Purchase_Payment_Data_temp = [];
		for (var j = 0; j < this.Purchase_Payment_Data.length; j++) {
			if (this.Purchase_Payment_Data[j].Check_Box == true)
				Purchase_Payment_Check = true;
		}
		if (Purchase_Payment_Check == false) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Atleast one Account", Type: "3" },
			});
			return;
		}*/
/*
		for (var j = 0; j < this.Purchase_Payment_Data.length; j++) {
			if (this.Purchase_Payment_Data[j].Check_Box == true)
				if (
					this.Purchase_Payment_Data[j].Paying_Amount == 0 ||
					this.Purchase_Payment_Data[j].Discount == 0 ||
					this.Purchase_Payment_Data[j].Paying_Amount == undefined ||
					this.Purchase_Payment_Data[j].Discount == undefined
				) {
					const dialogRef = this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "Enter Paying Amount & Discount", Type: "3" },
					});
					return;
				}
		}*/
		// debugger;
		// for (var j = 0; j < this.Payment_Reference_Data.length; j++) {
        //     if (this.Payment_Reference_Data[j].Check_Box == true)
        //         Purchase_Payment_Check = true
        // }
		for (var j = 0; j < this.Payment_Reference_Data.length; j++) {
			if (this.Payment_Reference_Data[j].Check_Box == true)
				if (this.Payment_Reference_Data[j].Paying_Amount == 0 || this.Payment_Reference_Data[j].Paying_Amount == undefined ) {
					const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Paying Amount & Discount', Type: "3" } });
						return
					}
			}

		if (
			this.Payment_Reference_Data_temp == undefined ||
			this.Payment_Reference_Data_temp == null
		)
			this.Payment_Reference_Data_temp = [];
			this.Payment_Ref_Print_Data=[];
		for (var m = 0; m < this.Payment_Reference_Data.length; m++) {
			if (Boolean(this.Payment_Reference_Data[m].Check_Box) == true) {
				this.Payment_Reference_Data_temp.push(Object.assign({}, this.Payment_Reference_Data[m]));
				this.Payment_Ref_Print_Data.push(Object.assign({}, this.Payment_Reference_Data[m]));
			}
		}

		// debugger
		this.Payment_Voucher_.Payment_Reference = this.Payment_Reference_Data_temp;
// if(this.Payment_Voucher_.Purchase_Payment.length=0){this.Payment_Voucher_.Purchase_Payment_Value =0}
// else{this.Payment_Voucher_.Purchase_Payment_Value =1}
debugger

		this.Payment_Voucher_.User_Id = Number(this.Login_User);
		this.Payment_Voucher_.From_Account_Id = this.FromAccount_.Client_Accounts_Id;
		this.Payment_Voucher_.To_Account_Id = this.ToAccount_.Client_Accounts_Id;
		this.Payment_Voucher_.Payment_Mode_Name = this.Payment_Voucher_.Mode;
		this.Payment_Voucher_.Date = this.New_Date(new Date(moment(this.Payment_Voucher_.Entry_Date).format("YYYY-MM-DD")));
		this.Payment_Voucher_.CurrencyId = this.currency.CurrencyDetails_Id;

		console.log("Before Payment Voucher Save API call");
		this.issLoading = true;

		this.Payment_Voucher_Service_.Save_Payment_Voucher(this.Payment_Voucher_)
		.pipe(
			finalize(() => {
				console.log("Payment Voucher Save Finalize executed");
				this.issLoading = false;
				const saveButton = document.getElementById("Save_Button");
				if (saveButton) saveButton.hidden = false;
			})
		)
		.subscribe({
			next: (Save_status) => {
				console.log("Payment Voucher Save API Response:", Save_status);

				if (!Save_status || !Save_status[0]) {
					this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "Invalid server response", Type: "2" },
					});
					return;
				}

				if (Number(Save_status[0].Payment_Voucher_Id_) > 0) {
					this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "Saved Successfully", Type: "false" },
					});
					this.Clr_Payment_Voucher();
					this.Clr_Purchase_Payment();
				} else {
					this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "Error Occured", Type: "2" },
					});
				}
			},
			error: (error) => {
				console.error("Payment Voucher Save API ERROR:", error);
				this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" },
				});
			}
		});
	}

	Edit_Payment_Voucher(Payment_Voucher_e: Payment_Voucher, index) {
		this.Entry_View = true;
		this.Payment_Voucher_ = Payment_Voucher_e;
		this.Payment_Voucher_.Entry_Date = Payment_Voucher_e.Date

		this.Print_Date_ = new Date(this.Payment_Voucher_.Date);
		this.Print_Date_ = this.Print_Date(this.Print_Date_);

		this.Payment_Voucher_Print = true;
		this.Payment_Voucher_Save=true;

		this.Payment_Voucher_ = Object.assign({}, this.Payment_Voucher_);

		this.FromAccount_Temp.Client_Accounts_Id =
			this.Payment_Voucher_.From_Account_Id;
		this.FromAccount_Temp.Client_Accounts_Name =
			this.Payment_Voucher_.FromAccount_Name;
		this.FromAccount_ = this.FromAccount_Temp;
debugger;
		this.ToAccount_Temp.Client_Accounts_Id = Payment_Voucher_e.To_Party_Id;
		this.ToAccount_Temp.Client_Accounts_Name = Payment_Voucher_e.ToAccount_Name;
		this.ToAccount_ = this.ToAccount_Temp;
		this.Payment_Voucher_.Customer_Name=Payment_Voucher_e.ToAccount_Name;
		this.Payment_Voucher_.Address1=Payment_Voucher_e.Address1;
		this.Payment_Voucher_.Address2=Payment_Voucher_e.Address2;
		this.Payment_Voucher_.Address3=Payment_Voucher_e.Address3;
		this.Payment_Voucher_.Address4=Payment_Voucher_e.Address4;
		this.Payment_Voucher_.GSTNo=Payment_Voucher_e.GSTNo;
		debugger;
		debugger;
		for (var i = 0; i < this.currencyData.length; i++) {
			if (
				this.Payment_Voucher_.CurrencyId ==
				this.currencyData[i].CurrencyDetails_Id
			)
				this.currency = this.currencyData[i];
				this.currencyName=this.currency.CurrecnyName;
		}

		// this.issLoading = true;
		// this.Client_Accounts_Service_.Get_Client_Accounts(
		// 	this.Payment_Voucher_.From_Account_Id
		// ).subscribe(
		// 	(Rows) => {
		// 		if (Rows != null) {
		// 			this.Client_Accounts_Data_ = Rows[0];
		// 			this.Print_Client_ = this.Client_Accounts_Data_[0];
		// 		}
		// 		this.issLoading = false;
		// 	},
		// 	(Rows) => {
		// 		this.issLoading = false;
		// 		const dialogRef = this.dialogBox.open(DialogBox_Component, {
		// 			panelClass: "Dialogbox-Class",
		// 			data: { Message: "Error Occured", Type: "2" },
		// 		});
		// 	}
		// );
		this.issLoading = true;
		debugger
		this.Payment_Reference_Service_.Get_Payment_Reference(
			this.Payment_Voucher_.Payment_Voucher_Id
		).subscribe(
			(Rows) => {
				debugger
				if (Rows != null) {
					this.Payment_Reference_Data = Rows[0];
					this.Payment_Ref_Print_Data = [];
				for (var m = 0; m < Rows[0].length; m++) {
					if (Boolean(Rows[0][m].Check_Box) == true) {	
				this.Payment_Ref_Print_Data.push(Object.assign({}, Rows[0][m]));
					}
				}
				}				
				debugger
				this.issLoading = false;
			},
			(Rows) => {
				this.issLoading = false;
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Error Occured", Type: "2" },
				});
			}
		);
		debugger;

		debugger;
	}

	Search_Customer_Typeahead(event: any)
{
  var Value = "";
  if (event.target.value == "")
      Value = undefined;
  else
      Value = event.target.value;
    {
   this.issLoading = true;
  this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',Value).subscribe(Rows => {     
  if (Rows != null) {
      this.Customer_Data = Rows[0];
  }
  this.issLoading = false;
  },
  Rows => {
   
  this.issLoading = false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  }
}

Search_Bank_Typeahead(event: any)
{
  var Value = "";
  if (event.target.value == "")
      Value = undefined;
  else
      Value = event.target.value;
    {
   this.issLoading = true;
  this.Client_Accounts_Service_.Search_Bank(Value,0).subscribe(Rows => {     
  if (Rows != null) {
      this.Bank_Data = Rows[0];
  }
  this.issLoading = false;
  },
  Rows => {
   
  this.issLoading = false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  }
}

display_Customer(Client_Accounts_e: Client_Accounts)
{
  if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
}

Load_Currency() {
	this.currencydetails_Service_.Search_currencydetails('').subscribe(Rows => {
		if (Rows != null) {	

			  this.currencyData = Rows[0];
			  this.currencyTemp.CurrencyDetails_Id = 0;
			  this.currencyTemp.CurrecnyName = "Select";
			  this.currencyData.unshift(this.currencyTemp);
			  this.currency = this.currencyData[0];
			  this.CurrencySearch=this.currencyData[0];
		 
		}
		this.issLoading = false;
	},
		Rows => {
			this.issLoading = false;
			const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
		});
}

Search_Invoice_By_VoucherType_Typeahead(event: any)
{
 console.log('this.ToAccount_: ', this.ToAccount_);
  if(!this.ToAccount_.Client_Accounts_Id){
	
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Choose supplier',Type:"2"}});
    return
  }
  if(!this.Bill_Type){
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Choose Type',Type:"2"}});
    return
  }
  var Value = "";
  if (event.target.value == "")
      Value = undefined;
  else
      Value = event.target.value;
    {
   this.issLoading = true;
   debugger
  this.Payment_Voucher_Service_.Search_Invoice_By_VoucherType_Typeahead(this.ToAccount_.Client_Accounts_Id,Value,this.Bill_Type.Voucher_Type_Id).subscribe(Rows => {     
	debugger
	if (Rows != null) {
      this.Invoice_Data = Rows[0];
  }
  this.issLoading = false;
  },
  Rows => {
   
  this.issLoading = false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  }
}

display_Invoice(item)
{
  if (item) { return item.Invoice; }
}

selectInvoice(Invoice){
	this.invoiceDate = Invoice.Date;
	this.invoiceAmount = Invoice.Amount;
}

plus(){
	this.Payment_Reference.Amount = this.invoiceAmount;
	this.Payment_Reference.PurchaseDate = this.invoiceDate;
	this.Payment_Reference.InvoiceNo = this.InvoiceNo_.Invoice;
	this.Payment_Reference.Voucher_Type_Name = this.Bill_Type.Voucher_Type_Name;
	this.Payment_Reference.Voucher_Type_Id = this.Bill_Type.Voucher_Type_Id;
	this.Payment_Reference_Data.push(Object.assign({}, this.Payment_Reference));
	this.calculate_amount()
	this.Clr_Receipt_Reference();
}

Delete_Item(index){
	this.Payment_Reference_Data.splice(index,1)
	this.calculate_amount()
}

calculate_amount(){
	this.Payment_Voucher_.Amount = 0
	for(let i=0;i<this.Payment_Reference_Data.length;i++){
		this.Payment_Voucher_.Amount = Number((this.Payment_Voucher_.Amount + Number(this.Payment_Reference_Data[i].Amount)).toFixed(2))
	}
}

selectCustomer(){
	
    this.Address1 = this.ToAccount_.Address1;
    this.Address2 = this.ToAccount_.Address2;
    this.Address3 = this.ToAccount_.Address3;
    this.Address4 = this.ToAccount_.Address4;
}

/** Added on 29-10-2024 */

Clr_Receipt_Reference()
{
		this.invoiceAmount = null;
		this.Bill_Type = null;
		this.InvoiceNo_ = null;
		this.invoiceDate = null;
}
}
