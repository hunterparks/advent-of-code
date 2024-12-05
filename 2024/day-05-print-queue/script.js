// From https://adventofcode.com/2024/day/5
const fs = require('fs');
const path = require('path');
const setup = (inputPath = 'input.txt') => {
    return fs
        .readFileSync(path.join(__dirname, inputPath), { encoding: 'utf-8' })
        .split('\n');
};
const processRule = (rule, update) => {
    const [x, y] = rule;
    const xIndex = update.indexOf(x);
    const yIndex = update.indexOf(y);
    if (xIndex > -1 && yIndex > -1) {
        return xIndex < yIndex;
    }
    return true;
};
const partOne = () => {
    const input = setup();
    const blankIndex = input.indexOf('');
    const rawRules = input.slice(0, blankIndex);
    const rules = rawRules.map((x) => x.split('|').map((xx) => +xx));
    const rawUpdates = input.slice(blankIndex + 1, input.length);
    const updates = rawUpdates.map((x) => x.split(',').map((xx) => +xx));

    const validUpdates = [];
    for (const update of updates) {
        if (rules.every((rule) => processRule(rule, update))) {
            validUpdates.push(update);
        }
    }
    const validUpdatesMiddles = validUpdates.map(
        (x) => x[Math.floor(x.length / 2)]
    );
    const totalMiddles = validUpdatesMiddles.reduce(
        (prev, curr) => prev + curr,
        0
    );
    console.log(`Sum of the middle digits of valid updates: ${totalMiddles}`);
};
const partTwo = () => {
    const input = setup();
    const blankIndex = input.indexOf('');
    const rawRules = input.slice(0, blankIndex);
    const rules = rawRules.map((x) => x.split('|').map((xx) => +xx));
    const rawUpdates = input.slice(blankIndex + 1, input.length);
    const updates = rawUpdates.map((x) => x.split(',').map((xx) => +xx));

    const invalidUpdates = [];
    for (const update of updates) {
        if (!rules.every((rule) => processRule(rule, update))) {
            invalidUpdates.push(update);
        }
    }

    const correctedUpdates = [];
    for (const invalid of invalidUpdates) {
        const invalidClone = [...invalid];
        invalidClone.sort((a, b) => {
            for (const [x, y] of rules) {
                if (a === y && b === x) {
                    return 1;
                } else if (a === x && b === y) {
                    return -1;
                }
            }
        });

        if (rules.every((rule) => processRule(rule, invalidClone))) {
            correctedUpdates.push(invalidClone);
        } else {
            console.error(`Unable to fix: ${invalid}`);
        }
    }

    const correctedUpdatesMiddles = correctedUpdates.map(
        (x) => x[Math.floor(x.length / 2)]
    );
    const totalMiddles = correctedUpdatesMiddles.reduce(
        (prev, curr) => prev + curr,
        0
    );
    console.log(
        `Sum of the middle digits of corrected updates: ${totalMiddles}`
    );
};
partOne();
partTwo();
