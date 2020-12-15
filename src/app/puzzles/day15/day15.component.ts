import { Component, OnInit } from '@angular/core';
import {NUMBERS} from './numbers';

@Component({
  selector: 'app-day15',
  templateUrl: './day15.component.html',
  styleUrls: ['./day15.component.scss']
})
export class Day15Component implements OnInit {

  numbers: any = NUMBERS;
  p1num: any;
  p2num: any;

  constructor() { }

  ngOnInit(): void {
    this.puzzle1();
    this.puzzle2();
  }

  puzzle1() {
    const maxNum = 2020;
    this.p1num = this.getLastNumber(maxNum);
    console.log(this.p1num);
  }

  puzzle2() {
    const maxNum = 30000000;
    this.p2num = this.getLastNumber(maxNum);
    console.log(this.p2num);
  }

  getLastNumber(maxNum) {
    const saidNums = new Map();
    this.numbers.slice(0, this.numbers.length - 1).forEach((n, i) => saidNums.set(n, i));

    let lastNum = this.numbers[this.numbers.length - 1];
    let j = this.numbers.length;

    while (j < maxNum) {
      let thisNum = 0;
      if (saidNums.has(lastNum)) {
        thisNum = (j - 1) - saidNums.get(lastNum);
      }
      saidNums.set(lastNum, j - 1);
      lastNum = thisNum;
      j++;
    }
    return lastNum;
  }

}
