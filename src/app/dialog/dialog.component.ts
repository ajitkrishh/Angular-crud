import { formatDate } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  price: number;
  date: string
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  firstName: string = '';
  lastName: string = '';
  formdata: DialogData;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formdata = data;
    if (this.formdata.date !== undefined) {

      this.formdata.date = formatDate(data.date, "yyyy-MM-dd", "en");
    }
    console.log(this.formdata);


  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// ------------------------------------------------------------------------


// @Component({
//   template: `
//  <h1 mat-dialog-title>
//  Fill Fruit Details
//  </h1>
//  <div mat-dialog-content>
//  <mat-form-field>
//  <input placeholder="Name" matInput [(ngModel)]="data.name">
//  </mat-form-field><br>
//  <mat-form-field>
//  <input placeholder="Price" matInput [(ngModel)]="data.price">
//  </mat-form-field>
//  </div>
//  <div mat-dialog-content>
//  <mat-form-field>
//    <input matInput type="date" placeholder="Enter Date" formControlName="date" id="mydate"> </mat-form-field><br>
//   </mat-form-field>
//  </div>
//  <div mat-dialog-actions>
//  <button mat-button [mat-dialog-close]="data">Submit</button>
//  <button mat-button (click)="onNoClick()">Close</button>
//  </div>
// // })
// export class DialogWithFormComponent {

//  firstName: string = '';
//  lastName: string = '';

//  constructor(
//  public dialogRef: MatDialogRef<DialogWithFormComponent>,
//  @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

//  onNoClick(): void {
//  this.dialogRef.close();
//  }
// }