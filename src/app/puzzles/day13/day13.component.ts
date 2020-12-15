import { Component, OnInit } from '@angular/core';
import {EXAMPLE, SCHEDULE} from './schedule';

@Component({
  selector: 'app-day13',
  templateUrl: './day13.component.html',
  styleUrls: ['./day13.component.scss']
})
export class Day13Component implements OnInit {

  schedule: any = EXAMPLE;
  p1num: any;

  constructor() { }

  ngOnInit(): void {
    this.puzzle1();
    this.puzzle2();
  }

  puzzle1() {
    const arrival = this.schedule[0];
    const buses = this.schedule[1].split(',');
    const activeBuses = [];
    const allTimesUntil = [];
    buses.forEach(bus => {
      if (bus !== 'x') {
        activeBuses.push(bus);
      }
    });

    activeBuses.forEach(bus => {
      const div = Math.floor(arrival / bus);
      const nextTime = (div + 1) * parseInt(bus, 0);
      const timeUntil = nextTime - arrival;
      // console.log(bus, timeUntil, bus * timeUntil);

      allTimesUntil.push([bus, timeUntil]);
    });
    allTimesUntil.sort((a, b) => a[1] - b[1]);
    this.p1num = allTimesUntil[0][0] * allTimesUntil[0][1];


    console.log(this.p1num);
  }

  puzzle2() {

    const schedule = this.schedule[1].split(',');

    console.log(Number(this.main2(this.schedule)));


  }

  main2 = (data) => {
    const [time, buses] = [data[0], data[1].split(',').map(val => Number(val) ? BigInt(val) : 'x')];
    const pairs = buses.map((elm, i) => {
      if (typeof(elm) === 'bigint') return [elm, BigInt(i)];
    }).filter(elm => elm)
    let N = 1n;
    pairs.forEach(pair => N *= pair[0]);
    const Ni = pairs.map(pair => N / pair[0]);
    const b = pairs.map((pair, i) => i === 0 ? 0n : pair[0] - pair[1] );
    const x = pairs.map((item, i) => this.modInverse(Ni[i], item[0]));
    const bnx = Ni.map((item, i) => item * b[i] * x[i]);
    const sum = bnx.reduce((acc, cur) => acc + cur);
    return sum - (sum / N) * N
  };

  modInverse = (a, m) => {
    const g = this.gcd(a, m);

    if (g !== 1n){
      console.log('No Inverse');
    } else {
      return this.power(a, m - 2n, m);
    }
  }

  power = (x, y, m) => {
    if ( y === 0n) return 1n;

    let p = this.power(x, y / 2n, m) % m;
    p = (p * p) % m;

    if ( y % 2n === 0n) return p;
    else return ((x * p) % m);
  }

  gcd = (a, b) => {
    if (a === 0n) return b;
    return this.gcd(b % a, a);
  }
  //   const schedule = this.schedule[1].split(',');
  //   let loop = true;
  //   let time = 100000000000000;
  //   console.log('start day 13', time);
  //   // while (loop) {
  //     console.log(time);
  //     const numArr = [];
  //     const xArr = [];
  //     schedule.forEach((s, j) => {
  //       if (s !== 'x') {
  //         const num = (time + j) / s;
  //         if ((time + j) % s === 0) {
  //           numArr.push(num);
  //         }
  //       } else {
  //         xArr.push('x');
  //       }
  //     });
  //     if (numArr.length === schedule.length - xArr.length) {
  //       console.log(numArr);
  //       console.log(numArr[0] * schedule[0]);
  //       loop = false;
  //     } else {
  //       time++;
  //     }
  //   // }
  // }
}

/*

  7 * N = X - (8 - (0 + 1))               =>          7 * 152,684 = 1068788 - 7
  N = X / 7 - 7

  152677 = X / 7 - 7

  (N + (8 - (0 + 1)) * 7  = X
  (N + (8 - (1 + 1)) * 13 = X
  (N + (8 - (4 + 1)) * 59 = X
  (N + (8 - (6 + 1)) * 31 = X
  (N + (8 - (7 + 1)) * 19 = X

  time = 1068781

  (1068781 + 0) / 7 = 152683; =>
  (1068781 + 1) / 13 = 82214;
  (1068781 + 4) / 59 = 18115;
  (1068781 + 6) / 31 = 34477;
  (1068781 + 7) / 19 = 56252;


 */
