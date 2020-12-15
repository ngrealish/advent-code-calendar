import { Component, OnInit } from '@angular/core';
import {COORDINATES, EXAMPLE, MACHADO, MACHADO2} from './coords';

@Component({
  selector: 'app-day12',
  templateUrl: './day12.component.html',
  styleUrls: ['./day12.component.scss']
})
export class Day12Component implements OnInit {

  coords: any = MACHADO;
  p1num: any;
  p2num: any;

  constructor() { }

  ngOnInit(): void {
    this.puzzle1();
    this.puzzle2();
  }

  puzzle1() {
    let facing = 'E';
    let east = 0;
    let north = 0;
    this.coords.forEach(coord => {
      const dir = coord.charAt(0);
      const val = parseInt(coord.substr(1, coord.split('').length), 0);
      if (dir === 'L' || dir === 'R') {
        facing = this.changeFacing(facing, dir, val);
      } else {
        if (dir === 'F') {
          if (facing === 'W') {
            east -= val;
          } else if (facing === 'E') {
            east += val;
          } else if (facing === 'N') {
            north += val;
          } else if (facing === 'S') {
            north -= val;
          }
        } else {
          if (dir === 'W') {
            east -= val;
          } else if (dir === 'E') {
            east += val;
          } else if (dir === 'N') {
            north += val;
          } else if (dir === 'S') {
            north -= val;
          }
        }
      }
    });
    console.log('Answer', Math.abs(east), '+', Math.abs(north), '=', Math.abs(east) + Math.abs(north));
    this.p1num = Math.abs(east) + Math.abs(north);
  }

  changeFacing(facing, dir, val) {
    let newFacing = facing;
    if (val === 180) {
      if (facing === 'E') {
        newFacing = 'W';
      } else if (facing === 'W') {
        newFacing = 'E';
      } else if (facing === 'S') {
        newFacing = 'N';
      } else if (facing === 'N') {
        newFacing = 'S';
      }
    } else if (val === 90) {
      if (facing === 'E') {
        newFacing = (dir === 'R') ? 'S' : 'N';
      } else if (facing === 'W') {
        newFacing = (dir === 'R') ? 'N' : 'S';
      } else if (facing === 'S') {
        newFacing = (dir === 'R') ? 'W' : 'E';
      } else if (facing === 'N') {
        newFacing = (dir === 'R') ? 'E' : 'W';
      }
    } else if (val === 270) {
      if (facing === 'E') {
        newFacing = (dir === 'R') ? 'N' : 'S';
      } else if (facing === 'W') {
        newFacing = (dir === 'R') ? 'S' : 'N';
      } else if (facing === 'S') {
        newFacing = (dir === 'R') ? 'E' : 'W';
      } else if (facing === 'N') {
        newFacing = (dir === 'R') ? 'W' : 'E';
      }
    }
    return newFacing;
  }

  puzzle2() {
    let east = 0;
    let north = 0;
    let waypointEast = 10;
    let waypointNorth = 1;
    const waypoints = [];
    this.coords.forEach(coord => {
      const dir = coord.charAt(0);
      const val = parseInt(coord.substr(1, coord.split('').length), 0);
      let tempWaypointEast = waypointEast;
      let tempWaypointNorth = waypointNorth;
      if (dir === 'L' || dir === 'R') {
        if (dir === 'L') {
          if (val === 90) {
            waypointEast = tempWaypointNorth * -1;
            waypointNorth = tempWaypointEast;
          } else if (val === 180) {
            waypointEast = tempWaypointEast * -1;
            waypointNorth = tempWaypointNorth * -1;
          } else { // val 270
            waypointEast = tempWaypointNorth;
            waypointNorth = tempWaypointEast * -1;
          }
        } else {
          if (val === 90) {
            waypointEast = tempWaypointNorth;
            waypointNorth = tempWaypointEast * -1;
          } else if (val === 180) {
            waypointEast = tempWaypointEast * -1;
            waypointNorth = tempWaypointNorth * -1;
          } else { // val 270
            waypointEast = tempWaypointNorth * -1;
            waypointNorth = tempWaypointEast;
          }
        }
      } else if (dir === 'F') {
        east += waypointEast * val;
        north += waypointNorth * val;
      } else {
        if (dir === 'N') {
          waypointNorth += val;
        } else if (dir === 'S') {
          waypointNorth -= val;
        } else if (dir === 'E') {
          waypointEast += val;
        } else if (dir === 'W') {
          waypointEast -= val;
        }
      }
      waypoints.push(waypointEast);
    });
    console.log(waypoints);
    console.log('Answer', Math.abs(east), '+', Math.abs(north), '=', Math.abs(east) + Math.abs(north));
    this.p2num = Math.abs(east) + Math.abs(north);
  }

}
