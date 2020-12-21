import { Component, OnInit } from '@angular/core';
import {EXAMPLE} from './cube';

@Component({
  selector: 'app-day17',
  templateUrl: './day17.component.html',
  styleUrls: ['./day17.component.scss']
})
export class Day17Component implements OnInit {

  slice: any = EXAMPLE;
  cube: any;
  cubeExpanded: any;

  constructor() {
    const newCube = [];
    for (let z = 0; z < 3; z++) {
      const newSlice = [];
      if (z === 1) {
        this.slice.forEach(slice => {
          const newRow = [];
          slice.split('').forEach(col => {
            newRow.push(col);
          });
          newSlice.push(newRow);
        });
      } else {
        for (let x = 0; x < 3; x++) {
          const newRow = [];
          for (let y = 0; y < 3; y++) {
            newRow.push('.');
          }
          newSlice.push(newRow);
        }
      }
      newCube.push(newSlice);
    }
    this.cube = newCube;

    const newSlice = [];
    this.slice.forEach(slice => {
      const newRow = [];
      slice.split('').forEach(col => {
        newRow.push(col);
      });
      newSlice.push(newRow);
    });
    this.slice = newSlice;
  }

  ngOnInit(): void {
    this.expandCube();

    this.puzzle1();
  }

  expandCube() {
    const expand = 6;
    const newSlice = [];
    for (let i = 0; i < (expand * 2) + this.slice[0].length; i++) {
      if (i < expand || i > expand + this.slice[0].length - 1) {
        newSlice.push(['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ]);
      } else {
        const newRow = [];
        for (let j = 0; j < (expand * 2) + this.slice[0].length; j++) {
          // console.log('push nothing', this.slice[i - expand][j - expand], i, j, i - expand, j - expand);
          if (this.slice[i - expand][j - expand]) {
            newRow.push(this.slice[i - expand][j - expand]);
          } else {
            newRow.push('.');
          }
          // if (j < expand || j > expand + this.slice[0][0].length - 1) {
          //   newRow.push('.');
          // } else {
          //   console.log('push This', this.slice[i - expand][j - expand], i, j, i - expand, j - expand);
          //   newRow.push(this.slice[i - expand][j - expand]);
          // }
        }
        newSlice.push(newRow);
      }
    }

    this.cubeExpanded = newSlice;
  }

  puzzle1() {

    console.log(this.cubeExpanded);




    const activeArr = this.getActiveSpots(this.cube);
    const cube = this.deepCloneArray(this.cube);
    const newCube = this.deepCloneArray(cube); // This is placeholder to push into;
    cube.forEach((slice, z) => {
      slice.forEach((row, x) => {
        row.forEach((col, y) => {
          const numActiveNeighbors = this.getNeighbors(z, x, y, cube);
          // console.log(numActiveNeighbors, 'neighbors |', z, x, y);
          if (col === '#') { // If a cube is active and exactly 2 or 3 of its neighbors are also active,
            if (numActiveNeighbors === 2 || numActiveNeighbors === 3) {
              // the cube remains active.
              console.log('Remains Active', z, x, y, col);
              newCube[z][x][y] = '#';
            } else {
              // Otherwise, the cube becomes inactive.
              console.log('Make Inactive', z, x, y, col);
              newCube[z][x][y] = '.';
              // cube[z][x][y] = '.';
            }
          } else { // If a cube is inactive
            if (numActiveNeighbors === 3) { // but exactly 3 of its neighbors are active,
              // the cube becomes active.
              console.log('Make Active', z, x, y, col);
              newCube[z][x][y] = '#';
              // cube[z][x][y] = '#';
            } else {
              console.log('Remains Inactive', z, x, y, col);
              newCube[z][x][y] = '.';
            }
            // Otherwise, the cube remains inactive.
          }
        });
      });
    });

    console.log(this.cube, newCube);
  }

  getNeighbors(zO, xO, yO, cube) {
    // console.log('Check neighbors of', zO, xO, yO);
    const neighbors = [];
    let numActiveNeighbors = 0;
    for (let z = zO - 1; z <= zO + 1; z++) {
      for (let x = xO - 1; x <= xO + 1; x++) {
        for (let y = yO - 1; y <= yO + 1; y++) {
          if (z === zO && x === xO && y === yO) {
            // console.log('This is me');
          } else {
            if (z < 0 || x < 0 || y < 0 || z > cube.length - 1 || x > cube[0].length - 1 || y > cube[0][0].length - 1) {
              // console.log(z, x, y, 't.');
              neighbors.push('.');
            } else {
              // console.log('This exists', z, x, y, cube[z][x][y]);
              neighbors.push(cube[z][x][y]);
            }
          }
        }
      }
    }
    neighbors.forEach(neighbor => {
      if (neighbor === '#') {
        numActiveNeighbors++;
      }
    });
    return numActiveNeighbors;
  }

  getActiveSpots(cube) {
    const activeSpots = [];
    cube.forEach((slice, z) => {
      slice.forEach((row, x) => {
        row.forEach((col, y) => {
          if (col === '#') {
            activeSpots.push([z, x, y]);
          }
        });
      });
    });
    return activeSpots;
  }

  deepCloneArray(inObject) {
    // tslint:disable-next-line:one-variable-per-declaration
    let outObject, value, key

    if (typeof inObject !== 'object' || inObject === null) {
      return inObject; // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
      value = inObject[key];

      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = this.deepCloneArray(value);
    }

    return outObject;
  }

}
