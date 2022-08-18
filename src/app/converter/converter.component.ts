import { Component, OnInit } from '@angular/core';
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

  public input1: string = '';
  public input2: string = '';

  public states: any[] = [
    { name: 'UAH'},
    { name: 'USD'},
    { name: 'EUR'},
    { name: 'GBP'}
    //and etc
  ];

  public _select1: FormGroup | any = new FormGroup({
    _select: new FormControl(this.curr1),
    _input: new FormControl(this.input1)
  })

  public _select2: FormGroup | any = new FormGroup({
    _select: new FormControl(this.curr2),
    _input: new FormControl(this.input2)
  })

  constructor(private currency: CurrencyapidataService) { }

  swap(a: string, b: string){
    this._select1.controls['_select'].setValue(b);
    this._select2.controls['_select'].setValue(a);
    this.convert();
  }

  getValue(val: string, flag: number){
    let value : number = val as unknown as number;
    let result : number = this.result as unknown as number;

    if(flag == 1) {
      value *= result;
      val = value as unknown as string;
      if(val == "0") val = "";
      this._select2.controls['_input'].setValue(val);
    } else if(flag == 2) {
      value /= result;
      val = value as unknown as string;
      if(val == "0") val = "";
      this._select1.controls['_input'].setValue(val);
    }
  }

  convert(){
    this.currency.getcurrencydata(this._select1.controls['_select'].value).subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      this.result = this.currjson.rates[this._select2.controls['_select'].value];
      this.getValue(this._select1.controls['_input'].value, 1);
    })
  }

  ngOnInit(): void{
  }
}
