import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Response {
  time: {
    updated: string;
  };
  disclaimer: string;
  bpi: {
    USD: {
      symbol: string;
      description: string;
      rate_float: number;
      rate: string;
    };
    BRL: {
      symbol: string;
      description: string;
      rate_float: number;
      rate: string;
    };
  };
}

interface PriceUpdate {
  timestamp: Date;
  USD: number;
  BRL: number;
}


@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.component.html',
  styleUrls: ['./bitcoin.component.css']
})
export class BitcoinComponent implements OnInit {

  currentPrice: Response;
  lastUpdate: Date;

  updateList: Array<PriceUpdate> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.update();
  }

  update() {
    this.http.get('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
    .subscribe(data => {
      this.lastUpdate = new Date();
      this.currentPrice = data;
      this.updateList.push({
        timestamp: this.lastUpdate,
        USD: this.currentPrice.bpi.USD.rate_float,
        BRL: this.currentPrice.bpi.BRL.rate_float,
      });
    });
  }
}