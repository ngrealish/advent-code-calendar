import { Component, OnInit } from '@angular/core';
import {EXAMPLE, EXAMPLE2, TICKETS} from './tickets';

@Component({
  selector: 'app-day16',
  templateUrl: './day16.component.html',
  styleUrls: ['./day16.component.scss']
})
export class Day16Component implements OnInit {

  ticketsAndRules: any = TICKETS;
  rules: any = [];
  myTicket: any = [];
  tickets: any = [];
  invalidTickets: any = [];
  validTickets: any = [];

  constructor() { }

  ngOnInit(): void {
    this.splitTickets();
    this.puzzle1();
    this.puzzle2();
  }

  puzzle1() {
    const rules = this.getRules();
    const invalidNums = [];
    this.tickets.forEach((ticket, i) => {
      if (i !== 0) {
        ticket = ticket.split(',');
        for (let j = 0; j < ticket.length; j++) {
          if (rules.indexOf(parseInt(ticket[j], 0)) === -1) {
            invalidNums.push(parseInt(ticket[j], 0));
            if (this.invalidTickets.indexOf(i) === -1) {
              this.invalidTickets.push(i);
            }
          }
        }
      }
    });
    const errorRate = this.getErrorRate(invalidNums);
    console.log(errorRate);
  }

  puzzle2() {
    this.validTickets = this.getValidTickets();
    let allRulesMap = this.getRulesMap();
    const positions = this.getPositionsArr();
    allRulesMap = this.getRulesetPositionCorrectness(allRulesMap, positions);
    allRulesMap = this.sortRules(allRulesMap);
    const departurePositions = this.getDepartureInfo(allRulesMap);
    console.log(departurePositions, this.myTicket);
    let final = 1;
    departurePositions.forEach(pos => {
      const value = parseInt(this.myTicket[pos], 0);
      console.log(value);
      final *= value;
    });
    console.log(final);
  }

  getDepartureInfo(allRulesMap) {
    const departureRulesMap = [];
    allRulesMap.forEach((rule, i) => {
      if (rule[0].includes('departure')) {
        departureRulesMap.push(i);
      }
    });
    return departureRulesMap;
  }

  getPositionsArr() {
    const positionsArr = [];
    this.validTickets[0].split(',').forEach(n => { positionsArr.push([]); });
    this.validTickets.forEach(ticket => {
      ticket.split(',').forEach((num, i) => {
        positionsArr[i].push(num);
      });
    });
    return positionsArr;
  }

  getRulesMap() {
    const allRulesMap = [];
    this.rules.forEach(rule => {
      const ranges = [];
      const ruleName = rule.split(': ')[0];
      const rangeSet1 = rule.split(': ')[1].split(' or ')[0];
      const rangeSet2 = rule.split(': ')[1].split(' or ')[1];
      const num1 = parseInt(rangeSet1.split('-')[0], 0);
      const num2 = parseInt(rangeSet1.split('-')[1], 0);
      const num3 = parseInt(rangeSet2.split('-')[0], 0);
      const num4 = parseInt(rangeSet2.split('-')[1], 0);
      for (let i = num1; i <= num2; i++) {
        if (ranges.indexOf(i) === -1) {
          ranges.push(i);
        }
      }
      for (let i = num3; i <= num4; i++) {
        if (ranges.indexOf(i) === -1) {
          ranges.push(i);
        }
      }
      allRulesMap.push([ruleName, ranges, []]);
    });
    return allRulesMap;
  }

  getValidTickets() {
    const validTicketsTemp = this.cloneArray(this.tickets);
    const validTickets = [];
    validTicketsTemp.forEach((ticket, i) => {
      if (this.invalidTickets.indexOf(i) === -1) {
        validTickets.push(ticket);
      }
    });
    return validTickets;
  }

  getErrorRate(invalidNums) {
    let errorRate = 0;
    invalidNums.forEach(num => {
      errorRate += num;
    });
    return errorRate;
  }

  getRules() {
    const rules = [];
    this.rules.forEach(rule => {
      rule = rule.split(': ')[1];
      const ruleSet1 = rule.split(' or ')[0];
      const ruleSet2 = rule.split(' or ')[1];
      const num1 = parseInt(ruleSet1.split('-')[0], 0);
      const num2 = parseInt(ruleSet1.split('-')[1], 0);
      const num3 = parseInt(ruleSet2.split('-')[0], 0);
      const num4 = parseInt(ruleSet2.split('-')[1], 0);
      for (let i = num1; i <= num2; i++) {
        if (rules.indexOf(i) === -1) {
          rules.push(i);
        }
      }
      for (let i = num3; i <= num4; i++) {
        if (rules.indexOf(i) === -1) {
          rules.push(i);
        }
      }
    });
    return rules;
  }

  getRulesetPositionCorrectness(allRulesMap, positions) {
    allRulesMap.forEach(ruleset => {
      const correctPositions = [];
      for (let i = 0; i < positions.length; i++) {
        const position = positions[i];
        let correctPosition = true;
        for (let j = 0; j < position.length; j++) {
          const num = parseInt(position[j], 0);
          if (ruleset[1].indexOf(num) === -1) {
            correctPosition = false;
            j = position.length + 1;
          }
        }
        correctPositions.push(correctPosition);
      }
      ruleset[2] = correctPositions;
    });
    return allRulesMap;
  }

  sortRules(allRulesMap) {
    const correctRulesMap = this.deepCloneArray(allRulesMap);
    const clonedAllRulesMap = this.deepCloneArray(allRulesMap);
    const numRules = allRulesMap.length;

    for (let i = 0; i < numRules; i++) {
      clonedAllRulesMap.forEach((ruleset, j) => {
        const numTrue = [];
        ruleset[2].forEach((valid, k) => {
          if (valid) {
            numTrue.push(k);
          }
        });
        if (numTrue.length === 1) {
          clonedAllRulesMap.forEach(rulesetInner => {
            rulesetInner[2][numTrue[0]] = null;
          });
          correctRulesMap[numTrue[0]] = ruleset;
        }
      });
    }
    return correctRulesMap;
  }


  // Helper functions

  splitTickets() {
    const blankLines = [];
    this.ticketsAndRules.filter((x, i) => {
      if (x === '') { blankLines.push(i); }
    });
    this.rules = this.cloneArray(this.ticketsAndRules).slice(0, blankLines[0]);
    this.myTicket = this.cloneArray(this.ticketsAndRules).slice(blankLines[0] + 2, blankLines[1])[0].split(',');
    this.tickets = this.cloneArray(this.ticketsAndRules).slice(blankLines[1] + 2, this.ticketsAndRules.length);
  }

  cloneArray(arr) {
    const tempArr = [];
    arr.forEach(a => {
      tempArr.push(a);
    });
    return tempArr;
  }

  deepCloneArray(inObject) {
    let outObject, value, key

    if (typeof inObject !== 'object' || inObject === null) {
      return inObject // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
      value = inObject[key]

      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = this.deepCloneArray(value);
    }

    return outObject;
  }

}
