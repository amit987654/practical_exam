import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = 'http://45.79.111.106/interview.json';
  constructor(private http: HttpClient) { }

  getJsonData(): Observable<any> {
    return this.http.get(this.url);
  }

}
