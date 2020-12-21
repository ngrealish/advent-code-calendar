import { Component, OnInit } from '@angular/core';
import {EXAMPLES, PROBLEMS} from './problems';

@Component({
  selector: 'app-day18',
  templateUrl: './day18.component.html',
  styleUrls: ['./day18.component.scss']
})
export class Day18Component implements OnInit {

  problems: any = EXAMPLES;
  p1num: any = 0;
  p2num: any = 0;

  constructor() {

  }

  ngOnInit(): void {
    // this.puzzle1();
    this.puzzle2();
  }

  puzzle1() {
    this.problems.forEach(problem => {
      console.log(' ', problem);
      const parts = this.splitProblem(problem);
      this.replaceParens(1, parts);
    });
    console.log('P1 Solution', this.p1num);
  }

  puzzle2() {
    this.problems.forEach(problem => {
      console.log(' ');
      console.log(problem);
      const parts = this.splitProblem(problem);
      this.replaceParens(1, parts);
    });
    console.log('P2 Solution', this.p2num);
  }

  splitProblem(problem) {
    const newProblemArr = [];
    problem = problem.split( ' ');
    problem.forEach(part => {
      if (part.includes('(')) {
        part.split('(').forEach(piece => {
          if (piece === '') {
            newProblemArr.push('(');
          } else {
            newProblemArr.push(piece);
          }
        });
      }
      else if (part.includes(')')) {
        part.split(')').forEach(piece => {
          if (piece === '') {
            newProblemArr.push(')');
          } else {
            newProblemArr.push(piece);
          }
        });
      }
      else {
        newProblemArr.push(part);
      }

    });
    newProblemArr.forEach((part, i) => {
      if (!isNaN(part)) {
        newProblemArr[i] = parseInt(part, 0);
      }
    });
    return newProblemArr;
  }

  replaceParens(puz, parts) {
    const starts = [];
    const ends = [];

    for (let i = 0; i < parts.length; i++){
      const part = parts[i];
      if (parts[i] === '(') {
        starts.push(i);
      }
      if (parts[i] === ')') {
        ends.push(i);
      }
    }
    // console.log('all starts and ends', starts, ends);

    if (starts.length > 0 && ends.length > 0) {
      // If it can keep going, do this.
      let newProblemArr = [];
      for (let i = 0; i < starts.length; i++) {
        for (let j = 0; j < ends.length; j++) {
          const thisStart = starts[i];
          const nextStart = (starts[i + 1]) ? starts[i + 1] : ends[j] + 1;
          const thisEnd = ends[j];
          // console.log(thisStart, nextStart, thisEnd);
          if (thisEnd < nextStart) {
            const solution = (puz === 1) ? this.newOOO(parts, thisStart + 1, thisEnd) : this.newOOO2(parts, thisStart + 1, thisEnd);
            const before = parts.slice(0, thisStart);
            const after = parts.slice(thisEnd + 1, parts.length);
            newProblemArr = before.concat(solution, after);
            this.replaceParens(puz, newProblemArr);
            i = starts.length + 1;
            j = ends.length + 1;
          } else {
            j = ends.length + 1;
          }
        }
      }
    } else {
      console.log('Final Solution for part 2', this.newOOO2(parts, 0, parts.length));
      console.log(' ');
      this.p1num += this.newOOO(parts, 0, parts.length);
      this.p2num += this.newOOO2(parts, 0, parts.length);
    }
  }

  newOOO(parts, start, end) {
    const doMath = parts.slice(start, end);
    let final = 0;
    doMath.forEach((part, i) => {
      if (i === 0) {
        final = parseInt(part, 0);
      } else if (part === '+') {
        final = final + parseInt(doMath[i + 1], 0);
      } else if (part === '*') {
        final = final * parseInt(doMath[i + 1], 0);
      }
    });
    // console.log('do math', doMath, '=', final);
    return final;
  }

  newOOO2(parts, start, end) {
    const doMath = parts.slice(start, end);
    console.log('do math on', doMath);

    // Go through the array and look for + first
    let loop = true;
    while (loop) {
    // Loop this
      let val = 0;
      if (doMath.indexOf('+') > 0) {
        val = doMath[doMath.indexOf('+') - 1] + doMath[doMath.indexOf('+') + 1];
        console.log(doMath[doMath.indexOf('+') - 1], '+', doMath[doMath.indexOf('+') + 1], '=', val);
        doMath.splice(doMath.indexOf('+') - 1, 3, val);
        console.log(val, 'Added', doMath);
      }
      else if (doMath.indexOf('*') > 0) {
        val = doMath[doMath.indexOf('+') - 1] * doMath[doMath.indexOf('+') + 1];
        doMath.splice(doMath.indexOf('*') - 1, 3, val);
        console.log(doMath[doMath.indexOf('+') - 1], '*', doMath[doMath.indexOf('+') + 1], 'Multiplied', doMath);
      }
      else {
        loop = false;
      }
    }
    return doMath[0];
  }


}
