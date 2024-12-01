// From https://adventofcode.com/2020/day/7
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const parseLine = (line) => {
    let rule = {}
    const [left, right] = line.split(' contain ');
    const [, bag] = left.match(/^(.*) bag/);
    rule['type'] = bag;
    const containedBags = right.split(', ');
    rule['contents'] = {};
    for (let bag of containedBags) {
        if (bag === 'no other bags.') continue;
        const [, count, type] = bag.match(/^([0-9]) (.*) bag/);
        rule['contents'][type] = count;
    }
    return rule;
}

const partOne = () => {
    const input = setup();
    let rules = input.map((line) => parseLine(line));
    let numBags = 0;
    const getContainedBags = (bag, target) => {
        const contents = bag.contents;
        if (Object.entries(contents).length === 0) return 0;
        const keys = Object.keys(contents);
        if (keys.includes(target)) return 1;
        let returnValue = 0;
        for (key of keys) {
            const selectedRule = rules.find((rule) => rule.type === key);
            returnValue += getContainedBags(selectedRule, target);
        }
        return returnValue;
    };
    for (rule of rules) {
        if (rule.type === 'shiny gold') continue;
        if (getContainedBags(rule, 'shiny gold') === 0) continue;
        numBags++;
    }
    console.log(`Number of bags: ${numBags}`);
};

const partTwo = () => {
    const input = setup();
    let rules = input.map((line) => parseLine(line));
    let numBags = 0;
    const sumChildBags = (bag) => {
        const contents = bag.contents;
        const entries = Object.entries(contents);
        if (entries.length === 0) return 0;
        let returnValue = 0; // Add one for *this* bag
        for (entry of entries) {
            const [ type, count ] = entry;
            returnValue += parseInt(count);
            returnValue += parseInt(count) * sumChildBags(rules.find((rule) => rule.type === type));
        }
        return returnValue;
    };
    numBags = sumChildBags(rules.find((rule) => rule.type === 'shiny gold'));
    console.log(`Number of bags: ${numBags}`);
};

partOne();
partTwo();
