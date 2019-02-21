import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DividaService {

  constructor(private http: HttpClient) { }

  consultarDividas(): Promise<any>{
    return this.http.get('http://localhost:8091/debitos')
    .toPromise()
    .then(response => {
       return response;
    });
  }

}
