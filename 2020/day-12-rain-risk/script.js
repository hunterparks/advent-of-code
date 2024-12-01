// From https://adventofcode.com/2020/day/12
const fs = require('fs');

const X = 0;
const Y = 1;

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const degreeToRadian = (degree) => degree * (Math.PI / 180);

const calculateManhattanDistance = (instructions, partOne = true) => {
    const directions = {
        N: [ 0, -1],
        S: [ 0,  1],
        E: [ 1,  0],
        W: [-1,  0]
    }
    let position = [0, 0];
    let direction = [1, 0];
    let waypoint = [10, -1];
    for ([command, value] of instructions) {
        if (directions[command]) {
            let _v = [...directions[command]];
            _v[X] *= value;
            _v[Y] *= value;
            if (partOne) {
                position[X] += _v[X];
                position[Y] += _v[Y];
            } else {
                waypoint[X] += _v[X];
                waypoint[Y] += _v[Y];
            }
        } else if (command === 'L') {
            const rad = degreeToRadian(-value);
            const _x = (partOne ? direction[X] : waypoint[X]);
            const _y = (partOne ? direction[Y] : waypoint[Y]);
            if (partOne) {
                direction[X] = Math.round(10000 * (_x * Math.cos(rad) - _y * Math.sin(rad))) / 10000;
                direction[Y] = Math.round(10000 * (_x * Math.sin(rad) + _y * Math.cos(rad))) / 10000;
            } else {
                waypoint[X] = Math.round(10000 * (_x * Math.cos(rad) - _y * Math.sin(rad))) / 10000;
                waypoint[Y] = Math.round(10000 * (_x * Math.sin(rad) + _y * Math.cos(rad))) / 10000;
            }
        } else if (command === 'R') {
            const rad = degreeToRadian(value);
            const _x = (partOne ? direction[X] : waypoint[X]);
            const _y = (partOne ? direction[Y] : waypoint[Y]);
            if (partOne) {
                direction[X] = Math.round(10000 * (_x * Math.cos(rad) - _y * Math.sin(rad))) / 10000;
                direction[Y] = Math.round(10000 * (_x * Math.sin(rad) + _y * Math.cos(rad))) / 10000;
            } else {
                waypoint[X] = Math.round(10000 * (_x * Math.cos(rad) - _y * Math.sin(rad))) / 10000;
                waypoint[Y] = Math.round(10000 * (_x * Math.sin(rad) + _y * Math.cos(rad))) / 10000;
            }
        } else if (command === 'F') {
            let _dir = (partOne ? [...direction] : [...waypoint]);
            if (partOne) {
                _dir[X] *= value;
                _dir[Y] *= value;
            }
            for (let i = 0; i < value; i++) {
                position[X] += _dir[X];
                position[Y] += _dir[Y];
                if (partOne) break;
            }
        }
    }
    return Math.abs(position[X]) + Math.abs(position[Y]);
};

const partOne = () => {
    const input = setup().map((item) => [item.charAt(0), +item.slice(1)]);
    const manhattanDistance = calculateManhattanDistance(input);
    console.log(`Manhattan distance: ${manhattanDistance}`);
};

const partTwo = () => {
    const input = setup().map((item) => [item.charAt(0), +item.slice(1)]);
    const manhattanDistance = calculateManhattanDistance(input, false);
    console.log(`Manhattan distance: ${manhattanDistance}`);
};

partOne();
partTwo();
