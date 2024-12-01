// From https://adventofcode.com/2020/day/6
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n\n');
};

const partOne = () => {
    const input = setup();
    let questionSum = 0;
    for (let group of input) {
        let groupValue = {};
        for (let person of group.split('\n')) {
            for (question of person.split('')) {
                if (groupValue[question]) {
                    groupValue[question] += 1;
                } else {
                    groupValue[question] = 0;
                }
            }
        }
        questionSum += Object.keys(groupValue).length;
    }
    console.log(`Count sum: ${questionSum}`);
};

const partTwo = () => {
    const input = setup();
    let questionSum = 0;
    for (let group of input) {
        let groupValue = {};
        for (let person of group.split('\n')) {
            for (question of person.split('')) {
                if (groupValue[question]) {
                    groupValue[question] += 1;
                } else {
                    groupValue[question] = 1;
                }
            }
        }
        const filteredGroupValue = Object.values(groupValue)
            .filter(value => value === group.split('\n').length);
        questionSum += Object.keys(filteredGroupValue).length;
    }
    console.log(`Count sum: ${questionSum}`);
};

partOne();
partTwo();
