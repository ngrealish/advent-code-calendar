import { Component, OnInit } from '@angular/core';
import {NUMBERS} from './numbers';

@Component({
  selector: 'app-day9',
  templateUrl: './day9.component.html',
  styleUrls: ['./day9.component.scss']
})
export class Day9Component implements OnInit {

  numbers: any = NUMBERS;

  p1num: any;
  p2num: any;

  constructor() { }

  ngOnInit(): void {
    this.puzzle1();
    this.puzzle2();
  }

  puzzle1() {
    for (let i = 0; i < this.numbers.length; i++) {
      const num = this.numbers[i];
      if (i >= 25) {
        const pre = this.numbers.slice(i - 25, i);
        if (!this.checkSums(pre, num)) {
          console.log(num);
          i = this.numbers.length + 1;
          this.p1num = num;
        }
      }
    }
  }

  puzzle2() {
    for (let i = 0; i < this.numbers.length; i++) {
      // add this number to all of the next numbers until the sum is equal to or greater than p1num;
      const num = this.numbers[i];
      let sum = num;
      let j = 1;
      while (sum <= this.p1num) {
        sum += this.numbers[i + j];
        j++;
        if (sum === this.p1num) {
          console.log('FOUND IT', sum, i, i + j);
          let newArr = [];
          this.numbers.forEach((n, ind) => {
            if (ind >= i && ind <= i + j) {
              newArr.push(n);
            }
          });
          newArr = newArr.sort((a, b) => a - b);
          console.log('Add', newArr[0], newArr[newArr.length - 1]);
          this.p2num = newArr[0] + newArr[newArr.length - 1];
        }
      }
    }
  }

  checkSums(pre, num) {
    for (let i = 0; i < pre.length; i++) {
      const p = pre[i];
      for (let j = 0; j < pre.length; j++) {
        const q = pre[j];
        if (i !== j) {
          if (p + q === num) {
            j = pre.length + 1;
            i = pre.length + 1;
            return true;
          }
        }
      }
    }
  }
}
