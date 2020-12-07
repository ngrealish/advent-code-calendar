import { Component, OnInit } from '@angular/core';
import { RULES } from './rules';

@Component({
  selector: 'app-day7',
  templateUrl: './day7.component.html',
  styleUrls: ['./day7.component.scss']
})
export class Day7Component implements OnInit {


  rules: any = RULES;
  p1num: any = 0;
  p1Containers: any = [];
  p2num: any = 0;
  p2Containers: any;
  p2TotalBags: any;
  p2Bags: any;

  constructor() { }

  ngOnInit(): void {
    this.cleanRules();
    this.puzzle1();
    this.puzzle2();
  }

  cleanRules() {
    this.rules.forEach(rule => {
      rule.forEach((bag, i) => {
        rule[i] = bag.substring(0, bag.lastIndexOf(' '));
      });
    });
  }

  puzzle1() {
    this.p1Containers = [];
    this.findBagsDown('shiny gold');
    this.p1num = this.p1Containers.length;
  }

  puzzle2() {
    this.p2TotalBags = 0;
    this.findBagsUp('shiny gold', 1, 1);
    console.log('total bags', this.p2TotalBags);
    this.p2num = this.p2TotalBags;
  }

  findBagsDown(bagType) {
    this.rules.forEach(rule => {
      rule.forEach((r, i) => {
        if (r.includes(bagType) && i !== 0) {
          const container = rule[0];
          const numShinyGoldBags = r;
          if (this.p1Containers.indexOf(container) < 0) {
            this.p1Containers.push(container);
          }
          this.findBagsDown(container);
        }
      });
    });
  }

  findBagsUp(bagType, multiplier, total) {
    this.rules.forEach(rule => {
      rule.forEach((r, i) => {
        if (r.includes(bagType) && i === 0) {
          // This rule is the bagType bag as a container
          const contents = rule.map((x) => x); // clone the array to keep it sterile
          contents.shift(); // remove the first item
          contents.forEach((bag, j) => {
            const type = bag.substr(bag.indexOf(' ') + 1);
            if (type !== 'other') {
              const count = parseInt(bag.split(' ')[0], 0) * multiplier;
              this.p2TotalBags += count;
              this.findBagsUp(type, count, total + count);
            }
          });
        }
      });
    });
  }
}
