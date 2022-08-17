import { Component, OnInit } from '@angular/core';

import { CurrencyapidataService } from '../api-data/currencyapidata.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {
  public currjson: any = [];

  public usd: number = 0;
  public eur: number = 0;
  public gbp: number = 0;

  constructor(private currency: CurrencyapidataService){
    currency.getcurrencydata("USD").subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      this.usd = this.currjson.rates.UAH
    })
    currency.getcurrencydata("EUR").subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      this.eur = this.currjson.rates.UAH
    })
    currency.getcurrencydata("GBP").subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      this.gbp = this.currjson.rates.UAH
    })
  }

  ngOnInit(): void {
  }
}
