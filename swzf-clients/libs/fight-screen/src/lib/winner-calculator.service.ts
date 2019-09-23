import { Injectable } from '@angular/core';
import {People} from "@swzf-clients/swzf-ui";

@Injectable({
  providedIn: 'root'
})
export class WinnerCalculatorService {

  constructor() { }

  calculateWinner(left: People, right: People): People {
      if ( Math.floor(Math.random() * 2) === 1 ) {
          return right;
      }
      return left;
  }
}
