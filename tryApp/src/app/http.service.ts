import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {catchError, retry, tap} from "rxjs/internal/operators";
import {User} from "./user";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class HttpService {
  getUrl = 'http://localhost:8080/users';
  postUrl = 'http://localhost:8080/users/add';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.getUrl)
  };

  getUser(id: number) {
    const url = `${this.getUrl}/${id}`;
    return this.http.get<User>(url)
  };


  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.postUrl, user, httpOptions)
  };

  deleteUser(id: number): Observable<{}> {
    const url = `${this.getUrl}/${id}`;
    return this.http.delete(url, httpOptions)
  };

  updateUser (id: number, user: User): Observable<User> {
    const url = `${this.getUrl}/${id}`;
    return this.http.put<User>(url, user, httpOptions);
  }

}

