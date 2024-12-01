// From https://adventofcode.com/2021/day/4
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const partOne = () => {
    const input = setup();
};

const partTwo = () => {
    const input = setup();
};

partOne();
partTwo();
