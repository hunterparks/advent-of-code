// From https://adventofcode.com/2020/day/10
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const useAdapters = (adapters, targetJoltage) => {
    let countOneDifference = 0;
    let countThreeDiffence = 1;
    let currentJoltage = 0;
    do {
        const minJoltage = currentJoltage + 1;
        const maxJoltage = currentJoltage + 3;
        const availableAdapters = adapters.filter((adapter) => adapter >= minJoltage && adapter <= maxJoltage);
        const nextJoltage = Math.min.apply(null, availableAdapters);
        if (nextJoltage - currentJoltage === 3) countThreeDiffence++;
        if (nextJoltage - currentJoltage === 1) countOneDifference++;
        currentJoltage = nextJoltage;
    } while(currentJoltage < targetJoltage - 3);
    return countOneDifference * countThreeDiffence;
};

// MATH :( - thanks https://github.com/pseale/advent-of-code/blob/main/src/day10/src/index.test.js
const tribonacciSequence = [1, 1, 2, 4, 7, 13, 24, 44, 81, 149];
const getTribonacci = (number) => {
    if (number <= tribonacciSequence.length) {
        return tribonacciSequence[number - 1];
    }
};

const adapterArrangements = (adapters) => {
    const maxJoltage = adapters.sort((a, b) => a - b)[adapters.length - 1];
    const a = adapters.concat([0, maxJoltage + 3]).sort((a, b) => a - b);
    let multiplier = 1;
    let currentRun = 1;
    for (let joltage of a) {
        if (adapters.includes(joltage + 1)) {
            currentRun++;
        } else {
            multiplier *= getTribonacci(currentRun);
            currentRun = 1;
        }
    }
    return multiplier;
};

const partOne = () => {
    const input = setup().map((item) => +item);
    const adapterJoltage = Math.max.apply(null, input) + 3;
    console.log(`Multiplied value: ${useAdapters(input, adapterJoltage)}`);
};

const partTwo = () => {
    const input = setup().map((item) => +item);
    console.log(`Available arrangements: ${adapterArrangements(input)}`);
};

partOne();
partTwo();
