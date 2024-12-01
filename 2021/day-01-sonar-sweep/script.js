// From https://adventofcode.com/2021/day/1
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const partOne = () => {
    const input = setup().map((depth) => +depth);
    let numberIncreased = 0;
    for (let i = 1; i < input.length; i++) {
        const previous = input[i - 1];
        const current = input[i];
        if (current > previous) {
            numberIncreased++;
        }
    }
    console.log(`Number of increases: ${numberIncreased}`);
};

const partTwo = () => {
    const input = setup().map((depth) => +depth);
    let numberIncreased = 0;
    for (let i = 3; i < input.length; i++) {
        const windowA = input[i - 3] + input[i - 2] + input[i - 1];
        const windowB = input[i - 2] + input[i - 1] + input[i];
        if (windowB > windowA) {
            numberIncreased++;
        }
    }
    console.log(`Number of increases: ${numberIncreased}`);
};

partOne();
partTwo();
