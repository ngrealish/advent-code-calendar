import { Component, OnInit } from '@angular/core';
import {EXAMPLE, RULES} from './rules';

@Component({
  selector: 'app-day19',
  templateUrl: './day19.component.html',
  styleUrls: ['./day19.component.scss']
})
export class Day19Component implements OnInit {

  rules: any = EXAMPLE[0];
  checks: any = EXAMPLE[1];


  constructor() { }

  ngOnInit(): void {


    this.rules = this.sortRules();

    this.puzzle1();
  }

  puzzle1() {
    this.getAllRuleChecks();
    const ruleCombinations = this.getAllRuleChecks();
    const ruleCombinationsArr = this.getAllCombinations(ruleCombinations);

  }

  getAllCombinations(rules) {
    console.log('get all', rules);
    // this.getLetters(rules);

  }

  getLetters(rules) {

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (Array.isArray(rule)) {
        this.getLetters(rule);
        console.log('dig deeper');
      } else {

      }
    }
  }

  checkRules(check) {
    console.log('check', check, 'against', this.rules[0]);
    const rules = this.rules[0].split(' ');
    console.log(rules);
    rules.forEach(rule => {
      console.log(rule, this.rules[rule]);
      if (rule === 'a' || rule === 'b') {

      } else {

      }
    });
  }

  getAllRuleChecks() {
    let rules = this.rules[0];
    let looping = true;
    while (looping) {
      // Loop this
      const posA = this.getPos('a');
      const posB = this.getPos('b');
      if (!this.isFinal(rules)) {
        // Return the rules here to repeat
        rules = this.replaceRules(rules, posA, posB);
      } else {
        looping = false;
      }
    }
    return rules;
  }

  replaceRules(rules, a, b) {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (rule === a) {
        rules[i] = 'a';
      }
      if (rule === b) {
        rules[i] = 'b';
      }
      if (rule !== a && rule !== b) {
        let newRule = rule;
        if (Array.isArray(rule)) {
          if (rule[0] !== 'a' && rule[0] !== 'b') {
            newRule = this.replaceRules(rule, a, b);
          }
        } else {
          if (rule !== 'a' && rule !== 'b') {
            newRule = this.rules[rule];
          }
        }
        rules[i] = newRule;
      }
    }
    return rules;
  }

  isFinal(rule) {
    const flat = rule.flat(999);
    const flatFinal = [];
    flat.forEach(x => {
      flatFinal.push(isNaN(x));
    });
    return !(flatFinal.indexOf(false) > -1);
  }


  // Helpers
  sortRules() {
    const ruleObj = {};
    this.rules.forEach(rule => {
      const ruleNum = rule.split(': ')[0];
      let rules = rule.split(': ')[1];
      if (rules.includes('|')) {
        rules = rules.split('|');
        const ruleArr = [];
        rules.forEach(r => {
          r = r.split(' ');
          const rArr = [];
          r.forEach(x => {
            if (x === '') {
            } else {
              rArr.push(parseInt(x, 0));
            }
          });
          ruleArr.push(rArr);
        });
        rules = ruleArr;
      } else {
        rules = rules.split(' ');
        rules.forEach((r, i) => {
          if (isNaN(r)) {
            rules[i] = r.replace(/['"]+/g, '');
          } else {
            rules[i] = parseInt(r, 0);
          }
        });
      }
      ruleObj[ruleNum] = rules;
    });
    return ruleObj;
  }

  getPos(x) {
    let pos = 0;
    for (const [key, value] of Object.entries(this.rules)) {
      if (value[0][0] === x) {
        pos = parseInt(key, 0);
      }
    }
    return pos;
  }

}
