import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock_Service } from '../../../services/Stock.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Stock } from '../../../models/Stock';
import { MatDialog } from '@angular/material/dialog';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Stock',
templateUrl: './Stock.component.html',
styleUrls: ['./Stock.component.css']
})
export class StockComponent implements OnInit {
Stock_Data:Stock[]
Stock_:Stock= new Stock();
Stock_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Stock_Edit:boolean;
Stock_Save:boolean;
Stock_Delete:boolean;
constructor(public Stock_Service_:Stock_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(15);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Stock_Edit=this.Permissions.Edit;
this.Stock_Save=this.Permissions.Save;
this.Stock_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Stock();
this.Search_Stock();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Stock();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Stock()
 {
this.Stock_.Stock_Id=0;
this.Stock_.ItemId=0;
this.Stock_.Barcode="";
this.Stock_.ItemName="";
this.Stock_.GroupId=0;
this.Stock_.GroupName="";
this.Stock_.UnitId=0;
this.Stock_.UnitName="";
this.Stock_.PurchaseRate=0;
this.Stock_.SaleRate=0;
this.Stock_.MRP=0;
this.Stock_.HSNMasterId=0;
this.Stock_.HSNCODE="";
this.Stock_.SaleTax=0;
this.Stock_.Quantity=0;
this.Stock_.CGST=0;
this.Stock_.SGST=0;

}
Search_Stock()
{
this.issLoading=true;
this.Stock_Service_.Search_Stock('').subscribe(Rows => {
 this.Stock_Data=Rows[0];
this.issLoading=false;
this.Total_Entries=this.Stock_Data.length;
if(this.Stock_Data.length==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
this.issLoading = false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); 
 });
}
Delete_Stock(Stock_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Stock_Service_.Delete_Stock(Stock_Id).subscribe(Delete_status => {
if(Delete_status[0][0].Stock_Id_>0){
this.Stock_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
}
else
{
//this.Stock_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
     this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
 });
}
Save_Stock()
{
document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
this.Stock_Service_.Save_Stock(this.Stock_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Stock_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
}
else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
     this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
Edit_Stock(Stock_e:Stock,index)
{
this.Entry_View=true;
this.Stock_=Stock_e;
this.Stock_=Object.assign({},Stock_e);
}
}

