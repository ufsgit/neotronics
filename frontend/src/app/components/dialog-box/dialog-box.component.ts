import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent implements OnInit {

  message: any;
  showNo: boolean;
  Heading: string;
  NoButton: String;
  YesButton: String;
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = this.cleanMessage(data.Message);
    this.showNo = data.Type;
    if (this.showNo === false) {
      this.NoButton = 'No';
      this.YesButton = 'OK';
    } else {
      this.NoButton = 'No';
      this.YesButton = 'Yes';
    }
    this.Heading = data.Heading;
    if (!this.Heading) {
      this.Heading = '';
    }
  }
  cleanMessage(message: any): any {
    if (typeof message !== 'string') {
      return message;
    }
    return message
      .replace(/^(ADAT|NEOTRONICS)\s+Save(d)?\s+Successfull(y)?$/i, 'Saved Successfully')
      .replace(/^(ADAT|NEOTRONICS)\s+Saved\s+Successfully$/i, 'Saved Successfully');
  }
  onNoClick(): void {
    this.dialogRef.close('No');
  }
  onYesClick(): void {
    this.dialogRef.close('Yes');
  }
  ngOnInit() {
  }
}
