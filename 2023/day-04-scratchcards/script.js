// From https://adventofcode.com/2023/day/4
const fs = require('fs');
const path = require('path');
const setup = (inputPath = 'input.txt') => {
    return fs
        .readFileSync(path.join(__dirname, inputPath), { encoding: 'utf-8' })
        .split('\n');
};
const partOne = () => {
    const input = setup();
    let points = 0;
    input.forEach((card) => {
        const [numbers, winningNumbers] = card
            .split(/: +/)[1]
            .split(/ +\| +/)
            .map((values) => values.split(/ +/).map((value) => +value));
        let pointValue = 0;
        numbers.forEach((number) => {
            if (winningNumbers.includes(number)) {
                if (pointValue === 0) {
                    pointValue = 1;
                } else {
                    pointValue *= 2;
                }
            }
        });
        points += pointValue;
    });
    console.log(`The cards are worth: ${points} points`);
};
const partTwo = () => {
    const input = setup();
    const cardMatches = new Map();
    const cardInstances = new Map();
    input.forEach((_i, i) => cardInstances.set(i + 1, 1));
    let points = 0;
    input.forEach((card, index) => {
        const [numbers, winningNumbers] = card
            .split(/: +/)[1]
            .split(/ +\| +/)
            .map((values) => values.split(/ +/).map((value) => +value));
        let matches = 0;
        numbers.forEach((number) => {
            if (winningNumbers.includes(number)) {
                matches++;
            }
        });
        cardMatches.set(index + 1, matches);
    });
    for (let i = 1; i <= input.length; i++) {
        const matches = cardMatches.get(i);
        const instances = cardInstances.get(i);
        for (let j = 1; j <= matches; j++) {
            const instanceCount = cardInstances.get(i + j);
            cardInstances.set(i + j, instanceCount + instances);
        }
    }
    let result = 0;
    cardInstances.forEach((value) => (result += value));
    console.log(`Total number of cards: ${result}`);
};
partOne();
partTwo();
