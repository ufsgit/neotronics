import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { payment_term_Service } from '../../../services/payment_term.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { MatDialog } from '@angular/material/dialog';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { payment_term } from '../../../models/payment_term';
@Component({
selector: 'app-Payment_Term',
templateUrl: './Payment_Term.component.html',
styleUrls: ['./Payment_Term.component.css']
})
export class Payment_TermComponent implements OnInit {
payment_term_Data:payment_term[]
payment_term_Datas_:payment_term[]
Under_Role_Temp:payment_term= new payment_term();
payment_term_:payment_term= new payment_term();
payment_term:payment_term= new payment_term();
payment_term_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
search_payment_term_:string;
payment_term_Edit:boolean;
payment_term_Save:boolean;
payment_term_Delete:boolean;
constructor(public payment_term_Service_:payment_term_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(92);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.payment_term_Edit=this.Permissions.Edit;
this.payment_term_Save=this.Permissions.Save;
this.payment_term_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 320;
this.Clr_payment_term();
this.Search_payment_term();
// this.Load_payment_term();
this.Entry_View=false;
}


Create_New()
{
this.Entry_View = true;
this.Clr_payment_term();
}
Close_Click()
{
this.Entry_View = false;
this.Clr_payment_term();
}
trackByFn(index, item) 
{
return index;
}

 Clr_payment_term()
 {
this.payment_term_.payment_Term_ID=0;
this.payment_term_.Payment_Term_Description="";
this.payment_term_.Description="";
this.payment_term_.Caption="";
}



Search_payment_term()
{
this.issLoading=true;
this.payment_term_Service_.Search_payment_term(this.search_payment_term_).subscribe(Rows => {
this.payment_term_Data=Rows[0];
this.Total_Entries=this.payment_term_Data.length;
if(this.payment_term_Data.length==0)
{ 
const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
this.issLoading=false;
},
Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured !!',Type: "3" }});
})
this.payment_term_Service_.Search_payment_term('').subscribe(Rows => {
{
this.payment_term_Datas_ = Rows[0];
// this.Under_Role_Temp.payment_term_Id = 0;
// this.Under_Role_Temp.payment_term_Name = "Select";
// this.payment_term_Datas_.unshift(this.Under_Role_Temp);
// this.payment_term = this.payment_term_Datas_[0];
// //this.Role_Under_Data[0]=this.Under_Role_Temp;
// this.payment_term = this.payment_term_Datas_[0];

}
this.issLoading=false;
},
Rows => { 

this.issLoading=false;

})
}
  

Delete_payment_term(payment_term_Id,index)
{
 
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{

if(result=='Yes')
{
 
this.issLoading=true;
this.payment_term_Service_.Delete_payment_term(payment_term_Id).subscribe(Delete_status => {
   
//     Delete_status=Delete_status[0];
//    Delete_status=Delete_status[0].DeleteStatus_.data[0];
// if(Delete_status==1){

// this.payment_term_Data.splice(index, 1);
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
// this.Search_payment_term();
// }
// else
// {

// //this.payment_term_Data.splice(index, 1);

// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
// //this.Search_payment_term();
// }

debugger
if(Delete_status[0][0].DeleteStatus_>0){
    this.payment_term_Data.splice(this.EditIndex, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
    this.Search_payment_term();
    }else if(Number(Delete_status[0][0].DeleteStatus_)== -2)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Unable to delete: You are attempting to delete a Payment Term currently in use',Type:"3"}});
    }else{
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
Save_payment_term() {
    this.issLoading = true;
    this.payment_term_Service_.Save_payment_term(this.payment_term_).subscribe((Save_status: any) => {
        let savedId = 0;
        let actualData = Save_status;

        if (Save_status && Save_status.success === true && Save_status.data) {
            actualData = Save_status.data;
        }

        if (Array.isArray(actualData) && actualData[0] && actualData[0][0]) {
            savedId = Number(actualData[0][0].payment_Term_ID_ || actualData[0][0].payment_term_Id_ || 0);
        } else if (Array.isArray(actualData) && actualData[0]) {
            savedId = Number(actualData[0].payment_Term_ID_ || actualData[0].payment_term_Id_ || 0);
        }

        if (savedId > 0) {
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved Successfully', Type: "false" } });
            this.Search_payment_term();
            this.Clr_payment_term();
            this.Entry_View = false;
        } else if (savedId == -1) {
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Already Exists', Type: "2" } });
        } else {
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        }
        this.issLoading = false;
    }, error => {
        this.issLoading = false;
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    });
}
Edit_payment_term(payment_term_e:payment_term,index)
{   
   
this.Entry_View=true;
this.payment_term_=payment_term_e;
this.payment_term_=Object.assign({},payment_term_e);
 

}
}
