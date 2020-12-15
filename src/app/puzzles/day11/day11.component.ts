import { Component, OnInit } from '@angular/core';
import {EXAMPLE, SEATS} from './seats';

@Component({
  selector: 'app-day11',
  templateUrl: './day11.component.html',
  styleUrls: ['./day11.component.scss']
})
export class Day11Component implements OnInit {

  seats: any = SEATS;
  allMaps: any;

  newSeats: any;

  p1num: any;
  p2num: any;

  constructor() {
    this.seats.forEach((row, i) => {
      this.seats[i] = row.split('');
    });
  }

  ngOnInit(): void {
    this.newSeats = this.cloneArray(this.seats);
    this.allMaps = [];
    this.puzzle1();
    this.puzzle2();
  }


  puzzle1() {
    const seatMap = this.cloneArray(this.seats);
    const allSeatMaps = [];
    let newSeatMap = seatMap;
    let loop = true;
    while (loop) {
      newSeatMap = this.adjustSeats(newSeatMap);
      if (this.isMapPresent(allSeatMaps, newSeatMap)) {
        allSeatMaps.push(newSeatMap);
      } else {
        loop = false;
      }
    }
    const totalOccupiedSeats = this.getTotalOccupiedSeats(allSeatMaps);
    this.p1num = totalOccupiedSeats;
    console.log('final number 1', totalOccupiedSeats);

  }

  adjustSeats(seatMap) {
    const tempSeatMap = this.cloneArray(seatMap);
    for (let row = 0; row < this.seats.length; row++) {
      for (let col = 0; col < this.seats[row].length; col++) {
        const seat = seatMap[row][col];
        if (seat !== '.') {
          const adjacentSeats = this.collectAdjacentSeats(row, col, seatMap);
          const numOccupiedAdjacentSeats = this.occupiedAdjacentSeats(adjacentSeats);
          // console.log('adjacent Seats', adjacentSeats, numOccupiedAdjacentSeats);
          if (seat === 'L' && numOccupiedAdjacentSeats === 0) { // This is not occupied,
            tempSeatMap[row][col] = '#';
          }
          if (seat === '#' && numOccupiedAdjacentSeats > 3) {
            tempSeatMap[row][col] = 'L';
          }
        }
      }
    }
    return tempSeatMap;
  }

  collectAdjacentSeats(row, col, seatMap) {
    return [
      (this.isRange(row - 1, col - 1, seatMap)) ? (seatMap[row - 1][col - 1]) : null,
      (this.isRange(row - 1, col, seatMap)) ? (seatMap[row - 1][col]) : null,
      (this.isRange(row - 1, col + 1, seatMap)) ? (seatMap[row - 1][col + 1]) : null,
      (this.isRange(row, col + 1, seatMap)) ? (seatMap[row][col + 1]) : null,
      (this.isRange(row + 1, col + 1, seatMap)) ? (seatMap[row + 1][col + 1]) : null,
      (this.isRange(row + 1, col, seatMap)) ? (seatMap[row + 1][col]) : null,
      (this.isRange(row + 1, col - 1, seatMap)) ? (seatMap[row + 1][col - 1]) : null,
      (this.isRange(row, col - 1, seatMap)) ? (seatMap[row][col - 1]) : null,
    ];
  }

  isRange(r, c, seatMap) {
    return ((r >= 0 && r < seatMap.length) && (c >= 0 && c < seatMap[0].length));
  }

  occupiedAdjacentSeats(adj) {
    let occupied = 0;
    adj.forEach(seat => {
      if (seat === '#') {
        occupied++;
      }
    });
    return occupied;
  }

  getTotalOccupiedSeats(allSeatMaps) {
    let occupied = 0;
    const lastMap = allSeatMaps[allSeatMaps.length - 1];
    lastMap.forEach(row => {
      row.forEach(col => {
        if (col === '#') {
          occupied++;
        }
      });
    });
    return occupied;
  }

  isMapPresent(allMaps, thisMap) {
    const arrCheck = [];
    allMaps.forEach((map, i) => {
      if (JSON.stringify(map) === JSON.stringify(thisMap)) {
        arrCheck.push(true);
      } else {
        arrCheck.push(false);
      }
    });
    return !(arrCheck.indexOf(true) > -1);
  }

  puzzle2() {
    const seatMap = this.cloneArray(this.seats);
    const allSeatMaps = [];
    let newSeatMap = this.cloneArray(seatMap);
    let loop = true;
    while (loop) {
      newSeatMap = this.adjustSeats2(newSeatMap);
      if (this.isMapPresent(allSeatMaps, newSeatMap)) {
        allSeatMaps.push(newSeatMap);
      } else {
        loop = false;
      }
    }
    const totalOccupiedSeats = this.getTotalOccupiedSeats(allSeatMaps);
    this.p2num = totalOccupiedSeats;
    console.log('final number 2', totalOccupiedSeats);
  }

  adjustSeats2(seatMap) {
    const tempSeatMap = this.cloneArray(seatMap);
    for (let row = 0; row < this.seats.length; row++) {
      for (let col = 0; col < this.seats[row].length; col++) {
        const seat = seatMap[row][col];
        if (seat !== '.') {
          const adjacentSeats = this.firstSeatInEachDirection(seatMap, row, col);
          // console.log('Find all adjacent seats for seat', row, col, seat, adjacentSeats, seatMap);
          const numOccupiedAdjSeats = this.getTotalOccupiedAdjSeats(adjacentSeats);
          // console.log(numOccupiedAdjSeats);
          if (seat === 'L' && numOccupiedAdjSeats === 0) {
            tempSeatMap[row][col] = '#';
          }
          if (seat === '#' && numOccupiedAdjSeats > 4) {
            tempSeatMap[row][col] = 'L';
          }
        }
      }
    }
    return tempSeatMap;
  }

  firstSeatInEachDirection(seatMap, row, seat) {
    const tempSeatMap = this.cloneArray(seatMap);
    const adj = [
      this.getSeatTopLeft(tempSeatMap, row, seat),
      this.getSeatTop(tempSeatMap, row, seat),
      this.getSeatTopRight(tempSeatMap, row, seat),
      this.getSeatRight(tempSeatMap, row, seat),
      this.getSeatBottomRight(tempSeatMap, row, seat),
      this.getSeatBottom(tempSeatMap, row, seat),
      this.getSeatBottomLeft(tempSeatMap, row, seat),
      this.getSeatLeft(tempSeatMap, row, seat),
    ];
    return adj;
  }

  getSeatTopLeft(seatMap, row, seat) {
    if (row === 0) {
      return null;
    } else if (seat === 0) {
      return null;
    } else {
      let offset = 0;
      for (let i = row - 1; i >= 0; i--) {
        offset++;
        if (seatMap[i][seat - offset] !== '.') {
          return seatMap[i][seat - offset];
        } else if (seatMap[i][seat - offset] === '.' && i === 0) {
          return null;
        } else if (seatMap[i][seat - offset] === '.' && seat - offset === 0) {
          return null;
        }
      }
    }
  }

  getSeatTop(seatMap, row, seat) {
    if (row === 0) {
      return null;
    } else {
      for (let i = row - 1; i >= 0; i--) {
        if (seatMap[i][seat] !== '.') {
          return seatMap[i][seat];
        } else if (seatMap[i][seat] === '.' && i === 0) {
          return null;
        }
      }
    }
  }

  getSeatTopRight(seatMap, row, seat) {
    if (row === 0) {
      return null;
    } else if (seat === seatMap.length - 1) {
      return null;
    } else {
      let offset = 0;
      for (let i = row - 1; i >= 0; i--) {
        offset++;
        if (seatMap[i][seat + offset] !== '.') {
          return seatMap[i][seat + offset];
        } else if (seatMap[i][seat + offset] === '.' && i === 0) {
          return null;
        } else if (seatMap[i][seat + offset] === '.' && seat + offset === seatMap.length - 1) {
          return null;
        }
      }
    }
  }

  getSeatRight(seatMap, row, seat) {
    if (seat === seatMap[row].length - 1) {
      return null;
    } else {
      // search for the next seat
      for (let i = seat + 1; i < seatMap[row].length; i++) {
        if (seatMap[row][i] !== '.') {
          return seatMap[row][i];
        } else if (seatMap[row][i] === '.' && i === seatMap[row].length - 1) {
          return null;
        }
      }
    }
  }

  getSeatBottomRight(seatMap, row, seat) {
    if (row === seatMap.length - 1) {
      return null;
    } else if (seat ===  seatMap.length - 1) {
      return null;
    } else {
      let offset = 0;
      for (let i = row + 1; i < seatMap.length; i++) {
        offset++;
        if (seatMap[i][seat + offset] !== '.') {
          return seatMap[i][seat + offset];
        } else if (seatMap[i][seat + offset] === '.' && i === seatMap.length - 1) {
          return null;
        } else if (seatMap[i][seat + offset] === '.' && seat + offset === seatMap.length - 1) {
          return null;
        }
      }
    }
  }

  getSeatBottom(seatMap, row, seat) {
    if (row === seatMap.length - 1) {
      // This is the bottom, so L
      return null;
    } else {
      for (let i = row + 1; i < seatMap.length; i++) {
        if (seatMap[i][seat] !== '.') {
          return seatMap[i][seat];
        } else if (seatMap[i][seat] === '.' && i === seatMap.length - 1) {
          return null;
        }
      }
    }
  }

  getSeatBottomLeft(seatMap, row, seat) {
    if (row === seatMap.length - 1) {
      return null;
    } else if (seat === 0) {
      return null;
    } else {
      let offset = 0;
      for (let i = row + 1; i < seatMap.length; i++) {
        offset++;
        if (seatMap[i][seat - offset] !== '.') {
          return seatMap[i][seat - offset];
        } else if (seatMap[i][seat - offset] === '.' && seat - offset === 0) {
          return null;
        } else if (seatMap[i][seat - offset] === '.' && i === seatMap.length - 1) {
          return null;
        }
      }
    }
  }

  getSeatLeft(seatMap, row, seat) {
    if (seat === 0) {
      return null;
    } else {
      for (let i = seat - 1; i >= 0; i--) {
        if (seatMap[row][i] !== '.') {
          return seatMap[row][i];
        } else if (seatMap[row][i] === '.' && i === 0) {
          return null;
        }
      }
    }
  }

  getTotalOccupiedAdjSeats(adj) {
    let occupied = 0;
    adj.forEach(seat => {
      if (seat === '#') {
        occupied++;
      }
    });
    return occupied;
  }


  cloneArray(arr) {
    const newArr = [];
    arr.forEach(row => {
      const newRow = [];
      row.forEach(col => {
        newRow.push(col);
      });
      newArr.push(newRow);
    });
    return newArr;
  }
}
