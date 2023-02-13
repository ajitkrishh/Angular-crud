import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public static isloggedin = false;
  // public static isloggedin = true;
  title = 'advCrud';
  public static userlist = [
    {
      "username": "ajit",
      "password" : "234#2df"
    },
    {
      "username": "admin",
      "password" : "123456"
    },
    {
      "username": "user",
      "password" : "123456"
    },
    
  ];

  static Allfruits: Fruit[] = [
    {
      "id": 2,
      "name": "3wdesw",
      "price": 245,
      'date': new Date(2002,10,1)
    },
    {
      "id": 3,
      "name": "3wdesw",
      "price": 245,
      'date': new Date(2002,10,1)
    },
    {
      "id": 5,
      "name": "new fruit",
      "price": 5454,
      'date': new Date(2002,10,1)
    },
    {
      "id": 6,
      "name": "cacc",
      "price": 909,
      'date': new Date(2002,10,1)
    }
  ];

}
export interface Fruit{
  id:number,
  name:string,
  price:number,
  date:Date
}
