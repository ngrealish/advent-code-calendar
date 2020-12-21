import { Component, OnInit } from '@angular/core';
import {EXAMPLE, TILES} from './tiles';

@Component({
  selector: 'app-day20',
  templateUrl: './day20.component.html',
  styleUrls: ['./day20.component.scss']
})
export class Day20Component implements OnInit {

  tiles: any = TILES;

  constructor() { }

  ngOnInit(): void {
    console.log(this.tiles);
    const tiles = this.tiles.split('\n');
    const tileObj = this.makeObject(tiles);
    this.tiles = tileObj;
    this.puzzle1();
  }

  puzzle1() {

    const corners = [];
    for (const [key, tile] of Object.entries(this.tiles)) {
      const left = tile.borders.left;
      const right = tile.borders.right;
      const top = tile.borders.top;
      const bottom = tile.borders.bottom;
      const matches = [];
      for (const [key2, tile2] of Object.entries(this.tiles)) {
        if (key2 !== key) {
          const left2 = tile2.borders.left;
          const right2 = tile2.borders.right;
          const top2 = tile2.borders.top;
          const bottom2 = tile2.borders.bottom;
          const tempSides = [
            left2,
            this.reverseString(left2),
            right2,
            this.reverseString(right2),
            top2,
            this.reverseString(top2),
            bottom2,
            this.reverseString(bottom2),
          ];

          if (tempSides.indexOf(left) > -1) {
            matches.push(key2);
          }
          if (tempSides.indexOf(right) > -1) {
            matches.push(key2);
          }
          if (tempSides.indexOf(bottom) > -1) {
            matches.push(key2);
          }
          if (tempSides.indexOf(top) > -1) {
            matches.push(key2);
          }
        }
      }
      if (matches.length === 2) {
        corners.push(key);
      }
    }

    console.log(corners);
    let total = 1;
    corners.forEach(corner => {
      total *= parseInt(corner.split(' ')[1], 0);
    });
    console.log(total);
  }

  // Helpers
  makeObject(tiles) {
    // Make the tile as a grid.
    const tileObj = {};
    tiles.forEach(tile => {
      const tileArr = [];
      const tileEach = tile.split(':')[1].split('');
      const left = [];
      const right = [];
      for (let i = 0; i < 10; i++) {
        const row = [];
        for (let j = 0; j < 10; j++) {
          row.push(tileEach[parseInt('' + i + j, 0)]);
          if (j === 0) {
            left.push(tileEach[parseInt('' + i + j, 0)]);
          }
          if (j === 9) {
            right.push(tileEach[parseInt('' + i + j, 0)]);
          }
        }
        tileArr.push(row);
      }
      tileObj[tile.split(':')[0]] = {
        tile: tileArr,
        borders: {
          top: tileArr[0].join(''),
          bottom: tileArr[tileArr.length - 1].join(''),
          left: left.join(''),
          right: right.join(''),
        }
      };
    });
    return tileObj;
  }

  reverseString(str) {
    str = str.split('');
    str = str.reverse();
    str = str.join('');
    return str;
  }
}

// 0-9
// 10-19
