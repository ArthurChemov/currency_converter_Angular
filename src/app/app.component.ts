import { Component } from '@angular/core';
import { CurrencyapidataService } from './currencyapidata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currency_converter_AngularJS';
  currjson: any = [];
  base = "UAH";
  cont2 = "UAH";
  result: string = '1';

  _usd = 0;
  _eur = 0;
  _gbp = 0;

  constructor(private currency: CurrencyapidataService){
    currency.getcurrencydata("USD").subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      this._usd = this.currjson.rates.UAH
    })
    currency.getcurrencydata("EUR").subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      this._eur = this.currjson.rates.UAH
    })
    currency.getcurrencydata("GBP").subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      this._gbp = this.currjson.rates.UAH
    })
  }

  convert(){
    this.currency.getcurrencydata(this.base).subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      if(this.cont2 == 'UAH')this.result = this.currjson.rates.UAH
      if(this.cont2 == 'USD')this.result = this.currjson.rates.USD
      if(this.cont2 == 'EUR')this.result = this.currjson.rates.EUR
      if(this.cont2 == 'GBP')this.result = this.currjson.rates.GBP
      var val: string;
      val = (document.getElementById("money1") as HTMLInputElement).value;
      this.getValue1(val);
    })
  }

  changebase(a: string){
    this.base = a;
    this.convert();
  }

  tocountry(b: string){
    this.cont2 = b;
    this.convert();
  }

  swap(a: string, b: string){
    a = this.base;
    b = this.cont2;
    (document.getElementById("county1") as HTMLInputElement).value = b;
    (document.getElementById("county2") as HTMLInputElement).value = a;
    this.cont2 = a;
    this.base = b;
    this.convert();
  }

  getValue1(val:string){
    var val1 : number = val as unknown as number;
    var result1 : number = this.result as unknown as number;
    val1 *= result1;
    val = val1 as unknown as string;
    if(val == "0"){
      val = "";
      (document.getElementById("money2") as HTMLInputElement).value=val;
    } else(document.getElementById("money2") as HTMLInputElement).value=val;
  }

  getValue2(val:string){
    var val1 : number = val as unknown as number;
    var result1 : number = this.result as unknown as number;
    val1 /= result1;
    val = val1 as unknown as string;
    console.log(val);
    if(val == "0"){
      val = "";
      (document.getElementById("money1") as HTMLInputElement).value=val;
    } else(document.getElementById("money1") as HTMLInputElement).value=val;
  }
}
