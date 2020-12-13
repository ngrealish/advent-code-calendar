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
    console.log('final number', totalOccupiedSeats);

  }

  adjustSeats(seatMap) {
    const tempSeatMap = this.cloneArray(seatMap);
    for (let row = 0; row < this.seats.length; row++) {
      for (let col = 0; col < this.seats[row].length; col++) {
        const seat = seatMap[row][col];
        if (seat === '.') {
          // This is actually the floor, there's no seat here
        } else {
          // This is a seat, either occupied (#) or not (L);
          // I need to get its adjacent seats
          const adjacentSeats = this.collectAdjacentSeats(row, col, seatMap);
          const numOccupiedAdjacentSeats = this.occupiedAdjacentSeats(adjacentSeats);
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
    console.log(occupied, allSeatMaps[allSeatMaps.length - 1]);
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
    this.p2num = totalOccupiedSeats;
    console.log('final number', totalOccupiedSeats);
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
