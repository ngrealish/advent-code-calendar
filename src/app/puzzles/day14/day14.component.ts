import { Component, OnInit } from '@angular/core';
import {BITMASK, EXAMPLE, EXAMPLE2} from './bitmask';

@Component({
  selector: 'app-day14',
  templateUrl: './day14.component.html',
  styleUrls: ['./day14.component.scss']
})
export class Day14Component implements OnInit {

  bitmask: any = BITMASK;
  p1num: any;
  p2num: any;

  constructor() { }

  ngOnInit(): void {
    this.puzzle1(this.bitmask);
    this.puzzle2();
  }

  puzzle1(bitmask) {
    const bitObj = {};
    let mask = '';
    bitmask.forEach(bit => {
      const instruction = bit.split(' = ')[0];
      const variable = bit.split(' = ')[1];
      if (instruction === 'mask') {
        mask = variable;
      } else {
        const memLocation = parseInt(instruction.split('[')[1].slice(0, -1), 0);
        const binary = this.getBinary32(parseInt(variable, 0).toString(2));
        if (!bitObj[memLocation]) {
          bitObj[memLocation] = binary;
        }
        bitObj[memLocation] = this.changeMask(mask, binary);
      }
    });
    this.p1num = this.addBinaries(bitObj);
    console.log(this.p1num);
  }

  puzzle2() {
    const bitmaskClone = this.cloneArray(this.bitmask);
    let mask = '';
    const newBitMask = [];
    bitmaskClone.forEach((bit, i) => {
      const instruction = bit.split(' = ')[0];
      const variable = bit.split(' = ')[1];
      let pushThis;
      if (instruction === 'mask') {
        mask = variable;
        pushThis = instruction + ' = ' + variable;
        newBitMask.push(pushThis);
      } else {
        const memLocation = parseInt(instruction.split('[')[1].slice(0, -1), 0);
        const memLocationBinary = this.getBinary32(memLocation.toString(2));
        pushThis = instruction + ' = ' + variable;
        // newBitMask.push(pushThis);
        const newBinary = this.changeMask2(mask, memLocationBinary);
        const binaryArr = this.getBinaryArr(newBinary);
        binaryArr.forEach((binary, j) => {
          const binaryToInt = parseInt(binary, 2);
          pushThis = 'mem[' + binaryToInt + '] = ' + variable;
          newBitMask.push(pushThis);
        });
      }
    });
    this.p2num = this.combineLocations(newBitMask);
    console.log(this.p2num);
  }

  combineLocations(bitmask) {
    const tempObj = {};
    bitmask.forEach((line, i) => {
      const position = line.split(' = ')[0];
      const value = line.split(' = ')[1];
      if (position !== 'mask') {
        tempObj[position] = parseInt(value, 0);
      }
    });
    let total = 0;
    for (const key of Object.keys(tempObj)) {
      const newLine = 'mem[' + key + '] = ' + tempObj[key];
      total += parseInt(tempObj[key], 0);
    }
    return total;
  }

  getBinary32(binary) {
    let tempBinary = binary.split('').reverse().join('');
    for (let i = tempBinary.length; i < 36; i++) {
      tempBinary += '0';
    }
    return tempBinary.split('').reverse().join('');
  }

  changeMask(mask, binary) {
    let newBinary = binary.split('');
    // console.log(mask, 'mask 1');
    // console.log(binary, 'binary 1');
    for (let i = 0; i < 36; i++) {
      const m = mask[i];
      const b = binary[i];
      let change;
      if (m === 'X' && b === 'X') {
        change = 'X';
      } else if (m === 'X' && b === '0') {
        change = '0';
      } else if (m === 'X' && b === '1') {
        change = '1';
      } else if (m === '0' && b === 'X') {
        change = '0';
      } else if (m === '0' && b === '0') {
        change = '0';
      } else if (m === '0' && b === '1') {
        change = '0';
      } else if (m === '1' && b === 'X') {
        change = '1';
      } else if (m === '1' && b === '0') {
        change = '1';
      } else if (m === '1' && b === '1') {
        change = '1';
      }

      newBinary[i] = change;
    }
    newBinary = newBinary.join('');
    // console.log(newBinary, 'newBinary 1');
    return newBinary;
  }

  changeMask2(mask, binary) {
    let newBinary = binary.split(''); // Just holds a temporary piece
    for (let i = 0; i < 36; i++) {
      const m = mask[i];
      const b = binary[i];
      let change;
      if (m === '0') {
        change = binary[i];
      } else if (m === '1') {
        change = '1';
      } else if (m === 'X') {
        change = 'X';
      }
      newBinary[i] = change;
    }
    newBinary = newBinary.join('');
    return newBinary;
  }

  addBinaries(obj) {
    let finalSum = 0;
    Object.keys(obj).forEach(key => {
      const binaryToInt = parseInt(obj[key], 2);
      finalSum += binaryToInt;
    });
    return finalSum;
  }

  getBinaryArr(binary) {
    const binaryArr = [];
    const xs = [];
    binary.split('').forEach(a => {
      if (a === 'X') {
        xs.push('1');
      }
    });
    const highestNumBinary = xs.join('');
    const highestNum = parseInt(highestNumBinary, 2);
    for (let i = highestNum; i >= 0; i--) {
      const numBinary = this.addLeadingZeroes(xs, i.toString(2));
      const xPos = [];
      let tempBinary = binary.split('');
      tempBinary.forEach((a, j) => {
        if (a === 'X') {
          // console.log('xpos length', xPos.length, numBinary[xPos.length]);
          tempBinary[j] = numBinary[xPos.length];
          xPos.push(j);
        }
      });
      tempBinary = tempBinary.join('');
      binaryArr.push(tempBinary);
    }
    return binaryArr;
  }

  addLeadingZeroes(xs, binary) {
    if (binary.split('').length !== xs.length) {
      const numZeroes = xs.length - binary.split('').length;
      let zeroes = '';
      for (let i = 0; i < numZeroes; i++) {
        zeroes += '0';
      }
      binary = zeroes + binary;
    }
    return binary;
  }

  cloneArray(arr) {
    const tempArr = [];
    arr.forEach(a => {
      tempArr.push(a);
    });
    return tempArr;
  }
}
