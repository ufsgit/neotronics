import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "../../../helpers/custom-validators";
import { UserData } from "../../../services/user-data";
import { Route, Router } from "@angular/router";
import { MatSpinner } from "@angular/material";
import {
	ROUTES,
	Get_Page_Permission,
	Set_Page_Permission,
} from "../../../components/sidebar/sidebar.component";
import { DialogBox_Component } from "../../../modules/admin/DialogBox/DialogBox.component";
import {
	MatDialog,
	MatDialogRef,
	MAT_DIALOG_DATA,
	MatDialogConfig,
} from "@angular/material";
import { Menu_Service } from "../../../services/Menu.Service";
export var Pointer_Table: number[] = [];

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	Login_Id: string;
	// menuItems: any[];
	color = "primary";
	mode = "indeterminate";
	value = 50;
	issLoading: boolean;
	Notification_count: number;
	Pointer_Table = new Array(210);/**38 */

	constructor(
		public fb: FormBuilder,
		public Menu_Service_: Menu_Service,
		public userService: UserData,
		public router: Router,
		public dialogBox: MatDialog,
		private ngZone: NgZone
	) {
		this.userService.logout();
		this.initForm();
	}
	initForm() {
		this.loginForm = this.fb.group({
			userName: ["", CustomValidators.compose([CustomValidators.required])],
			password: ["", CustomValidators.compose([Validators.required])],
		});
	}

	/** Called on every real keystroke/input event — keeps form in sync */
	onFieldInput() {
		// Angular handles this automatically; the binding itself triggers change detection
	}

	/**
	 * Called when the LOGIN button is clicked.
	 * Reads the raw DOM values in case the browser autofilled them
	 * without firing Angular's input events (the classic autofill bug).
	 */
	onLoginClick(event: Event, userNameInput: HTMLInputElement, passwordInput: HTMLInputElement) {
		// Patch form with actual DOM values to capture browser autofill
		const domUser = userNameInput.value;
		const domPass = passwordInput.value;

		if (domUser) {
			this.loginForm.get('userName').setValue(domUser);
		}
		if (domPass) {
			this.loginForm.get('password').setValue(domPass);
		}

		if (this.loginForm.invalid) {
			alert('Your login could not be processed because the input was not updated.\n\nPlease re-enter or modify your username or password and try again.');
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		// form is valid — let (ngSubmit) handle the rest via login()
	}

	async login() {
		if (this.loginForm.valid) {
			this.issLoading = true;

			const success = await this.userService.login(this.loginForm.value);
			if (success === true) {
				this.issLoading = false;
				// this.router.navigateByUrl('Dashboard');
				this.Login_Id = localStorage.getItem("Login_User");
				ROUTES.length = 0;
debugger
				Pointer_Table = new Array(210);/**38 */
				for(var i=0;i<Pointer_Table.length;i++)
					Pointer_Table[i]=-1;
				// Pointer_Table = new Array(38);
				// console.log(Pointer_Table,'ptable after array38');
				this.Menu_Service_.Get_Menu_Permission(this.Login_Id).subscribe(
					(Rows) => {
						debugger
						//   console.log(Rows)
						if (Rows != null) {
							var Menus;
							Menus = Rows[0];
							Rows = [];
							for (var i = 0; i < Menus.length; i++) {
								// if (Menus[i].Menu_Id == 1)
								// 	this.Push_Menu({
								// 		path: "/Sales_Master",
								// 		title: "Sales",
								// 		icon: "unarchive",
								// 		class: "",
								// 		Menu_Id: Menus[i].Menu_Id,
								// 		View: Menus[i].VIew_All,
								// 		Save: Menus[i].Menu_Save,
								// 		Edit: Menus[i].Menu_Edit,
								// 		Delete: Menus[i].Menu_Delete,
								// 		Menu_Type: Menus[i].Menu_Type,
								// 	});
								// else 
								if (Menus[i].Menu_Id == 2)
									this.Push_Menu({
										path: "/Sale_Unit",
										title: "Sale Unit",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 3)
									this.Push_Menu({
										path: "/HSN",
										title: "HSN",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 4)
									this.Push_Menu({
										path: "/Purchase_Return_Master",
										title: "Purchase Return",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 5)
									this.Push_Menu({
										path: "/Item",
										title: "Item",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 6)
									this.Push_Menu({
										path: "/Item_Group",
										title: "Item Group",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 7)
									this.Push_Menu({
										path: "/Account_Group",
										title: "Account Group",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 8)
									this.Push_Menu({
										path: "/Employee_Details",
										title: "Employee Details",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 9)
									this.Push_Menu({
										path: "/Client_Accounts",
										title: "Accounts",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 10)
									this.Push_Menu({
										path: "/Stock_Add_Master",
										title: "Stock Transfer",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 11)
									this.Push_Menu({
										path: "/Ledger",
										title: "Ledger",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 12)
									this.Push_Menu({
										path: "/Purchase_Master",
										title: "Purchase",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 13)
									this.Push_Menu({
										path: "/User_Details",
										title: "Users",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 14)
									this.Push_Menu({
										path: "/Stock_Transfer_Master",
										title: "Stock Transfer",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 15)
									this.Push_Menu({
										path: "/Sales_Return_Master",
										title: "Sales Return",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								// else if(Menus[i].Menu_Id==16)
								// this.Push_Menu({ path: '/Purchase_Return', title: 'Purchase Return', icon: 'unarchive', class: '' ,Menu_Id:Menus[i].Menu_Id,'View':Menus[i].VIew_All, Save:Menus[i].Menu_Save ,Edit:Menus[i].Menu_Edit,Delete:Menus[i].Menu_Delete,Menu_Type:Menus[i].Menu_Type});
								else if (Menus[i].Menu_Id == 16)
									this.Push_Menu({
										path: "/Production",
										title: "Production",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 17)
									this.Push_Menu({
										path: "/Journal_Entry",
										title: "Expense",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 18)
									this.Push_Menu({
										path: "/Contra_Entry",
										title: "Contra",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 19)
									this.Push_Menu({
										path: "/Receipt_Voucher",
										title: "Receivable",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 20)
									this.Push_Menu({
										path: "/Payment_Voucher",
										title: "Payable",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 21)
									this.Push_Menu({
										path: "/DayBook_Report",
										title: "DayBook Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 22)
									this.Push_Menu({
										path: "/Sales_Details_Report",
										title: " Sales Details Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 23)
									this.Push_Menu({
										path: "/Sales_Summary_Report",
										title: " Sales Summary Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								// else if (Menus[i].Menu_Id == 24)
								// 	this.Push_Menu({
								// 		path: "/Stock_Report",
								// 		title: " Stock  Report",
								// 		icon: "unarchive",
								// 		class: "",
								// 		Menu_Id: Menus[i].Menu_Id,
								// 		View: Menus[i].VIew_All,
								// 		Save: Menus[i].Menu_Save,
								// 		Edit: Menus[i].Menu_Edit,
								// 		Delete: Menus[i].Menu_Delete,
								// 		Menu_Type: Menus[i].Menu_Type,
								// 	});
								else if (Menus[i].Menu_Id == 25)
									this.Push_Menu({
										path: "/Sales_Mobile",
										title: " Sales ",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 26)
									this.Push_Menu({
										path: "/Customer",
										title: "Branch",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 27)
									this.Push_Menu({
										path: "/Sales_Monthly_Report",
										title: "Sales Monthly Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 28)
									this.Push_Menu({
										path: "/Customer_Sales_Report",
										title: "Customer Sales Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 29)
									this.Push_Menu({
										path: "/Service_Report",
										title: "Service Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 30)
									this.Push_Menu({
										path: "/Receipt_Report",
										title: "Receipt Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 31)
									this.Push_Menu({
										path: "/Purchase_Report",
										title: "Purchase Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 32)
									this.Push_Menu({
										path: "/Stock_Add_Report",
										title: "Stock Add Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 33)
									this.Push_Menu({
										path: "/Stock_Transfer_Report",
										title: "Stock Transfer Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 34)
									this.Push_Menu({
										path: "/Sales_Calender",
										title: "Sales Calender",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 35)
									this.Push_Menu({
										path: "/Company",
										title: "Company",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 36)
									this.Push_Menu({
										path: "/Service",
										title: "Service",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 37)
									this.Push_Menu({
										path: "/Service_Type",
										title: "Service Type",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 38)
									this.Push_Menu({
										path: "/Bank",
										title: "Bank",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 39)
									this.Push_Menu({
										path: "/Cheque_Book",
										title: "Cheque Book",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 40)
									this.Push_Menu({
										path: "/Supplier",
										title: "Vendor",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 41)
									this.Push_Menu({
										path: "/Payment_Report",
										title: "Payment Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 42)
									this.Push_Menu({
										path: "Journal_Report",
										title: "Journal Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 43)
									this.Push_Menu({
										path: "/Contra_Report",
										title: "Contra Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 46)
									this.Push_Menu({
										path: "/Purchase_Tax",
										title: "Purchase Tax Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 45)
									this.Push_Menu({
										path: "/B2B_Sales_Tax",
										title: "B2B Sales Tax Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 49)
									this.Push_Menu({
										path: "/Purchase_Return_Tax",
										title: "Purchase Return Tax Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 48)
									this.Push_Menu({
										path: "/Sales_Return_Tax",
										title: "Sales Return Tax Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 47)
									this.Push_Menu({
										path: "/Service_Tax",
										title: "Service Tax Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 56)
									this.Push_Menu({
										path: "/Sales_Return_Report",
										title: "Sales Return Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 57)
									this.Push_Menu({
										path: "/Purchase_Return_Report",
										title: "Purchase Return Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 60)
									this.Push_Menu({
										path: "/Purchase_Details_Report",
										title: "Purchase Details Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 61)
									this.Push_Menu({
										path: "/Service_Details_Report",
										title: "Service Details Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 62)
									this.Push_Menu({
										path: "/Sales_Return_Details_Report",
										title: "Sales Return Details Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 63)
									this.Push_Menu({
										path: "/Purchase_Return_Details_Report",
										title: "Purchase Return Details Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								// else if (Menus[i].Menu_Id == 66)
								// this.Push_Menu({ path: '/Account_Group_Report', title: 'Account Group Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
								else if (Menus[i].Menu_Id == 67)
									this.Push_Menu({
										path: "/Damage_Master",
										title: "Damage Master",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 68)
									this.Push_Menu({
										path: "/Damage_Report",
										title: "Damage Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 69)
									this.Push_Menu({
										path: "/Hsn_Purchase_Report",
										title: "Hsn Purchase Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 70)
									this.Push_Menu({
										path: "/Hsn_Sales_Report",
										title: "Hsn Sales Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 71)
									this.Push_Menu({
										path: "/Hsn_Service_Report",
										title: "Hsn Service Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 72)
									this.Push_Menu({
										path: "/Hsn_Purchase_Return_Report",
										title: "Hsn Purchase Return Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 73)
									this.Push_Menu({
										path: "/Hsn_Sales_Return_Report",
										title: "Hsn Sales Return Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 74)
									this.Push_Menu({
										path: "/B2C_Sales_Tax",
										title: "B2C Sales Tax Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 75)
									this.Push_Menu({
										path: "/HSNwise_SalesReport",
										title: "HSN Wise Sales Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								// else if (Menus[i].Menu_Id == 76)
								//   this.Push_Menu({ path: '/Quotation', title: 'Quotation', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
								// else if (Menus[i].Menu_Id == 77)
								// this.Push_Menu({ path: '/Quotation_Details_Report', title: 'Quotation Details Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
								else if (Menus[i].Menu_Id == 78)
									this.Push_Menu({
										path: "/Purchase_Order",
										title: "Purchase Order",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 79)
									this.Push_Menu({
										path: "/PurchaseOrder_Details_Report",
										title: "PurchaseOrder Details Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 76)
									this.Push_Menu({
										path: "/Account_Years",
										title: "Account Years",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 77)
									this.Push_Menu({
										path: "/General_Settings",
										title: "General Settings",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 80)
									this.Push_Menu({
										path: "/PettyCashEntry_Form",
										title: "Petty Cash Entry Form",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 81)
									this.Push_Menu({
										path: "/PettyCash_Report",
										title: "Petty Cash Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 82)
									this.Push_Menu({
										path: "/Waste_Management",
										title: "Waste Management",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
								else if (Menus[i].Menu_Id == 83)
									this.Push_Menu({
										path: "/Waste_Management_Report",
										title: "Waste Management Report",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
									else if (Menus[i].Menu_Id == 84)
									this.Push_Menu({
										path: "/Document_Type",
										title: "Document Type",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
									else if (Menus[i].Menu_Id == 85)
									this.Push_Menu({
										path: "/Document",
										title: "Document",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
									else if (Menus[i].Menu_Id == 86)
									this.Push_Menu({
										path: "/Stock_Add_Master",
										title: "Stock Transfer",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
									else if (Menus[i].Menu_Id == 87)
									this.Push_Menu({
										path: "/Dashboard",
										title: "Dashboard",
										icon: "unarchive",
										class: "",
										Menu_Id: Menus[i].Menu_Id,
										View: Menus[i].VIew_All,
										Save: Menus[i].Menu_Save,
										Edit: Menus[i].Menu_Edit,
										Delete: Menus[i].Menu_Delete,
										Menu_Type: Menus[i].Menu_Type,
									});
									else if (Menus[i].Menu_Id == 88)
										this.Push_Menu({
											path: "/Daily_Report",
											title: "Daily Report",
											icon: "unarchive",
											class: "",
											Menu_Id: Menus[i].Menu_Id,
											View: Menus[i].VIew_All,
											Save: Menus[i].Menu_Save,
											Edit: Menus[i].Menu_Edit,
											Delete: Menus[i].Menu_Delete,
											Menu_Type: Menus[i].Menu_Type,
										});
									else if (Menus[i].Menu_Id == 89)
											this.Push_Menu({
												path: "/Master_Category",
												title: "Master Category",
												icon: "unarchive",
												class: "",
												Menu_Id: Menus[i].Menu_Id,
												View: Menus[i].VIew_All,
												Save: Menus[i].Menu_Save,
												Edit: Menus[i].Menu_Edit,
												Delete: Menus[i].Menu_Delete,
												Menu_Type: Menus[i].Menu_Type,
											});

									else if (Menus[i].Menu_Id == 90)
												this.Push_Menu({
													path: "/Daybook",
													title: "Daybook",
													icon: "unarchive",
													class: "",
													Menu_Id: Menus[i].Menu_Id,
													View: Menus[i].VIew_All,
													Save: Menus[i].Menu_Save,
													Edit: Menus[i].Menu_Edit,
													Delete: Menus[i].Menu_Delete,
													Menu_Type: Menus[i].Menu_Type,
												});

												else if (Menus[i].Menu_Id == 91)
													this.Push_Menu({
														path: "/Brand",
														title: "Brand",
														icon: "unarchive",
														class: "",
														Menu_Id: Menus[i].Menu_Id,
														View: Menus[i].VIew_All,
														Save: Menus[i].Menu_Save,
														Edit: Menus[i].Menu_Edit,
														Delete: Menus[i].Menu_Delete,
														Menu_Type: Menus[i].Menu_Type,
													});

													else if (Menus[i].Menu_Id == 92)
														this.Push_Menu({
															path: "/Payment_Term",
															title: "Payment Term",
															icon: "unarchive",
															class: "",
															Menu_Id: Menus[i].Menu_Id,
															View: Menus[i].VIew_All,
															Save: Menus[i].Menu_Save,
															Edit: Menus[i].Menu_Edit,
															Delete: Menus[i].Menu_Delete,
															Menu_Type: Menus[i].Menu_Type,
														});

														else if (Menus[i].Menu_Id == 93)
															this.Push_Menu({
																path: "/Currency",
																title: "Currency",
																icon: "unarchive",
																class: "",
																Menu_Id: Menus[i].Menu_Id,
																View: Menus[i].VIew_All,
																Save: Menus[i].Menu_Save,
																Edit: Menus[i].Menu_Edit,
																Delete: Menus[i].Menu_Delete,
																Menu_Type: Menus[i].Menu_Type,
															});

															else if (Menus[i].Menu_Id == 94)
																this.Push_Menu({
																	path: "/Country_Of_Orgin",
																	title: "Country Of Origin",
																	icon: "unarchive",
																	class: "",
																	Menu_Id: Menus[i].Menu_Id,
																	View: Menus[i].VIew_All,
																	Save: Menus[i].Menu_Save,
																	Edit: Menus[i].Menu_Edit,
																	Delete: Menus[i].Menu_Delete,
																	Menu_Type: Menus[i].Menu_Type,
																});
										else if (Menus[i].Menu_Id == 95)
																	this.Push_Menu({
																		path: "/Quotation",
																		title: "Quotation",
																		icon: "unarchive",
																		class: "",
																		Menu_Id: Menus[i].Menu_Id,
																		View: Menus[i].VIew_All,
																		Save: Menus[i].Menu_Save,
																		Edit: Menus[i].Menu_Edit,
																		Delete: Menus[i].Menu_Delete,
																		Menu_Type: Menus[i].Menu_Type,
																	});
																	else if (Menus[i].Menu_Id == 96)
																		this.Push_Menu({
																			path: "/Delivery_Order",
																			title: "Delivery Order",
																			icon: "unarchive",
																			class: "",
																			Menu_Id: Menus[i].Menu_Id,
																			View: Menus[i].VIew_All,
																			Save: Menus[i].Menu_Save,
																			Edit: Menus[i].Menu_Edit,
																			Delete: Menus[i].Menu_Delete,
																			Menu_Type: Menus[i].Menu_Type,
																		});
																		
																	else if (Menus[i].Menu_Id == 97)
																		this.Push_Menu({
																			path: "/Performa_Invoice",
																			title: "Proforma Invoice",
																			icon: "unarchive",
																			class: "",
																			Menu_Id: Menus[i].Menu_Id,
																			View: Menus[i].VIew_All,
																			Save: Menus[i].Menu_Save,
																			Edit: Menus[i].Menu_Edit,
																			Delete: Menus[i].Menu_Delete,
																			Menu_Type: Menus[i].Menu_Type,
																		});
												else if (Menus[i].Menu_Id == 98)
															this.Push_Menu({
																				path: "/Invoice",
																				title: "Invoice",
																				icon: "unarchive",
																				class: "",
																				Menu_Id: Menus[i].Menu_Id,
																				View: Menus[i].VIew_All,
																				Save: Menus[i].Menu_Save,
																				Edit: Menus[i].Menu_Edit,
																				Delete: Menus[i].Menu_Delete,
																				Menu_Type: Menus[i].Menu_Type,
																});
																		else if (Menus[i].Menu_Id == 99)
																			this.Push_Menu({
																				path: "/Purchase_order",
																				title: "Purchase order",
																				icon: "unarchive",
																				class: "",
																				Menu_Id: Menus[i].Menu_Id,
																				View: Menus[i].VIew_All,
																				Save: Menus[i].Menu_Save,
																				Edit: Menus[i].Menu_Edit,
																				Delete: Menus[i].Menu_Delete,
																				Menu_Type: Menus[i].Menu_Type,
																			});
										else if (Menus[i].Menu_Id == 100)
												this.Push_Menu({
																					path: "/GRN",
																					title: "GRN",
																					icon: "unarchive",
																					class: "",
																					Menu_Id: Menus[i].Menu_Id,
																					View: Menus[i].VIew_All,
																					Save: Menus[i].Menu_Save,
																					Edit: Menus[i].Menu_Edit,
																					Delete: Menus[i].Menu_Delete,
																					Menu_Type: Menus[i].Menu_Type,
												});
									else if (Menus[i].Menu_Id == 101)
													this.Push_Menu({
																						path: "/Purchase_Return",
																						title: "Purchase Return",
																						icon: "unarchive",
																						class: "",
																						Menu_Id: Menus[i].Menu_Id,
																						View: Menus[i].VIew_All,
																						Save: Menus[i].Menu_Save,
																						Edit: Menus[i].Menu_Edit,
																						Delete: Menus[i].Menu_Delete,
																						Menu_Type: Menus[i].Menu_Type,
										});

												else if (Menus[i].Menu_Id == 102)
													this.Push_Menu({
																						path: "/Packing_List",
																						title: "Packing List",
																						icon: "unarchive",
																						class: "",
																						Menu_Id: Menus[i].Menu_Id,
																						View: Menus[i].VIew_All,
																						Save: Menus[i].Menu_Save,
																						Edit: Menus[i].Menu_Edit,
																						Delete: Menus[i].Menu_Delete,
																						Menu_Type: Menus[i].Menu_Type,
													});

													else if (Menus[i].Menu_Id == 103)
														this.Push_Menu({
																							path: "/Sales_Return",
																							title: "Sales Return",
																							icon: "unarchive",
																							class: "",
																							Menu_Id: Menus[i].Menu_Id,
																							View: Menus[i].VIew_All,
																							Save: Menus[i].Menu_Save,
																							Edit: Menus[i].Menu_Edit,
																							Delete: Menus[i].Menu_Delete,
																							Menu_Type: Menus[i].Menu_Type,
														});

													else if (Menus[i].Menu_Id == 104)
														this.Push_Menu({
																							path: "/Credit_Note",
																							title: "Credit Note",
																							icon: "unarchive",
																							class: "",
																							Menu_Id: Menus[i].Menu_Id,
																							View: Menus[i].VIew_All,
																							Save: Menus[i].Menu_Save,
																							Edit: Menus[i].Menu_Edit,
																							Delete: Menus[i].Menu_Delete,
																							Menu_Type: Menus[i].Menu_Type,
														});
												else if (Menus[i].Menu_Id == 105)
															this.Push_Menu({
																								path: "/Debit_Note",
																								title: "Debit Note",
																								icon: "unarchive",
																								class: "",
																								Menu_Id: Menus[i].Menu_Id,
																								View: Menus[i].VIew_All,
																								Save: Menus[i].Menu_Save,
																								Edit: Menus[i].Menu_Edit,
																								Delete: Menus[i].Menu_Delete,
																								Menu_Type: Menus[i].Menu_Type,
												});

												else if (Menus[i].Menu_Id == 106)
													this.Push_Menu({
																						path: "/ReceiptVoucher",
																						title: "Receivable",
																						icon: "unarchive",
																						class: "",
																						Menu_Id: Menus[i].Menu_Id,
																						View: Menus[i].VIew_All,
																						Save: Menus[i].Menu_Save,
																						Edit: Menus[i].Menu_Edit,
																						Delete: Menus[i].Menu_Delete,
																						Menu_Type: Menus[i].Menu_Type,
											});
													else if (Menus[i].Menu_Id == 107)
														this.Push_Menu({
																							path: "/Journal_Entry_New",
																							title: "Expense",
																							icon: "unarchive",
																							class: "",
																							Menu_Id: Menus[i].Menu_Id,
																							View: Menus[i].VIew_All,
																							Save: Menus[i].Menu_Save,
																							Edit: Menus[i].Menu_Edit,
																							Delete: Menus[i].Menu_Delete,
																							Menu_Type: Menus[i].Menu_Type,
											});

											else if (Menus[i].Menu_Id == 108)
												this.Push_Menu({
																					path: "/AddStock",
																					title: "Stock",
																					icon: "unarchive",
																					class: "",
																					Menu_Id: Menus[i].Menu_Id,
																					View: Menus[i].VIew_All,
																					Save: Menus[i].Menu_Save,
																					Edit: Menus[i].Menu_Edit,
																					Delete: Menus[i].Menu_Delete,
																					Menu_Type: Menus[i].Menu_Type,
											});

											else if (Menus[i].Menu_Id == 24)
												this.Push_Menu({
																					path: "/Stock_Reports",
																					title: "Stock Report",
																					icon: "unarchive",
																					class: "",
																					Menu_Id: Menus[i].Menu_Id,
																					View: Menus[i].VIew_All,
																					Save: Menus[i].Menu_Save,
																					Edit: Menus[i].Menu_Edit,
																					Delete: Menus[i].Menu_Delete,
																					Menu_Type: Menus[i].Menu_Type,
											});

											else if (Menus[i].Menu_Id == 24)
												this.Push_Menu({
																					path: "/Stock_Reports",
																					title: "Stock Report",
																					icon: "unarchive",
																					class: "",
																					Menu_Id: Menus[i].Menu_Id,
																					View: Menus[i].VIew_All,
																					Save: Menus[i].Menu_Save,
																					Edit: Menus[i].Menu_Edit,
																					Delete: Menus[i].Menu_Delete,
																					Menu_Type: Menus[i].Menu_Type,
											});
											else if (Menus[i].Menu_Id == 53)
												this.Push_Menu({
																					path: "/ProfitAndLossReport",
																					title: "Profit And Loss Report",
																					icon: "unarchive",
																					class: "",
																					Menu_Id: Menus[i].Menu_Id,
																					View: Menus[i].VIew_All,
																					Save: Menus[i].Menu_Save,
																					Edit: Menus[i].Menu_Edit,
																					Delete: Menus[i].Menu_Delete,
																					Menu_Type: Menus[i].Menu_Type,
											});


											else if (Menus[i].Menu_Id == 109)
												this.Push_Menu({
																					path: "/Vat_Report",
																					title: "Vat Report",
																					icon: "unarchive",
																					class: "",
																					Menu_Id: Menus[i].Menu_Id,
																					View: Menus[i].VIew_All,
																					Save: Menus[i].Menu_Save,
																					Edit: Menus[i].Menu_Edit,
																					Delete: Menus[i].Menu_Delete,
																					Menu_Type: Menus[i].Menu_Type,
											});
											else if (Menus[i].Menu_Id == 110)
												this.Push_Menu({
																					path: "/GRN_Vat_Report",
																					title: "GRN Vat Report",
																					icon: "unarchive",
																					class: "",
																					Menu_Id: Menus[i].Menu_Id,
																					View: Menus[i].VIew_All,
																					Save: Menus[i].Menu_Save,
																					Edit: Menus[i].Menu_Edit,
																					Delete: Menus[i].Menu_Delete,
																					Menu_Type: Menus[i].Menu_Type,
											});

											else if (Menus[i].Menu_Id == 111)
												this.Push_Menu({
																					path: "/OutstandingReport",
																					title: "OutstandingReport",
																					icon: "unarchive",
																					class: "",
																					Menu_Id: Menus[i].Menu_Id,
																					View: Menus[i].VIew_All,
																					Save: Menus[i].Menu_Save,
																					Edit: Menus[i].Menu_Edit,
																					Delete: Menus[i].Menu_Delete,
																					Menu_Type: Menus[i].Menu_Type,
											});
						else if (Menus[i].Menu_Id == 112)
									this.Push_Menu({
																		path: "/Statement_of_Account",
																		title: "Statement of Account",
																		icon: "unarchive",
																		class: "",
																		Menu_Id: Menus[i].Menu_Id,
																		View: Menus[i].VIew_All,
																		Save: Menus[i].Menu_Save,
																		Edit: Menus[i].Menu_Edit,
																		Delete: Menus[i].Menu_Delete,
																		Menu_Type: Menus[i].Menu_Type,
						});
						else if (Menus[i].Menu_Id == 113)
							this.Push_Menu({
																path: "/Stock_Take_Name",
																title: "Stock Take Name",
																icon: "unarchive",
																class: "",
																Menu_Id: Menus[i].Menu_Id,
																View: Menus[i].VIew_All,
																Save: Menus[i].Menu_Save,
																Edit: Menus[i].Menu_Edit,
																Delete: Menus[i].Menu_Delete,
																Menu_Type: Menus[i].Menu_Type,
				});
						else if (Menus[i].Menu_Id == 114)
							this.Push_Menu({
																path: "/Stock_Take",
																title: "Stock Take",
																icon: "unarchive",
																class: "",
																Menu_Id: Menus[i].Menu_Id,
																View: Menus[i].VIew_All,
																Save: Menus[i].Menu_Save,
																Edit: Menus[i].Menu_Edit,
																Delete: Menus[i].Menu_Delete,
																Menu_Type: Menus[i].Menu_Type,
				});

				else if (Menus[i].Menu_Id == 115)
					this.Push_Menu({
														path: "/Stock_Adjust",
														title: "Stock Adjust",
														icon: "unarchive",
														class: "",
														Menu_Id: Menus[i].Menu_Id,
														View: Menus[i].VIew_All,
														Save: Menus[i].Menu_Save,
														Edit: Menus[i].Menu_Edit,
														Delete: Menus[i].Menu_Delete,
														Menu_Type: Menus[i].Menu_Type,
		});
				else if (Menus[i].Menu_Id == 116)
					this.Push_Menu({
														path: "/Requirement",
														title: "Requirement",
														icon: "unarchive",
														class: "",
														Menu_Id: Menus[i].Menu_Id,
														View: Menus[i].VIew_All,
														Save: Menus[i].Menu_Save,
														Edit: Menus[i].Menu_Edit,
														Delete: Menus[i].Menu_Delete,
														Menu_Type: Menus[i].Menu_Type,
		});
		else if (Menus[i].Menu_Id == 117)
					this.Push_Menu({
														path: "/Sales Order",
														title: "Sales Order",
														icon: "unarchive",
														class: "",
														Menu_Id: Menus[i].Menu_Id,
														View: Menus[i].VIew_All,
														Save: Menus[i].Menu_Save,
														Edit: Menus[i].Menu_Edit,
														Delete: Menus[i].Menu_Delete,
														Menu_Type: Menus[i].Menu_Type,
		});

						
							}
							// {
							// if( Menus[i].VIew_All==true)
							// {
							//    this.issLoading = true;

							//    this.Lead_Service_.Get_Accounts_Followup_Count (this.Login_Id).subscribe(Save_status => {

							//      if(Save_status.returnvalue.Leads.length!=0 && Save_status.returnvalue.Leads[0]!=undefined && Save_status.returnvalue.Leads[0]!=null && Save_status.returnvalue.Leads.length==0)
							//      {
							//     this.Notification_count=Save_status.returnvalue.Leads[0].Followup_Count;
							//      }
							//      else
							//      this.Notification_count=0;
							//    this.issLoading = false;
							//    },
							//    Rows => {
							//    this.issLoading = false;
							//    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
							//    });

							// }

							// }
							debugger;
							localStorage.setItem("Routes_Temp", JSON.stringify(ROUTES));
							localStorage.setItem(
								"Pointer_Temp",
								JSON.stringify(Pointer_Table)
							);
							this.ngZone.run(() => {
								this.router.navigateByUrl("/Lead");
							});
						}
					},
					(Rows) => {}
				);
			} else {
				this.issLoading = false;
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Invalid User Name/Password", Type: "3" },
				});
			}
		}
	}
	Push_Menu(Menu_Data) {
		ROUTES.push(Menu_Data);
		// console.log(Menu_Data)
		Pointer_Table[Menu_Data.Menu_Id - 1] = ROUTES.length - 1;
		// console.log(Pointer_Table,'ptable after menu data push')
	}

	ngOnInit() {}
}
