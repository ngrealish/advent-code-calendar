import { Component, OnInit } from '@angular/core';
import {EXAMPLE, LIST} from './list';

@Component({
  selector: 'app-day21',
  templateUrl: './day21.component.html',
  styleUrls: ['./day21.component.scss']
})
export class Day21Component implements OnInit {

  list: any = EXAMPLE;

  constructor() { }

  ngOnInit(): void {
    this.list = this.list.split('\n');
    this.puzzle1();
  }

  puzzle1() {
    const knowns = this.getKnownFoods();
    console.log(knowns);

    for (const [key, foods] of Object.entries(knowns)) {
      // For each known ingredient
      const unique = (value, index, self) => {
        return self.indexOf(value) === index;
      };
      const uniqueFoods = foods.filter(unique);
      console.log('foods', foods);
      console.log('unique foods', uniqueFoods);
      // Remove similar foods?
    }
  }

  getKnownFoods() {
    const knowns = {};
    this.list.forEach((item, i) => {
      const ingredients = item.split('(')[0].split(' ');
      const contains = item.split('(')[1].split(')')[0].split('contains ')[1].split(', ');
      contains.forEach((food, j) => {
        ingredients.forEach(ingredient => {
          if (knowns.hasOwnProperty(food)) {
            knowns[food].push(ingredient);
          } else {
            knowns[food] = [ingredient];
          }
        });
      });
    });
    return knowns;
  }

}
