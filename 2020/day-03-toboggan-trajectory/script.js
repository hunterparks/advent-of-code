// From https://adventofcode.com/2020/day/3
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const partOne = () => {
    const input = setup();
    const inputWidth = input[0].length;
    let xPos = 0;
    let numTrees = 0;
    for (let i = 1; i < input.length; i++) {
        xPos += 3;
        if (xPos >= inputWidth) {
            xPos -= inputWidth;
        }
        if (input[i].charAt(xPos) === '#') {
            numTrees++;
        }
    }
    console.log(`Number of trees: ${numTrees}`);
};

const partTwo = () => {
    const input = setup();
    const inputWidth = input[0].length;
    const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
    let xPos = 0;
    let numTrees = [];
    for (let i = 0; i < slopes.length; i ++) {
        const [ slopeX, slopeY ] = slopes[i];
        let xPos = 0;
        numTrees[i] = 0;
        for (let j = slopeY; j < input.length; j += slopeY) {
            xPos += slopeX;
            if (xPos >= inputWidth) {
                xPos -= inputWidth;
            }
            if (input[j].charAt(xPos) === '#') {
                numTrees[i]++;
            }
        }
    }
    console.log(`Product of trees: ${numTrees.reduce((acc, curr) => acc * curr)}`);
};

partOne();
partTwo();
