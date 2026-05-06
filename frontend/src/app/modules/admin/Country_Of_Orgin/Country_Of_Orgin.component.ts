import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { country } from '../../../models/country';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { country_Service } from '../../../services/country.Service';
@Component({
selector: 'app-Country_Of_Orgin',
templateUrl: './Country_Of_Orgin.component.html',
styleUrls: ['./Country_Of_Orgin.component.css']
})
export class Country_Of_OrginComponent implements OnInit {
Country_Data:country[]
Under_Temp:country= new country();
Country_:country= new country();

Country_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
search_Country_Name:string;
search_Country_Of_Orgin_ : string;
Country_Of_Orgin_Edit:boolean;
Country_Of_Orgin_Save:boolean;
Country_Of_Orgin_Delete:boolean;
constructor(public country_Service:country_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(94);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Country_Of_Orgin_Edit=this.Permissions.Edit;
this.Country_Of_Orgin_Save=this.Permissions.Save;
this.Country_Of_Orgin_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 320;
this.Clr_Country();
this.search_Country();
// this.Load_Country_Of_Orgin();
this.Entry_View=false;
}

Create_New()
{
this.Entry_View = true;
this.Clr_Country();
}
Close_Click()
{
this.Entry_View = false;
this.Clr_Country();
}
trackByFn(index, item) 
{
return index;
}
 Clr_Country()
 {
this.Country_.Country_Id=0;
this.Country_.Country_Name="";
}
search_Country()
{
this.issLoading=true;
debugger
this.country_Service.Search_country(this.search_Country_Of_Orgin_).subscribe(Rows => {
this.Country_Data=Rows[0];
this.Total_Entries=this.Country_Data.length;
if(this.Country_Data.length==0)
{ 
const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
this.issLoading=false;
},
Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured !!',Type: "3" }});
})

}
Delete_Country_Of_Orgin(Country_Id,index)
{
 
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{

if(result=='Yes')
{
 
this.issLoading=true;
this.country_Service.Delete_country(Country_Id).subscribe(Delete_status => {
   
    Delete_status=Delete_status[0];
   Delete_status=Delete_status[0].DeleteStatus_.data[0];
if(Delete_status==1){

this.Country_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
this.search_Country();
}
else
{

//this.Country_Of_Orgin_Data.splice(index, 1);

const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
//this.Search_Country_Of_Orgin();
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
Save_Country_Of_Orgin()
{
     
   
    if (this.Country_.Country_Name == undefined ||this.Country_.Country_Name == null || this.Country_.Country_Name == "") {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Country Of Orgin ', Type: "3" } });
    } 
    
else
{
    console.log("Before Country Of Origin Save API call");
    this.issLoading = true;

    this.country_Service.Save_country(this.Country_)
    .pipe(
      finalize(() => {
        console.log("Country Of Origin Save Finalize executed");
        this.issLoading = false;
        const saveButton = document.getElementById("Save_Button");
        if (saveButton) saveButton.hidden = false;
      })
    )
    .subscribe({
      next: (Save_status) => {
        console.log("Country Of Origin Save API Response:", Save_status);
        
        if (!Save_status || !Save_status[0]) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Invalid server response', Type: "2" }
          });
          return;
        }

        const resultId = Number(Save_status[0][0].Country_Id_);
        if (resultId > 0) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Saved Successfully', Type: "false" }
          });
          this.search_Country();
          this.Clr_Country();
        } else if (resultId == -1) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Country Name Already Exists', Type: "2" }
          });
        } else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Error Occured', Type: "2" }
          });
        }
      },
      error: (error) => {
        console.error("Country Of Origin Save API ERROR:", error);
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
        });
      }
    });
}
}
Edit_Country_Of_Orgin(Country_e:country,index)
{   
   
this.Entry_View=true;
this.Country_=Country_e;
this.Country_=Object.assign({},Country_e);

}
}
