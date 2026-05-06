import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Item_Group_Service } from '../../../services/Item_Group.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Item_Group } from '../../../models/Item_Group';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Item_Group',
templateUrl: './Item_Group.component.html',
styleUrls: ['./Item_Group.component.css']
})
export class Item_GroupComponent implements OnInit {
Item_Group_Data:Item_Group[]
Item_Group_Datas_:Item_Group[]
Under_Role_Temp:Item_Group= new Item_Group();
Item_Group_:Item_Group= new Item_Group();
Item_Group:Item_Group= new Item_Group();
Item_Group_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
search_Item_Group_:string;
Item_Group_Edit:boolean;
Item_Group_Save:boolean;
Item_Group_Delete:boolean;
constructor(public Item_Group_Service_:Item_Group_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(6);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Item_Group_Edit=this.Permissions.Edit;
this.Item_Group_Save=this.Permissions.Save;
this.Item_Group_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 320;
this.Clr_Item_Group();
this.Search_Item_Group();
// this.Load_Item_Group();
this.Entry_View=false;
}


Create_New()
{
this.Entry_View = true;
this.Clr_Item_Group();
}
Close_Click()
{
this.Entry_View = false;
this.Clr_Item_Group();
}
trackByFn(index, item) 
{
return index;
}

 Clr_Item_Group()
 {
this.Item_Group_.Item_Group_Id=0;
this.Item_Group_.Item_Group_Code="";
this.Item_Group_.Item_Group_Name="";
// this.Item_Group_.UnderGroupId=0;
// this.Item_Group=null;
if( this.Item_Group_Datas_!=undefined &&  this.Item_Group_Datas_!=null)
this.Item_Group= this.Item_Group_Datas_[0];

}


// Load_Item_Group() 
//         {
//              
//         this.Item_Group_Service_.Load_Item_Group().subscribe(Rows => {
//        this.Item_Group_Datas_ = Rows[0];
     
//         },
//         Rows => 
//         {
//        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         });
//         }

Search_Item_Group()
{
this.issLoading=true;
this.Item_Group_Data=[];
this.Item_Group_Service_.Search_Item_Group(this.search_Item_Group_).subscribe(Rows => {
    debugger;
this.Item_Group_Data=Rows[0];
this.Total_Entries=this.Item_Group_Data.length;
if(this.Item_Group_Data.length==0)
{ 
const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
this.issLoading=false;
},
Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured !!',Type: "3" }});
})

// this.Item_Group_Service_.Search_Item_Group('').subscribe(Rows => {
// {
// this.Item_Group_Datas_ = Rows[0];
// this.Under_Role_Temp.Item_Group_Id = 0;
// this.Under_Role_Temp.Item_Group_Name = "Select";
// this.Item_Group_Datas_.unshift(this.Under_Role_Temp);
// this.Item_Group = this.Item_Group_Datas_[0];
// this.Item_Group = this.Item_Group_Datas_[0];
// }
// this.issLoading=false;
// },
// Rows => { 
// this.issLoading=false;
// })

}
  

// Search_Item_Group()
// {
//      
// this.issLoading=true;
// if(this.search_Item_Group_==undefined)
// this.search_Item_Group_="";
//  
// this.Item_Group_Service_.Search_Item_Group(this.search_Item_Group_).subscribe(Rows => {
//   
//  this.Item_Group_Data=Rows[0];
// //this.Item_Group_Datas_=Rows[0];
// this.issLoading=false;
// this.Total_Entries=this.Item_Group_Data.length;
// if(this.Item_Group_Data.length==0)
// {
// const dialogRef = this.dialogBox.open
// ( DialogBox_Component, {panelClass:'Dialogbox-Class'
// ,data:{Message:'No Details Found',Type: "3" }});
// }
//  },
//  Rows => { 
// this.issLoading=false;
//const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); 
//  });
//}
Delete_Item_Group(Item_Group_Id,index)
{
 
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{

if(result=='Yes')
{
 
this.issLoading=true;
this.Item_Group_Service_.Delete_Item_Group(Item_Group_Id).subscribe(Delete_status => {
   
    Delete_status=Delete_status[0];
   Delete_status=Delete_status[0].DeleteStatus_.data[0];
if(Delete_status==1){

this.Item_Group_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
this.Search_Item_Group();
}
else
{

//this.Item_Group_Data.splice(index, 1);

const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
//this.Search_Item_Group();
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
Save_Item_Group()
{
     
   
    if (this.Item_Group_.Item_Group_Name == undefined ||this.Item_Group_.Item_Group_Name == null || this.Item_Group_.Item_Group_Name == "") {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Item Group ', Type: "3" } });
    } 
    // else if(this.Item_Group == undefined ||this.Item_Group == null || this.Item_Group.Item_Group_Id == 0||this.Item_Group==undefined)  
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The Under Group', Type: "3" } });
    // } 
    console.log("Before Item Group Save API call");
    this.issLoading = true;
    this.Item_Group_.UnderGroupId = this.Item_Group.Item_Group_Id;

    this.Item_Group_Service_.Save_Item_Group(this.Item_Group_)
    .pipe(
      finalize(() => {
        console.log("Item Group Save Finalize executed");
        this.issLoading = false;
        const saveButton = document.getElementById("Save_Button");
        if (saveButton) saveButton.hidden = false;
      })
    )
    .subscribe({
      next: (Save_status) => {
        console.log("Item Group Save API Response:", Save_status);
        
        if (!Save_status || !Save_status[0]) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Invalid server response', Type: "2" }
          });
          return;
        }

        const resultId = Number(Save_status[0][0].Item_Group_Id_);
        if (resultId > 0) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Saved Successfully', Type: "false" }
          });
          this.Search_Item_Group();
          this.Clr_Item_Group();
        } else if (resultId == -1) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Item Group Already Exists', Type: "2" }
          });
        } else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Error Occured', Type: "2" }
          });
        }
      },
      error: (error) => {
        console.error("Item Group Save API ERROR:", error);
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
        });
      }
    });
}
Edit_Item_Group(Item_Group_e:Item_Group,index)
{   
   
this.Entry_View=true;
this.Item_Group_=Item_Group_e;
this.Item_Group_=Object.assign({},Item_Group_e);
 
for (var i = 0; i < this.Item_Group_Datas_.length; i++) {
    if (Item_Group_e.UnderGroupId == this.Item_Group_Datas_[i].Item_Group_Id)
    this.Item_Group = this.Item_Group_Datas_[i];

}
}
}
