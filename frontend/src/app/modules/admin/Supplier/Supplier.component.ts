import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from 'rxjs/operators';

import { Client_Accounts_Service } from "../../../services/Client_Accounts.Service";
import { Journal_Entry_Service } from "../../../services/Journal_Entry.Service";
import { Account_Group_Service } from "../../../services/Account_Group.Service";
import { DialogBox_Component } from "../DialogBox/DialogBox.component";
import { Client_Accounts } from "../../../models/Client_Accounts";
import { Account_Group } from "../../../models/Account_Group";

import { MatDialog } from "@angular/material";
import {
	ROUTES,
	Get_Page_Permission,
} from "../../../components/sidebar/sidebar.component";
import { Item_Group_Service } from "../../../services/Item_Group.Service";
import { Item_Group } from "../../../models/Item_Group";
import { Item } from "../../../models/Item";
@Component({
	selector: "app-Supplier",
	templateUrl: "./Supplier.component.html",
	styleUrls: ["./Supplier.component.css"],
})
export class SupplierComponent implements OnInit {
	Client_Accounts_Data: Client_Accounts[];
	Employee_Details_Data: Client_Accounts[];
	Employee_: Client_Accounts = new Client_Accounts();
	Employee_Search: Client_Accounts = new Client_Accounts();
	Client_Accounts_: Client_Accounts = new Client_Accounts();
	Client_Accounts_Name_Search: string;
	Account_Group_Data: Account_Group[];
	Search_Client_Accounts_: string;
	Account_Group_Temp: Account_Group = new Account_Group();
	Employee_Details_Temp: Client_Accounts = new Client_Accounts();
	Account_Group_: Account_Group = new Account_Group();
	Client_Accounts_Id: number;
	//Account_Group_Temp:Account_Group=new Account_Group();
	Entry_View: boolean = true;
	myInnerHeight: number;
	EditIndex: number;
	Total_Entries: number = 0;

	color = "primary";
	mode = "indeterminate";
	value = 50;
	issLoading: boolean;
	Permissions: any;
	Client_Accounts_Edit: boolean;
	Client_Accounts_Save: boolean;
	Client_Accounts_Delete: boolean;
	Employee_Name: string;
	Employee_Id: number;
	User_Type: number;
	Employee_Edit: boolean = false;
	Group_Edit: boolean = false;
	Login_User: string = "0";
	Item_Group_Data: Item_Group[];
	Item_Group_: Item_Group = new Item_Group();
	Item_Data: Item[];
	Retrived_Product: Item[];
	constructor(
		public Client_Accounts_Service_: Client_Accounts_Service,
		public Journal_Entry_Service_: Journal_Entry_Service,
		public Account_Group_Service_: Account_Group_Service,
		public Item_Group_Service_: Item_Group_Service,
		private route: ActivatedRoute,
		private router: Router,
		public dialogBox: MatDialog
	) {}
	ngOnInit() {
		this.User_Type = Number(localStorage.getItem("User_Type"));
		this.Employee_Name = localStorage.getItem("Employee_Name");
		this.Employee_Id = Number(localStorage.getItem("Employee_Id"));
		this.Login_User = localStorage.getItem("Login_User");
		localStorage.removeItem("token");
		this.Permissions = Get_Page_Permission(40);
		if (this.Permissions == undefined || this.Permissions == null) {
			this.router.navigateByUrl("/auth/login");
		} else {
			this.Client_Accounts_Edit = this.Permissions.Edit;
			this.Client_Accounts_Save = this.Permissions.Save;
			this.Client_Accounts_Delete = this.Permissions.Delete;
			this.Page_Load();
		}
	}

	Page_Load() {
		this.myInnerHeight = window.innerHeight;
		this.myInnerHeight = this.myInnerHeight - 300;
		this.Group_Edit = true;
		if (this.User_Type == 2) {
			this.Employee_Search.Client_Accounts_Id = this.Employee_Id;
			this.Employee_Search.Client_Accounts_Name = this.Employee_Name;
			this.Employee_Edit = true;
		}

		// this.Client_Accounts_.Opening_Type = 1;
		this.Clr_Client_Accounts();
		this.Search_Client_Accounts();
		this.Load_Item_Group();
		//this.Get_Account_Group();
		this.Entry_View = false;
	}
	Create_New() {
		this.Entry_View = true;
		this.Clr_Client_Accounts();
	}
	Close_Click() {
		this.Entry_View = false;
	}
	trackByFn(index, item) {
		return index;
	}

	// Edit_Account_Group()
	//         {
	//
	//  this.Account_Group_Service_.Get_Account_Group(this.Client_Accounts_.Account_Group_Id).subscribe(Rows => {
	//
	//         this.Account_Group_Data = Rows[0];
	//         this.Account_Group_Temp.Under_Group=this.Account_Group_Data[0].Under_Group;
	//         this.Account_Group_Temp.Group_Name=this.Account_Group_Data[0].Group_Name;

	//      this.Account_Group_=this.Account_Group_Temp;
	//         },
	//         Rows =>
	//         {
	//         //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
	//         });
	//         }
	Clr_Client_Accounts() {
		this.Client_Accounts_.Client_Accounts_Id = 0;
		this.Client_Accounts_.Account_Group_Id = 0;
		this.Client_Accounts_.Client_Accounts_Code = "";
		this.Client_Accounts_.Client_Accounts_Name = "";
		this.Client_Accounts_.Client_Accounts_No = "";
		//this.Account_Group_=null;

		this.Account_Group_.Account_Group_Id = 1;
		this.Account_Group_.Group_Name = "Sundry Creditors";

		if (this.User_Type == 2) {
			this.Employee_.Client_Accounts_Id = this.Employee_Id;
			this.Employee_.Client_Accounts_Name = this.Employee_Name;
			this.Employee_Edit = true;
		} else {
			this.Employee_ = null;
		}
		this.Client_Accounts_.Address1 = "";
		this.Client_Accounts_.Address2 = "";
		this.Client_Accounts_.Address3 = "";
		this.Client_Accounts_.Address4 = "";
		this.Client_Accounts_.PinCode = "";
		this.Client_Accounts_.State = "";
		this.Client_Accounts_.Country = "";
		this.Client_Accounts_.Phone = "";
		this.Client_Accounts_.Mobile = "";
		this.Client_Accounts_.Email = "";
		this.Client_Accounts_.GSTNo = "";
		// this.Client_Accounts_.PanNo = "";
		// this.Client_Accounts_.StateCode = "";
		// this.Client_Accounts_.Opening_Balance = 0;
		// this.Client_Accounts_.Description1 = "";
		// this.Client_Accounts_.Entry_Date = "";
		// this.Client_Accounts_.UserId = 0;
		// this.Client_Accounts_.LedgerInclude = "";
		// this.Client_Accounts_.CanDelete = "";
		// this.Client_Accounts_.Commision = 0;
		this.Item_Data = [];
		//this.Item_Group_Data = [];
		// if (this.Item_Group_Data != null && this.Item_Group_Data != undefined){
		// 	this.Item_Group_ = this.Item_Group_Data[0];
			
		// }
	
		this.Retrived_Product = [];
		this.Load_Item_Group()
	}
	Get_Account_Group(event: any) {
		var Value = "";
		if (event.target.value == "") Value = undefined;
		else Value = event.target.value;
		this.issLoading = true;
		this.Account_Group_Service_.Search_Account_Group_Typeahead(Value).subscribe(
			(Rows) => {
				if (Rows != null) {
					this.Account_Group_Data = Rows[0];
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
	Get_Item_Group(event: any) {
		var Value = "";
		if (event.target.value == "") Value = undefined;
		else Value = event.target.value;
		this.issLoading = true;
		this.Item_Group_Service_.Search_Item_Group(Value).subscribe(
			(Rows) => {
				if (Rows != null) {
					this.Item_Group_Data = Rows[0];
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
	Get_Employee(event: any) {
		var Value = "";
		if (event.target.value == "") Value = undefined;
		else Value = event.target.value;
		this.issLoading = true;

		this.Journal_Entry_Service_.Accounts_Typeahead(2, Value).subscribe(
			(Rows) => {
				if (Rows != null) {
					this.Employee_Details_Data = Rows[0];
				}
				this.issLoading = false;
			},
			(Rows) => {
				this.issLoading = false;
			}
		);
	}
	display_Employee(Client_Accounts_e: Client_Accounts) {
		if (Client_Accounts_e) {
			return Client_Accounts_e.Client_Accounts_Name;
		}
	}
	Search_Client_Accounts() {
		var Employee_Id = 0,
			Search_Client_Accounts = "";
		this.issLoading = true;

		//  if(this.Search_Client_Accounts_==undefined)
		//  this.Search_Client_Accounts_="";

		if (
			this.Search_Client_Accounts_ == undefined ||
			this.Search_Client_Accounts_ == null ||
			this.Search_Client_Accounts_ == ""
		)
			Search_Client_Accounts = undefined;
		else Search_Client_Accounts = this.Search_Client_Accounts_;

		if (
			this.Employee_Search.Client_Accounts_Id == undefined ||
			this.Employee_Search == undefined ||
			this.Employee_Search == null
		)
			Employee_Id = 0;
		else Employee_Id = this.Employee_Search.Client_Accounts_Id;

		this.Client_Accounts_Service_.Search_Customer(
			Search_Client_Accounts,
			1
		).subscribe(
			(Rows) => {
				this.Client_Accounts_Data = Rows[0];

				this.Total_Entries = this.Client_Accounts_Data.length;
				if (this.Client_Accounts_Data.length == 0) {
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
					data: { Message: "No Details Found", Type: "3" },
				});
			}
		);
	}
	Delete_Client_Accounts(Client_Accounts_Id, index) {
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
				this.Client_Accounts_Service_.Delete_Client_Accounts(
					Client_Accounts_Id
				).subscribe(
					(Delete_status) => {
						debugger;
						if (Delete_status[0][0].Client_Accounts_Id_ > 0) {
							this.Client_Accounts_Data.splice(index, 1);
							const dialogRef = this.dialogBox.open(DialogBox_Component, {
								panelClass: "Dialogbox-Class",
								data: { Message: "Deleted", Type: "false" },
							});
						} else {
							//this.Client_Accounts_Data.splice(index, 1);
							const dialogRef = this.dialogBox.open(DialogBox_Component, {
								panelClass: "Dialogbox-Class",
								data: { Message: "Error Occured", Type: "2" },
							});
						}
						this.issLoading = false;
					},
					(Rows) => {
						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Error", Type: "2" },
						});
					}
				);
				this.issLoading = false;
			}
		});
	}

	// Get_Account_Group_Data()
	//         {
	//
	//  this.Account_Group_Service_.Get_Account_Group(this.Account_Group_.Account_Group_Id).subscribe(Rows => {
	//
	//         this.Account_Group_Data = Rows[0];
	//         this.Account_Group_Temp.Under_Group=this.Account_Group_Data[0].Under_Group;
	//         this.Account_Group_Temp.Group_Name=this.Account_Group_Data[0].Group_Name;

	//      this.Account_Group_=this.Account_Group_Temp;
	//         },
	//         Rows =>
	//         {
	//         //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
	//         });
	//         }

	display_Item_Group(Account_Group_: Account_Group) {
		if (Account_Group_) {
			return Account_Group_.Group_Name;
		}
	}

	Save_Client_Accounts() {
		debugger
		if (
			this.Account_Group_ == null ||
			this.Account_Group_ == undefined ||
			this.Account_Group_.Account_Group_Id == 0 ||
			this.Account_Group_ == undefined
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "select Account group", Type: "3" },
			});
		} else if (
			this.Client_Accounts_.Client_Accounts_Name == null ||
			this.Client_Accounts_.Client_Accounts_Name == ""
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter the Name ", Type: "3" },
			});
		} else {
			this.issLoading = true;
			//document.getElementById('Save_Button').hidden=true;
			this.Client_Accounts_.Employee_Id = 0;
			this.Client_Accounts_.Account_Group_Id =
				this.Account_Group_.Account_Group_Id;
			var Groups = [],
				Items = [];
				debugger
			for (var j = 0; j < this.Item_Group_Data.length; j++) {
				if (this.Item_Group_Data[j].Check_Box == true)
					Groups.push(this.Item_Group_Data[j]);
			}
			for (var j = 0; j < this.Item_Data.length; j++) {
				if (this.Item_Data[j].Checkbox == true) Items.push(this.Item_Data[j]);
			}
			debugger;
			// this.Client_Accounts_.Product_Data = Items;
			// this.Client_Accounts_.Category_Data = Groups;
			debugger
			console.log("Before Supplier Save API call");
			this.issLoading = true;

			this.Client_Accounts_Service_.Save_Client_Accounts(this.Client_Accounts_)
			.pipe(
				finalize(() => {
					console.log("Supplier Save Finalize executed");
					this.issLoading = false;
					// Re-enable save button if hidden (though not explicitly hidden in current code, adding for consistency)
					const saveButton = document.getElementById("Save_Button");
					if (saveButton) saveButton.hidden = false;
				})
			)
			.subscribe({
				next: (Save_status) => {
					console.log("Supplier Save API Response:", Save_status);
					Save_status = Save_status[0];

					if (Number(Save_status[0].Client_Accounts_Id_) > 0) {
						this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Saved Successfully", Type: "false" },
						});
						this.Search_Client_Accounts();
						this.Clr_Client_Accounts();
					} else if (Number(Save_status[0].Client_Accounts_Id_) == -1) {
						this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Supplier Name Already Exists", Type: "2" },
						});
					} else {
						this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Error Occured", Type: "2" },
						});
					}
				},
				error: (error) => {
					console.error("Supplier Save API ERROR:", error);
					this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" },
					});
				}
			});
		}
	}
	Edit_Client_Accounts(Client_Accounts_e: Client_Accounts, index) {
		debugger
		this.Entry_View = true;
		this.Client_Accounts_ = Client_Accounts_e;
		this.Client_Accounts_ = Object.assign({}, Client_Accounts_e);

		this.Account_Group_Temp.Account_Group_Id =
			Client_Accounts_e.Account_Group_Id;
		this.Account_Group_Temp.Group_Name = Client_Accounts_e.Account_Group_Name;
		this.Account_Group_ = this.Account_Group_Temp;

		this.Employee_Details_Temp.Client_Accounts_Id =
			Client_Accounts_e.Employee_Id;
		// this.Employee_Details_Temp.Client_Accounts_Name =
		// 	Client_Accounts_e.Employee;
		this.Employee_ = this.Employee_Details_Temp;
		debugger
		this.Client_Accounts_Service_.Get_Vendors_Other_Details(
			this.Client_Accounts_.Client_Accounts_Id
		).subscribe(
			(Rows) => {
				debugger
				if (Rows != null) {
					var Category = Rows[0];
					debugger;
					for (var i = 0; i < this.Item_Group_Data.length; i++) {
						this.Item_Group_Data[i].Check_Box = false;
						for (var j = 0; j < Category.length; j++) {
							if (
								Category[j].Item_Group_Id ==
								this.Item_Group_Data[i].Item_Group_Id
							)
								this.Item_Group_Data[i].Check_Box = true;
						}
					}
					var edit_product = 1;
					debugger
					this.Load_Prodcut_Under_Category(edit_product);
					this.Retrived_Product = Rows[1];
					debugger;

					this.issLoading = false;
				}
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
	Load_Item_Group() {
		this.Item_Group_Service_.Load_Item_Group().subscribe(
			(Rows) => {
				if (Rows != null) {
					debugger
					this.Item_Group_Data = Rows[0];
					this.Item_Group_ = this.Item_Group_Data[0];
				}
			},
			(Rows) => {
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Error Occured", Type: "2" },
				});
			}
		);
	}
	Load_Prodcut_Under_Category(edit_product) {
		var Groups = [];
		for (var j = 0; j < this.Item_Group_Data.length; j++) {
			if (this.Item_Group_Data[j].Check_Box == true)
				Groups.push(this.Item_Group_Data[j]);
		}
		debugger;
		const id_num = Groups.map((obj) => obj.Item_Group_Id).join(",");
		if (id_num != undefined) {
			debugger
			this.Client_Accounts_Service_.Load_Prodcut_Under_Category(
				id_num
			).subscribe(
				(Rows) => {
					if (Rows != null) {
						debugger
						this.Item_Data = Rows[0];
						if (edit_product > 0) {
							debugger;
							for (var i = 0; i < this.Item_Data.length; i++) {
								this.Item_Data[i].Checkbox = false;
								for (var j = 0; j < this.Retrived_Product.length; j++) {
									if (
										this.Retrived_Product[j].Item_Id ==
										this.Item_Data[i].Item_Id
									)
										this.Item_Data[i].Checkbox = true;
								}
							}
						}
						// this.Item_Group_ = this.Item_Group_Data[0];
					}
				},
				(Rows) => {
					const dialogRef = this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "Error Occured", Type: "2" },
					});
				}
			);
		}
	}
}
