import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Payment_Voucher_Service } from "../../../services/Payment_Voucher.Service";
import { Journal_Entry_Service } from "../../../services/Journal_Entry.Service";
import { Receipt_Voucher_Service } from "../../../services/Receipt_Voucher.Service";
import { Client_Accounts_Service } from "../../../services/Client_Accounts.Service";
import { DialogBox_Component } from "../DialogBox/DialogBox.component";
import { Payment_Voucher } from "../../../models/Payment_Voucher";
import { Purchase_Payment } from "../../../models/Purchase_Payment";
import { Client_Accounts } from "../../../models/Client_Accounts";
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
import { Petty_Cash } from "../../../models/Petty_Cash";
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

import { MatAutocompleteSelectedEvent, MatDialog } from "@angular/material";
import {
	ROUTES,
	Get_Page_Permission,
} from "../../../components/sidebar/sidebar.component";
import { Cash_Type } from "../../../models/Cash_Type";
import { Petty_Cash_Service } from "../../../services/Petty_Cash.Service";
import { Sales_Master_Service } from "../../../services/Sales_Master.Service";
import { Item } from "../../../models/Item";
import { Item_Group } from "../../../models/Item_Group";
import { Waste_Management_Service } from "../../../services/Waste_Management.Service";
import { Waste_Management } from "../../../models/Waste_Management";
import { Daybook} from "../../../models/Daybook";

import { environment } from "environments/environment";
import { Purchase_Master_Service } from "app/services/Purchase_Master.Service";

@Component({
	selector: "app-Daybook",
	templateUrl: "./Daybook.component.html",
	styleUrls: ["./Daybook.component.css"],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class DaybookComponent implements OnInit {
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

	Image_Url: string;
	Company_Sign: string;
	Company_Seal: string;

	ToAccount_: Client_Accounts = new Client_Accounts();
	Search_FromDate: Date = new Date();
	Search_ToDate: Date = new Date();
	FromAccount_Search: Client_Accounts = new Client_Accounts();
	ToAccount_Search: Client_Accounts = new Client_Accounts();
	Voucher_No_search: number;
	FromAccount_Temp: Client_Accounts = new Client_Accounts();
	ToAccount_Temp: Client_Accounts = new Client_Accounts();

	Print_Date_: Date;
	Entry_View: boolean = true;
	myInnerHeight: number;
	EditIndex: number;
	Total_Entries: number = 0;
	color = "primary";
	mode = "indeterminate";
	value = 50;
	Total_Amounts: number = 0;
	Look_In_Date: Boolean = true;
	month: any;
	day: any;
	date: any;
	year: any;
	Login_User: string = "0";
	issLoading: boolean;
	Permissions: any;
	Permissions1: any;
	Waste_Management_Edit: boolean;
	Waste_Management_Save: boolean;
	Waste_Management_Delete: boolean;
	Waste_Management_Status: boolean;
	Petty_Cash_Print: boolean;

	Purchase_Payment_: Purchase_Payment = new Purchase_Payment();
	Purchase_Payment_Data: Purchase_Payment[];
	Purchase_Payment_Data_temp: Purchase_Payment[];
	Petty_Cash_: Petty_Cash = new Petty_Cash();
	Petty_Cash__Data: Petty_Cash[];

	Cash_Type_Data: Cash_Type[];
	Cash_Type_: Cash_Type = new Cash_Type();
	Cash_Type_Search: Cash_Type = new Cash_Type();
	Cash_Type_Temp: Cash_Type = new Cash_Type();

	File: string;
	Doc_Photo: any;
	ImageFile_Doc: any;
	Document_File_Array: any[];

	Payment_Mode_Search: PaymentMode = new PaymentMode();

	Item_: Item = new Item();
	Item_Data: Item[];
	Item_Temp: Item = new Item();
	Item_Search: Item_Group = new Item_Group();

	Waste_Management_: Daybook = new Daybook();
	Waste_Management_Data: Daybook[];

	/*** Added on 08-05-2024 ***/
	If_file_changed:boolean=false
	Save_Call_Status: boolean = false;

	/*** Added on 10-05-2024 ***/
	Item_Data1:Item[]
	Item1_:Item= new Item();
	Item_Data_Filter1: Item[];

	/*** Added on 18-07-2024 */
	Item_Group_Temp:Item_Group = new Item_Group();
	Item_Group1_:Item_Group= new Item_Group();
	Item_Group_Data_Filter1: Item_Group[];

	Master_Category_Temp:Item_Group = new Item_Group();
	Master_Category1_:Item_Group= new Item_Group();
	Master_Category_Data_Filter1: Item_Group[];
	Master_Category_Data: Item_Group[];

	/** */

	/*** Added on 19-07-2024 */

	From_Petty_Cash_To_Daybook_Check_Value: number = 0;
	Master_Category_Name_From_Petty_Cash: string;
	Client_Accounts_Id_From_Petty_Cash: number;
	Client_Accounts_Name_From_Petty_Cash: string;

	Master_Category_Temp1:Item_Group = new Item_Group();

	ToAccount_Search_temp: Client_Accounts = new Client_Accounts();




	/*** */

	constructor(
		public Payment_Voucher_Service_: Payment_Voucher_Service,
		public Client_Accounts_Service_: Client_Accounts_Service,
		public Receipt_Voucher_Service_: Receipt_Voucher_Service,
		public Journal_Entry_Service_: Journal_Entry_Service,
		public Petty_Cash_Service_: Petty_Cash_Service,
		public Sales_Master_Service_: Sales_Master_Service,
		public Waste_Management_Service_: Waste_Management_Service,
		public Purchase_Master_Service_:Purchase_Master_Service,
		private route: ActivatedRoute,
		private router: Router,
		public dialogBox: MatDialog
	) {}
	ngOnInit() {
		this.Login_User = localStorage.getItem("Login_User");

		debugger;
		this.From_Petty_Cash_To_Daybook_Check_Value = Number(localStorage.getItem("From_Petty_Cash_To_Daybook_Check_Value"));
		localStorage.setItem("From_Petty_Cash_To_Daybook_Check_Value","0");

		this.Master_Category_Name_From_Petty_Cash = localStorage.getItem("Master_Category_Name_From_Petty_Cash");
		localStorage.setItem("Master_Category_Name_From_Petty_Cash","");

		this.Client_Accounts_Id_From_Petty_Cash = Number(localStorage.getItem("Client_Accounts_Id_From_Petty_Cash"));
		localStorage.setItem("Client_Accounts_Id_From_Petty_Cash","0");

		this.Client_Accounts_Name_From_Petty_Cash = localStorage.getItem("Client_Accounts_Name_From_Petty_Cash");
		localStorage.setItem("Client_Accounts_Name_From_Petty_Cash","");



		this.Waste_Management_Data = [];
		this.Permissions = Get_Page_Permission(83);
		this.Permissions1 = Get_Page_Permission(83);
		if (this.Permissions == undefined || this.Permissions == null) {
			localStorage.removeItem("token");
			this.router.navigateByUrl("/auth/login");
		} else {
			this.Waste_Management_Edit = this.Permissions.Edit;
			this.Waste_Management_Save = this.Permissions.Save;
			this.Waste_Management_Delete = this.Permissions.Delete;
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
		this.myInnerHeight = this.myInnerHeight - 290;

		//this.Accounts_Typeahead();
		this.Search_FromDate = this.New_Date(this.Search_FromDate);
		this.Search_ToDate = this.New_Date(this.Search_ToDate);
		// this.Clr_Waste_Management();
		debugger;
		if(this.From_Petty_Cash_To_Daybook_Check_Value > 0)
		{
			this.Master_Category_Typeahead1(this.Master_Category_Name_From_Petty_Cash);
		}
		else
		{
		this.Search_Waste_Management();
		}
		this.Get_Payment_Mode();
		this.Entry_View = false;
		this.Petty_Cash_Print = false;
		// this.Search_Company();
	}

	From_Accounts_Typeahead(event: any) {
		this.issLoading = true;
		var Value = "";
		if (event.target.value == "") Value = undefined;
		else Value = event.target.value;

		this.Journal_Entry_Service_.Accounts_Typeahead("11,4,5", Value).subscribe(
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

	Accounts_Typeahead(event: any) {
		this.issLoading = true;
		var Value = "";
		if (event.target.value == "") Value = undefined;
		else Value = event.target.value;
debugger
		this.Receipt_Voucher_Service_.Client_Accounts_Branch_Typeahead1(
			Value
		).subscribe(
			(Rows) => {
				debugger
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

				this.Cash_Type_Data = Rows[1];
				this.Cash_Type_Temp.Cash_Type_Id = 0;
				this.Cash_Type_Temp.Cash_Type_Name = "Select";
				this.Cash_Type_Data.unshift(this.Cash_Type_Temp);
				this.Cash_Type_ = this.Cash_Type_Data[0];
				this.Cash_Type_Search = this.Cash_Type_Data[0];
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

	Print_Click() {
		this.Get_Client_Accounts();

		this.Image_Url = "/assets/img/" + this.Print_Company_.Company_Id + ".jpg";
		this.Company_Sign =
			"/assets/img/Sign_" + this.Print_Company_.Company_Id + ".jpg";
		this.Company_Seal =
			"/assets/img/Seal_" + this.Print_Company_.Company_Id + ".jpg";
		let popupWinindow;
		let innerContents = document.getElementById("Print_Div").innerHTML;
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
		// }
		//}
	}
	Create_New() {
		this.Petty_Cash_Print = false;
		this.Clr_Waste_Management();

		//if(this.Receipt_Voucher_Status==true)
		{
			this.Payment_Voucher_.Payment_Status = 0;
		}
		this.Entry_View = true;
	}
	Close_Click() {
		this.Clr_Waste_Management();
		this.Search_Waste_Management();
		// this.Clr_Payment_Voucher();
		this.Entry_View = false;
	}
	trackByFn(index, item) {
		return index;
	}

	// Address_Change(FromAccount1) {
	// 	// this.Get_Client_Accounts_Change(Client_Accounts_Id);
	// 	this.Payment_Voucher_.Address1 = FromAccount1.Address1;

	// 	this.Payment_Voucher_Service_.SelectSettledBills(
	// 		FromAccount1.Client_Accounts_Id
	// 	).subscribe(
	// 		(Rows) => {
	// 			if (Rows != null) {
	// 				this.Purchase_Payment_Data = Rows[0];
	// 			}
	// 			this.issLoading = false;
	// 		},
	// 		(Rows) => {
	// 			const dialogRef = this.dialogBox.open(DialogBox_Component, {
	// 				panelClass: "Dialogbox-Class",
	// 				data: { Message: "Error Occured", Type: "2" },
	// 			});
	// 		}
	// 	);
	// }
	Clr_Waste_Management() {
		this.Waste_Management_.Daybook_Id = 0;
		this.Waste_Management_.Entry_Date = new Date();
		this.Waste_Management_.Entry_Date = this.New_Date(this.Waste_Management_.Entry_Date);
		this.Waste_Management_.Client_Accounts_Name = "";
		this.Waste_Management_.Client_Accounts_Id = 0;
		this.Waste_Management_.Item_Id = 0;
		this.Waste_Management_.Item_Name = "";
		this.Waste_Management_.Remarks = "";
		this.Waste_Management_.Item_Group_Id = 0;
		this.Waste_Management_.Item_Group_Name = "";
		this.Waste_Management_.Master_Category_Id = 0;
		this.Waste_Management_.Master_Category_Name = "",
		this.Waste_Management_.Amount = 0;

		// this.Waste_Management_.User_Id = 0;
		// this.Waste_Management_.Particular = "";
		this.Waste_Management_.Quantity = 0;
		this.Waste_Management_.Item_Code = "";
		this.Waste_Management_.Reference_Number = 0;
		this.Waste_Management_.File_Name = "";
		this.Item1_ = null;
		this.ToAccount_ = null;
		this.Item_ = null;
		this.Doc_Photo = "";
		this.Item_Group_Data_Filter1 = [];
		this.Master_Category_Data_Filter1 = [];
		this.Master_Category1_ = null;
		this.Item_Group1_ = null;
		this.Waste_Management_.Entry_Date = null;
		
	/*** Added on 10-05-2024 ***/
		this.If_file_changed=false
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
	}
	Search_Waste_Management() {
		var look_In_Date_Value = 0,
			Item = 0,
			Voucher_No_search_ = 0,
			ClientAccounts_Id = 0;
		this.Total_Amounts = 0;
		if (this.Look_In_Date == true) look_In_Date_Value = 1;

		if (this.ToAccount_Search != undefined && this.ToAccount_Search != null)
			if (
				this.ToAccount_Search.Client_Accounts_Id != undefined &&
				this.ToAccount_Search.Client_Accounts_Id != null
			)
				ClientAccounts_Id = this.ToAccount_Search.Client_Accounts_Id;

		if (this.Item_Search != undefined && this.Item_Search != null)
			if (
				this.Item_Search.Master_Category_Id != undefined &&
				this.Item_Search.Master_Category_Id != null
			)
				Item = this.Item_Search.Master_Category_Id;

		this.issLoading = true;
		debugger; 
		this.Waste_Management_Service_.Search_Daybook(
			moment(this.Search_FromDate).format("YYYY-MM-DD"),
			moment(this.Search_ToDate).format("YYYY-MM-DD"),
			ClientAccounts_Id,
			Item,
			look_In_Date_Value
		).subscribe(
			(Rows) => {
				debugger;
				this.Waste_Management_Data = Rows[0];

				this.Total_Entries = this.Waste_Management_Data.length;

				if (this.Waste_Management_Data.length == 0) {
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
	Delete_Waste_Management(Waste_Management_Id_, index) {
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
				this.Waste_Management_Service_.Delete_Daybook(
					Waste_Management_Id_
				).subscribe(
					(Delete_status) => {
						if (Delete_status[0][0].Waste_Management_Id_ > 0) {
							this.Total_Entries = this.Total_Entries - 1;

							this.Waste_Management_Data.splice(index, 1);
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
						this.Search_Waste_Management();
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

	Get_Item_Name_With_Code_Waste_Management()
{
    debugger;
	var Item_Code='';
    if(this.Waste_Management_.Item_Code == '' || this.Waste_Management_.Item_Code == null || this.Waste_Management_.Item_Code == undefined || this.Waste_Management_.Item_Code == 'undefined')
    {
        Item_Code == ''
        this.Waste_Management_.Item_Name = ''
        this.issLoading = false;
        return;
     
    }
    else{
		Item_Code=this.Waste_Management_.Item_Code;

    }
        
this.Waste_Management_Service_.Get_Item_Name_Get_With_Code_Waste_Management(Item_Code).subscribe(Rows => {
    debugger;

    if (Rows != null) {
        this.Waste_Management_.Item_Name = Rows[0][0].Item_Name;
		this.Waste_Management_.Item_Id = Rows[0][0].Item_Id;
		// this.Waste_Management_.Item_Code = Rows[0][0].Item_Code;
}
    this.issLoading = false;
},
    Rows => {
  this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
   


}

	Save_Waste_Management() {
		if (
			this.ToAccount_ == undefined ||
			this.ToAccount_ == null ||
			this.ToAccount_.Client_Accounts_Id == undefined ||
			this.ToAccount_.Client_Accounts_Id == 0
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select The Branch", Type: "3" },
			});
			return;
		}
		debugger;

		if (
			this.Item1_ == null ||
			this.Item1_ == undefined ||
			this.Item1_.Item_Code == null ||
			this.Item1_.Item_Code == undefined ||
			this.Item1_.Item_Code == ''
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Item Code", Type: "3" },
			});
			return;
		}

		if (
			this.Item1_.Item_Name == null ||
			this.Item1_.Item_Name == undefined ||
			this.Item1_.Item_Name == '' 
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Item Name", Type: "3" },
			});
			return;
		}

		if (
			this.Item_Group1_ == null ||
			this.Item_Group1_ == undefined ||
			this.Item_Group1_.Item_Group_Id == null ||
			this.Item_Group1_.Item_Group_Id == undefined ||
			this.Item_Group1_.Item_Group_Id == 0
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Sub Category", Type: "3" },
			});
			return;
		}

		if (
			this.Master_Category1_ == null ||
			this.Master_Category1_ == undefined ||
			this.Master_Category1_.Master_Category_Id == null ||
			this.Master_Category1_.Master_Category_Id == undefined ||
			this.Master_Category1_.Master_Category_Id == 0
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Category", Type: "3" },
			});
			return;
		}

		if (
			this.Waste_Management_.Quantity == null ||
			this.Waste_Management_.Quantity == undefined ||
			this.Waste_Management_.Quantity == 0
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter Quantity", Type: "3" },
			});
			return;
		}

		// if (
		// 	this.Waste_Management_.Amount == null ||
		// 	this.Waste_Management_.Amount == undefined ||
		// 	this.Waste_Management_.Amount == 0
		// ) {
		// 	const dialogRef = this.dialogBox.open(DialogBox_Component, {
		// 		panelClass: "Dialogbox-Class",
		// 		data: { Message: "Enter Amount", Type: "3" },
		// 	});
		// 	return;
		// }


		debugger;

		// this.Waste_Management_.User_Id = Number(this.Login_User);
		this.Waste_Management_.Client_Accounts_Id = this.ToAccount_.Client_Accounts_Id;
		this.Waste_Management_.Client_Accounts_Name = this.ToAccount_.Client_Accounts_Name;
		this.Waste_Management_.Item_Code = this.Item1_.Item_Code;
		this.Waste_Management_.Item_Id = this.Item1_.Item_Id;
		this.Waste_Management_.Item_Name = this.Item1_.Item_Name;
		this.Waste_Management_.Item_Group_Id = this.Item_Group1_.Item_Group_Id
		this.Waste_Management_.Item_Group_Name = this.Item_Group1_.Item_Group_Name
		this.Waste_Management_.Master_Category_Id = this.Master_Category1_.Master_Category_Id
		this.Waste_Management_.Master_Category_Name = this.Master_Category1_.Master_Category_Name

		this.Waste_Management_.Doc_Photo = this.Doc_Photo;
		this.Waste_Management_.Entry_Date = this.New_Date(
			new Date(moment(this.Waste_Management_.Entry_Date).format("YYYY-MM-DD"))
		);
		document.getElementById("Save_Button").hidden = true;
		 
		this.issLoading = true;
		this.upload();
		// this.Waste_Management_Service_.Save_Waste_Management(
		// 	this.Waste_Management_
		// 	,this.Doc_Photo,
		// 	this.ImageFile_Doc,
		// 	this.Document_File_Array
		// ).subscribe(
		// 	(Save_status) => {
		// 		// Save_status=Save_status[0];
		// 		debugger;
		// 		if (Number(Save_status[0][0].Waste_Management_Id_) > 0) {
		// 			const dialogRef = this.dialogBox.open(DialogBox_Component, {
		// 				panelClass: "Dialogbox-Class",
		// 				data: { Message: "Saved", Type: "false" },
		// 			});
		// 			// this.Petty_Cash_Print = true;
		// 			// this.Payment_Voucher_.Voucher_No = Save_status[0].Voucher_No_;
		// 			this.Clr_Waste_Management();
		// 		} else {
		// 			const dialogRef = this.dialogBox.open(DialogBox_Component, {
		// 				panelClass: "Dialogbox-Class",
		// 				data: { Message: "Error Occured", Type: "2" },
		// 			});
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
	}
	
	File_Change_Vat(event: Event) {
		debugger;
		this.If_file_changed = true
		const file = (event.target as HTMLInputElement).files;
		this.ImageFile_Doc = file;
		this.Doc_Photo = this.ImageFile_Doc[0].name;
	}

	Download_Documents(Photo) {

		// debugger
		// var bs = environment.FilePath;
		// var s = bs + Photo;
		window.open(Photo, "_blank");
	  }

	upload() 
	{

		debugger;
		
		if(this.If_file_changed)
		{
			const file = this.ImageFile_Doc.item(0);

			if (file) 
			{
 
				console.log('file.size: ', file.size);
				console.log(' 5 * 1024 * 1024: ',  5 * 1024 * 1024);
				if (file.size > 5 * 1024 * 1024) 
				{ // Check if file size exceeds 5 MB
				  const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: 'dialogbox-class',
					data: {Message: 'File size exceeds 5 MB. Please select a smaller file.',Type: "3" }});
				  this.Save_Call_Status = false;	
				  this.issLoading = false;
				}
	
				else
				{
				
					this.Waste_Management_Service_.uploadFile(file).then(res=>{
					console.log('res: ', res);
					this.Waste_Management_.filepath=res['Location']
					console.log('this.Waste_Management_.filepath: ', this.Waste_Management_.filepath);
					debugger;
					this.Save()
				});
				}	
			
			}
			
			
			}else
			{
				this.Save()
			}
		}
	

	Save(){
		this.Waste_Management_Service_.Save_Daybook(
			this.Waste_Management_,
	
		).subscribe(
			(Save_status) => {
				debugger;
				//Save_status = Save_status[0];
				
	
				if (Number(Save_status[0][0].Daybook_Id_) > 0) {
					const dialogRef = this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "Saved", Type: "false" },
					});
					this.Save_Call_Status = false;
					// this.Edit_Waste_Management(this.Student_Id_Edit);
					this.Clr_Waste_Management();
				} else {
					const dialogRef = this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "Error Occured", Type: "2" },
					});
				}
				this.issLoading = false;
			},
			(Rows) => {
				
				this.issLoading = false;
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: Rows.error.error, Type: "2" },
				});
			}
		);
	}

	Edit_Waste_Management(wasteD_e: Daybook, index) {
		this.Entry_View = true;
		this.Waste_Management_ = wasteD_e;

		debugger;
		// this.Print_Date_ = new Date(this.Payment_Voucher_.Date);
		// this.Print_Date_ = this.Print_Date(this.Print_Date_);

		// this.Payment_Voucher_Print = true;

		this.Waste_Management_ = Object.assign({}, wasteD_e);

		this.ToAccount_Temp.Client_Accounts_Id = wasteD_e.Client_Accounts_Id;
		this.ToAccount_Temp.Client_Accounts_Name = wasteD_e.Client_Accounts_Name;
		this.ToAccount_ = this.ToAccount_Temp;


		this.Item_Temp.Item_Id = wasteD_e.Item_Id;
		this.Item_Temp.Item_Name = wasteD_e.Item_Name;
		this.Item_Temp.Item_Code = wasteD_e.Item_Code;
		this.Item1_ = this.Item_Temp;

		this.Item_Group_Temp.Item_Group_Id = wasteD_e.Item_Group_Id;
		this.Item_Group_Temp.Item_Group_Name = wasteD_e.Item_Group_Name;
		this.Item_Group1_ = this.Item_Group_Temp;

		this.Master_Category_Temp.Master_Category_Id = wasteD_e.Master_Category_Id;
		this.Master_Category_Temp.Master_Category_Name = wasteD_e.Master_Category_Name;
		this.Master_Category1_ = this.Master_Category_Temp;

		this.Doc_Photo =  wasteD_e.File_Name;
	}
	 
	Search_Item_Typeahead(event: any) {
		var Value = "";
		if (event.target.value == "") Value = undefined;
		else Value = event.target.value;
		{
			this.issLoading = true;
			this.Sales_Master_Service_.Item_Typeahead(Value).subscribe(
				(Rows) => {
					debugger;
					if (Rows != null) {
						this.Item_Data = Rows[0];
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
	}
	display_Item(Item_e: Item) {
		if (Item_e) {
			return Item_e.Item_Name;
		}
	}

/*** Added on 10-05-2024 ***/

Search_ItemCode_Typeahead(event: any, source: number) {
    // if (this.Followup_Branch_Data == undefined)
    // this.Followup_Branch_Data = [];
    // if (this.Followup_Branch_Data.length == 0) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value.toLowerCase();

    if (
      this.Item_Data1 == undefined ||
      this.Item_Data1.length == 0
    ) {
      this.issLoading = true;
      debugger;
      this.Purchase_Master_Service_.Search_ItemCode_Typeahead("").subscribe(
        (Rows) => {
          debugger;
          if (Rows != null) {
            debugger;
            this.Item_Data1 = Rows[0];
            this.Item_Data_Filter1 = [];


            if (source == 1) {
              for (var i = 0; i < this.Item_Data1.length; i++) {
                if (
                  this.Item_Data1[
                    i
                  ].Item_Code.toLowerCase().includes(Value)
                )
                  this.Item_Data_Filter1.push(
                    this.Item_Data1[i]
                  );
              }


            } else {
              this.Item_Data_Filter1 = Rows[0];
            }

            this.issLoading = false;
          }
        },
        (Rows) => {
          this.issLoading = false;
          // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        }
      );
    } else {
      if (source == 1) {
        this.Item_Data_Filter1 = [];
        for (var i = 0; i < this.Item_Data1.length; i++) {
          if (
            this.Item_Data1[
              i
            ].Item_Code.toLowerCase().includes(Value)
          )
            this.Item_Data_Filter1.push(this.Item_Data1[i]);
        }
      } else {
        this.Item_Data_Filter1 = [];
        for (var i = 0; i < this.Item_Data1.length; i++) {
          this.Item_Data_Filter1.push(this.Item_Data1[i]);
        }
      }
    }
    // }
  }

  display_ItemCode(Item1_: Item) 
{
    debugger
    if (Item1_) {
        return Item1_.Item_Code;
    }
}

onItemSelected(event: MatAutocompleteSelectedEvent) 
{
    debugger
    const selectedValue = event.option.value;
    this.Waste_Management_.Item_Name = selectedValue.Item_Name;
    this.Item1_ = selectedValue;
}


/*** Added on 18-07-2024 */

Master_Category_Typeahead(event: any) {
	this.issLoading = true;
	var Value = "";
	if (event.target.value == "") Value = undefined;
	else Value = event.target.value;
debugger
	this.Receipt_Voucher_Service_.Master_Category_Typeahead(
		Value
	).subscribe(
		(Rows) => {
			debugger
			if (Rows != null) {
				this.Master_Category_Data_Filter1 = Rows[0];
				//this.Print_Client_=this.Client_Accounts_Data[0];
			}

			this.issLoading = false;
		},
		(Rows) => {
			this.issLoading = false;
		}
	);
}

display_MasterCategory(Client_Accounts_e: Item_Group) {
	if (Client_Accounts_e) {
		return Client_Accounts_e.Master_Category_Name;
	}
}


Item_Group_Typeahead(event: any) {
	this.issLoading = true;
	var Value = "";
	if (event.target.value == "") Value = undefined;
	else Value = event.target.value;
debugger
	this.Receipt_Voucher_Service_.Item_Group_Typeahead(
		Value
	).subscribe(
		(Rows) => {
			debugger
			if (Rows != null) {
				this.Item_Group_Data_Filter1 = Rows[0];
				//this.Print_Client_=this.Client_Accounts_Data[0];
			}

			this.issLoading = false;
		},
		(Rows) => {
			this.issLoading = false;
		}
	);
}

display_ItemGroup(Client_Accounts_e: Item_Group) {
	if (Client_Accounts_e) {
		return Client_Accounts_e.Item_Group_Name;
	}
}

Master_Category_Typeahead1(event: any) {
	this.issLoading = true;
	debugger;
	if(this.From_Petty_Cash_To_Daybook_Check_Value === 1)
	{
		this.From_Petty_Cash_To_Daybook_Check_Value = 0;
		this.Receipt_Voucher_Service_.Master_Category_Typeahead(
			this.Master_Category_Name_From_Petty_Cash
		).subscribe(
			(Rows) => {
				debugger
				if (Rows != null) {
					// this.Master_Category_Data = Rows[0];
					this.Master_Category_Temp1.Master_Category_Id = Rows[0][0].Master_Category_Id;
					this.Master_Category_Temp1.Master_Category_Name = Rows[0][0].Master_Category_Name;
					this.Item_Search = this.Master_Category_Temp1;

					this.ToAccount_Search_temp.Client_Accounts_Id = this.Client_Accounts_Id_From_Petty_Cash;
					this.ToAccount_Search_temp.Client_Accounts_Name = this.Client_Accounts_Name_From_Petty_Cash;
					this.ToAccount_Search = this.ToAccount_Search_temp



					this.Search_Waste_Management();
					//this.Print_Client_=this.Client_Accounts_Data[0];
				}
	
				this.issLoading = false;
			},
			(Rows) => {
				this.issLoading = false;
			}
		);
	}
	else
	{
	var Value = "";
	if (event.target.value == "") Value = undefined;
	else Value = event.target.value;
debugger
	this.Receipt_Voucher_Service_.Master_Category_Typeahead(
		Value
	).subscribe(
		(Rows) => {
			debugger
			if (Rows != null) {
				this.Master_Category_Data = Rows[0];
				//this.Print_Client_=this.Client_Accounts_Data[0];
			}

			this.issLoading = false;
		},
		(Rows) => {
			this.issLoading = false;
		}
	);
 }
}

display_MasterCategory1(Client_Accounts_e: Item_Group) {
	if (Client_Accounts_e) {
		return Client_Accounts_e.Master_Category_Name;
	}
}


/*** */

}
