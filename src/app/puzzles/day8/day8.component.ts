import { Component, OnInit } from '@angular/core';
import { CODE } from './code';

@Component({
  selector: 'app-day8',
  templateUrl: './day8.component.html',
  styleUrls: ['./day8.component.scss']
})
export class Day8Component implements OnInit {

  code: any = CODE;

  p1num: any = 0;
  p1Lines: any = [];

  p2num: any = 0;
  p2Lines: any = [];
  p2LineChange: any = [];

  constructor() { }

  ngOnInit(): void {
    this.puzzle1();
    this.puzzle2();
  }

  puzzle1() {
    this.p1num = this.checkCode(this.code);
    console.log('Accumulator', this.p1num);
  }

  puzzle2() {
    const linesChecked = [];
    let codeToCheck = [];
    const code = this.cloneArray(this.code);
    code.forEach((line, i) => {
      codeToCheck = this.cloneArray(this.code);
      if (line[0] === 'nop' || line[0] === 'jmp') {
        if (linesChecked.indexOf(i) === -1) {
          linesChecked.push(i);
          if (line[0] === 'nop') {
            codeToCheck[i][0] = 'jmp';
          } else if (line[0] === 'jmp') {
            codeToCheck[i][0] = 'nop';
          }
          this.checkCode(codeToCheck);
        }
      }
    });
  }

  p1CheckLine(line) {
    if (this.p1Lines.indexOf(line) === -1) {
      this.p1Lines.push(line);
      return true;
    } else {
      return false;
    }
  }

  checkCode(code) {
    this.p1Lines = [];
    let line = 0;
    let accumulator = 0;
    let loop = true;
    while (loop) {
      if (this.p1CheckLine(line)) {
        if (line < this.code.length - 1) {
          const ins = code[line][0];
          const inc = code[line][1];
          if (ins === 'acc') {
            accumulator += inc;
            line++;
          } else if (ins === 'nop') {
            line++;
          } else if (ins === 'jmp') {
            line += inc;
          }
        } else if (line === this.code.length - 1) {
          this.p2num = accumulator;
          console.log('Hit the last line', this.p2num);
          loop = false;
        } else {
          loop = false;
        }
      } else {
        loop = false;
      }
    }
    return accumulator;
  }

  cloneArray(original) {
    const copy = [];
    original.forEach(line => {
      const newLine = [];
      line.forEach(o => {
        newLine.push(o);
      });
      copy.push(newLine);
    });
    return copy;
  }

}
