import { /**HttpClientModule,*/ HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { TestBed } from '@angular/core/testing';
//import { HttpClientTestingModule} from '@angular/common/http/testing';

@Injectable({
  providedIn: 'root'
})
export class CurrencyapidataService {

  constructor(private http:HttpClient) {}

  getcurrencydata(country1: string){
    let url = 'https://api.exchangerate.host/latest?base='+country1
    return this.http.get(url);
  }
}
/**
TestBed.configureTestingModule({
  imports: [
    HttpClientTestingModule,
    HttpClientModule
  ],
  providers: [CurrencyapidataService]
});
*/
