import { Component } from '@angular/core';
import {User} from "./user";
import {HttpService} from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  headers: string[];
  users: User[];
  user: User;

  newUser: User = {
    "id": 4,
    "name": "D",
    "age": 23
  };

  anotherUser: User = {
    "id": 5,
    "name": "",
    "age": 22
  };

  getUsers() {
    this.httpService.getUsers()
      .subscribe((data: User[]) => this.users = data);
  }

  getUser() {
    this.httpService.getUser(this.newUser.id)
    .subscribe((data: User) => this.user = data);
  }

  addUser() {
    this.httpService.addUser(this.newUser)
      .subscribe(user => this.users.push(user));
  }

  deleteUser() {
    this.httpService.deleteUser(this.newUser.id).subscribe();
  }

  updateUser() {
    this.httpService.updateUser(this.newUser.id, this.anotherUser).subscribe();
  }

  constructor(private httpService: HttpService) {}
}
