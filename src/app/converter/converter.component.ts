import { Component, OnInit } from '@angular/core';

import { CurrencyapidataService } from '../api-data/currencyapidata.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  currjson: any = [];

  curr1 = "UAH";
  curr2 = "UAH";
  result: string = '1';

  constructor(private currency: CurrencyapidataService) { }

  changecurr1(a: string){
    this.curr1 = a;
    this.convert();
  }

  changecurr2(b: string){
    this.curr2 = b;
    this.convert();
  }

  swap(a: string, b: string){
    a = this.curr1;
    b = this.curr2;
    (document.getElementById("rate1") as HTMLInputElement).value = b;
    (document.getElementById("rate2") as HTMLInputElement).value = a;
    this.curr2 = a;
    this.curr1 = b;
    this.convert();
  }

  convert(){
    this.currency.getcurrencydata(this.curr1).subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      if(this.curr2 == 'UAH')this.result = this.currjson.rates.UAH
      if(this.curr2 == 'USD')this.result = this.currjson.rates.USD
      if(this.curr2 == 'EUR')this.result = this.currjson.rates.EUR
      if(this.curr2 == 'GBP')this.result = this.currjson.rates.GBP
      var value: string;
      value = (document.getElementById("money1") as HTMLInputElement).value;
      this.getValue1(value);
    })
  }

  getValue1(val: string){
    var value : number = val as unknown as number;
    var result : number = this.result as unknown as number;
    value *= result;
    val = value as unknown as string;
    if(val == "0"){
      val = "";
      (document.getElementById("money2") as HTMLInputElement).value=val;
    } else(document.getElementById("money2") as HTMLInputElement).value=val;
  }

  getValue2(val: string){
    var value : number = val as unknown as number;
    var result : number = this.result as unknown as number;
    value /= result;
    val = value as unknown as string;
    if(val == "0"){
      val = "";
      (document.getElementById("money1") as HTMLInputElement).value=val;
    } else(document.getElementById("money1") as HTMLInputElement).value=val;
  }

  ngOnInit(): void {
  }
}
