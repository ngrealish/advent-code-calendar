import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Day1Component} from './puzzles/day1/day1.component';
import {Day2Component} from './puzzles/day2/day2.component';
import {Day3Component} from './puzzles/day3/day3.component';
import {Day4Component} from './puzzles/day4/day4.component';
import {Day5Component} from './puzzles/day5/day5.component';
import {Day6Component} from './puzzles/day6/day6.component';
import {Day7Component} from './puzzles/day7/day7.component';
import {Day8Component} from './puzzles/day8/day8.component';
import {Day9Component} from './puzzles/day9/day9.component';
import {Day10Component} from './puzzles/day10/day10.component';
import {Day11Component} from './puzzles/day11/day11.component';
import {Day12Component} from './puzzles/day12/day12.component';
import {Day13Component} from './puzzles/day13/day13.component';
import {Day14Component} from './puzzles/day14/day14.component';
import {Day15Component} from './puzzles/day15/day15.component';
import {Day16Component} from './puzzles/day16/day16.component';
import {Day17Component} from './puzzles/day17/day17.component';
import {Day18Component} from './puzzles/day18/day18.component';
import {Day19Component} from './puzzles/day19/day19.component';
import {Day20Component} from './puzzles/day20/day20.component';
import {Day21Component} from './puzzles/day21/day21.component';
import {Day22Component} from './puzzles/day22/day22.component';
import {Day23Component} from './puzzles/day23/day23.component';
import {Day24Component} from './puzzles/day24/day24.component';
import {Day25Component} from './puzzles/day25/day25.component';


const routes: Routes = [
  {
    path: 'day1',
    component: Day1Component
  },
  {
    path: 'day2',
    component: Day2Component
  },
  {
    path: 'day3',
    component: Day3Component
  },
  {
    path: 'day4',
    component: Day4Component
  },
  {
    path: 'day5',
    component: Day5Component
  },
  {
    path: 'day6',
    component: Day6Component
  },
  {
    path: 'day7',
    component: Day7Component
  },
  {
    path: 'day8',
    component: Day8Component
  },
  {
    path: 'day9',
    component: Day9Component
  },
  {
    path: 'day10',
    component: Day10Component
  },
  {
    path: 'day11',
    component: Day11Component
  },
  {
    path: 'day12',
    component: Day12Component
  },
  {
    path: 'day13',
    component: Day13Component
  },
  {
    path: 'day14',
    component: Day14Component
  },
  {
    path: 'day15',
    component: Day15Component
  },
  {
    path: 'day16',
    component: Day16Component
  },
  {
    path: 'day17',
    component: Day17Component
  },
  {
    path: 'day18',
    component: Day18Component
  },
  {
    path: 'day19',
    component: Day19Component
  },
  {
    path: 'day20',
    component: Day20Component
  },
  {
    path: 'day21',
    component: Day21Component
  },
  {
    path: 'day22',
    component: Day22Component
  },
  {
    path: 'day23',
    component: Day23Component
  },
  {
    path: 'day24',
    component: Day24Component
  },
  {
    path: 'day25',
    component: Day25Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
