import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders} from "@angular/common/http";
import {Config} from "./config";
import {Observable, throwError} from "rxjs/index";
import {catchError, retry, tap} from "rxjs/internal/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ConfigService {
  configURl = 'assets/config.json';

  constructor(private http: HttpClient) {}

  getConfig() {
    return this.http.get<Config>(this.configURl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  };

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configURl, {observe: 'response'}
    );
  };

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occuerd:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  };

}

