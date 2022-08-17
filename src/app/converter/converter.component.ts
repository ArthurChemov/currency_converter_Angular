import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

import { CurrencyapidataService } from '../api-data/currencyapidata.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  public currjson: any = [];

  public curr1: string = 'UAH';
  public curr2: string = 'UAH';
  public result: string = '1';

  public currt1: string = '';
  public currt2: string = '';

  @ViewChild("select1") select1: ElementRef | any;
  @ViewChild("select2") select2: ElementRef | any;
  @ViewChild("money1") money1: ElementRef | any;
  @ViewChild("money2") money2: ElementRef | any;

  states = [
    { id: 1, name: 'UAH'},
    { id: 2, name: 'USD'},
    { id: 3, name: 'EUR'},
    { id: 4, name: 'GBP'}
  ];

  public _select1: FormGroup | any = new FormGroup({
    _select: new FormControl(this.curr1),
    _input: new FormControl()
  })

  public _select2: FormGroup | any = new FormGroup({
    _select: new FormControl(this.curr2),
    _input: new FormControl()
  })

  constructor(private currency: CurrencyapidataService) { }

  changecurr(value: string, flag: number){
    if(flag == 1) this.curr1 = value;
    else if(flag == 2) this.curr2 = value;
    this.convert();
  }

  swap(a: string, b: string){
    a = this.curr1;
    b = this.curr2;
    this._select1.controls['_select'].value = b;
    this._select2.controls['_select'].value = a;
    this.convert();
  }

  getValue(val: string, flag: number){
    var value : number = val as unknown as number;
    var result : number = this.result as unknown as number;
    if(flag == 1) {
      value *= result;
      val = value as unknown as string;
      if(val == "0") val = "";
      this.currt2 = val;
      this._select2.controls['_input'].value = val;
    } else if(flag == 2) {
      value /= result;
      val = value as unknown as string;
      if(val == "0") val = "";
      this.currt1 = val;
      this._select1.controls['_input'].value = val;
      //this.money1.nativeElement.value = val;
    }
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
      value = this._select1.controls['_input'].value;
      this.getValue(value, 1);
    })
  }

  ngOnInit(): void{
  }
}
