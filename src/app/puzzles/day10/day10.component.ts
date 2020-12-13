import { Component, OnInit } from '@angular/core';
import {ADAPT} from './adaptors';

@Component({
  selector: 'app-day10',
  templateUrl: './day10.component.html',
  styleUrls: ['./day10.component.scss']
})
export class Day10Component implements OnInit {

  adapt: any = ADAPT;
  p1num: any;
  p2num: any;





  constructor() { }

  ngOnInit(): void {
    const adaptors = this.cloneArray(this.adapt);
    adaptors.sort((a, b) => a - b);
    adaptors.unshift(0);
    adaptors.push(this.adapt[this.adapt.length - 1] + 3);

    this.puzzle1(adaptors);
    this.puzzle2();


  }

  puzzle1(adaptors) {
    let count3 = 0;
    let count1 = 0;
    adaptors.forEach((a, i) => {
      const b = adaptors[i - 1];
      count1 = (a - b === 1) ? count1 + 1 : count1;
      count3 = (a - b === 3) ? count3 + 1 : count3;
    });
    this.p1num = (count1 * count3);
    console.log(count3, count1, this.p1num);
  }

  puzzle2() {
    this.adapt.sort((a, b) => a - b);
    const gaps = this.adapt.map((adapter, index) =>
      index > 0 ? adapter - this.adapt[index - 1] : adapter
    );
    console.log(this.adapt);
    console.log(gaps);
    const oneJoltAdapterGroups = gaps
      .join('')
      .split('3')
      .filter((group) => group.length > 0)
      .map((group) => group.length);

    const adapterCombinations = (groupSize: number) => {
      if (groupSize === 1) return 1;
      return groupSize - 1 + adapterCombinations(groupSize - 1);
    };

    console.log('Answer:', oneJoltAdapterGroups.reduce((a, b) => (a *= adapterCombinations(b)), 1));
  }

  cloneArray(arr) {
    const newArr = [];
    arr.forEach(a => {
      newArr.push(a);
    });
    return newArr;
  }







}
