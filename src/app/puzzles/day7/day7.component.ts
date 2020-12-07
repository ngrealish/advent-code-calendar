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
    // const newRules = [];
    this.rules.forEach(rule => {
      rule.forEach((bag, i) => {
        rule[i] = bag.substring(0, bag.lastIndexOf(' '));
      });
      // let newRule = {};
      // console.log(rule);
      // newRule = {
      //   [rule[0]]: []
      // };
      //
      // rule.forEach((bag, i) => {
      //   if (i > 0) {
      //     const count = bag.split(' ')[0];
      //     const type = bag.substr(bag.indexOf(' ') + 1);
      //     const newBag = {[type] : count};
      //     console.log(newBag);
      //     [rule[0]].push(newBag);
      //   }
      // });
      //
      // console.log(newRule);
    });
  }

  puzzle1() {
    this.p1Containers = [];
    this.findBagsDown('shiny gold');
    this.p1num = this.p1Containers.length;
  }

  puzzle2() {
    this.p2Containers = [];
    this.p2TotalBags = 1;
    this.p2Bags = {
      'shiny gold': 1,
    };
    this.findBagsUp('shiny gold', 1, 1);
    this.countBagsObject();
    console.log('total bags', this.p2TotalBags);
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
    console.log(' ');
    console.log('Find bags in the container of:', bagType);
    this.rules.forEach(rule => {
      rule.forEach((r, i) => {
        if (r.includes(bagType) && i === 0) {
          // This rule is the bagType bag as a container
          console.log(rule);
          rule.forEach((bag, j) => {
            if (j > 0) {
              // This is each bag that's not a container
              const type = bag.substr(bag.indexOf(' ') + 1);
              const count = parseInt(bag.split(' ')[0], 0) * multiplier;

              if (!Number.isNaN(count)) { // If there is a number (not other)
                console.log(multiplier, bagType, 'contains', count, type);
                // console.log(total + count, 'total bags so far');

                if (type in this.p2Bags) {
                  this.p2Bags[type] = count; // TODO Probably have to change this line.
                } else {
                  this.p2Bags[type] = count;
                }

              } else {
                // console.log(total + multiplier, 'END total bags');
                this.p2TotalBags += total;
              }
              this.findBagsUp(type, count, total + count);
            }
          });

        }
      });
    });
  }

  countBagsObject() {
    for (let count of Object.keys(this.p2Bags)) {
      count = this.p2Bags[count];
      console.log(count);
      this.p2TotalBags += count;
    }
  }

}
