import { Component, OnInit, AfterViewInit, ViewChild, DoCheck, Inject, AfterContentInit } from '@angular/core';
import { AppComponent, Fruit } from '../app.component';
import { Route, Router } from '@angular/router';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { Type } from '@angular/compiler';
import { formatDate } from '@angular/common';


let DialogData = {};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {

  user = "ajit"
  isLoggedin = false;
  displayedColumns: string[] = ['id', 'name', 'price', 'date', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Fruit>(AppComponent.Allfruits);
  id = 10;
  formdailog: MatDialogRef<DialogComponent> | null = null;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;


  constructor(private _router: Router, private dialogModel: MatDialog) { }


  ngOnInit(): void {
    this.isLoggedin = AppComponent.isloggedin;
    if (!this.isLoggedin) {
      this._router.navigate(['/login']);
    }
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }
  logout() {
    AppComponent.isloggedin = false;
    this._router.navigate(['/login']);
  }
  edit(id: number) {
    DialogData = { ...this.dataSource.filteredData.filter(_ => _.id == id)[0] }
    const formdialog = this.dialogModel.open(DialogComponent, { data: DialogData });

    formdialog.afterClosed().subscribe(result => {
      if (result != undefined) {
        result['id'] = id;

        result.date = new Date(result.date)
        console.log(result);
        for (let i in AppComponent.Allfruits) {
          if (AppComponent.Allfruits[i].id === id) {
            AppComponent.Allfruits[i] = result;
            break;
          }
        }
        this.update();
      }

      DialogData = {};


    })
  }
  add() {
    console.log(this.id);

    const formdialog = this.dialogModel.open(DialogComponent, { data: DialogData });

    formdialog.afterClosed().subscribe(result => {
      if (result != undefined) {
        result['id'] = this.id;
        result.date = new Date(result.date)
        AppComponent.Allfruits.push({ ...result });
        this.id++;
        this.update();
      }
      DialogData = {};
    })
  }
  delete(id: number) {
    AppComponent.Allfruits = AppComponent.Allfruits.filter(_ => _.id != id);
    this.update();
  }
  searchfruit(target: any) {
    let searchStr: string = target.value;
    console.log(searchStr);

    if (searchStr.length > 2) {
      console.log(searchStr, "from insie");
      this.dataSource.filter = searchStr.trim().toLocaleLowerCase();
    } else {
      this.dataSource.filter = "";
      this.update();
    }

  }
  update() {
    this.dataSource = new MatTableDataSource<Fruit>(AppComponent.Allfruits);
    this.ngAfterViewInit();
  }
  formatDatee(date: any) {
    return formatDate(date, "yyyy-MM-dd", "en");
  }


}
