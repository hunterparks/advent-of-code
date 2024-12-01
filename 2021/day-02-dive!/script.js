// From https://adventofcode.com/2021/day/2
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const partOne = () => {
    const input = setup();
    let position = 0;
    let depth = 0;
    for (let command of input) {
        const [direction, quantity] = command.split(' ');
        const amount = +quantity;
        switch (direction) {
            case 'forward':
                position += amount;
                break;
            case 'up':
                depth -= amount;
                break;
            case 'down':
                depth += amount;
                break;
            default:
                break;
        }
    }
    console.log(`Final position: ${position * depth}`);
};

const partTwo = () => {
    const input = setup();
    let position = 0;
    let depth = 0;
    let aim = 0;
    for (let command of input) {
        const [direction, quantity] = command.split(' ');
        const amount = +quantity;
        switch (direction) {
            case 'forward':
                position += amount;
                depth += aim * amount;
                break;
            case 'up':
                aim -= amount;
                break;
            case 'down':
                aim += amount;
                break;
            default:
                break;
        }
    }
    console.log(`Final position: ${position * depth}`);
};

partOne();
partTwo();
