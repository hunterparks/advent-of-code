// From https://adventofcode.com/2024/day/2
const fs = require('fs');
const path = require('path');
const setup = (inputPath = 'input.txt') => {
    return fs
        .readFileSync(path.join(__dirname, inputPath), { encoding: 'utf-8' })
        .split('\n');
};
const isDecreasingBy = (array, lowerLimit, upperLimit) => {
    let isDecreasing = true;
    for (let i = 0; i < array.length - 1; i++) {
        const current = array[i];
        const next = array[i + 1];
        if (next <= current - lowerLimit && next >= current - upperLimit) {
            continue;
        }
        isDecreasing = false;
    }
    return isDecreasing;
};
const isDecreasingByTolerant = (array, lowerLimit, upperLimit) => {
    if (isDecreasingBy(array, lowerLimit, upperLimit)) {
        return true;
    }
    for (let i = 0; i < array.length; i++) {
        const testArray = [...array];
        testArray.splice(i, 1);
        if (isDecreasingBy(testArray, lowerLimit, upperLimit)) {
            return true;
        }
    }
    return false;
};
const isIncreasingBy = (array, lowerLimit, upperLimit) => {
    let isIncreasing = true;
    for (let i = 0; i < array.length - 1; i++) {
        const current = array[i];
        const next = array[i + 1];
        if (next >= current + lowerLimit && next <= current + upperLimit) {
            continue;
        }
        isIncreasing = false;
    }
    return isIncreasing;
};
const isIncreasingByTolerant = (array, lowerLimit, upperLimit) => {
    if (isIncreasingBy(array, lowerLimit, upperLimit)) {
        return true;
    }
    for (let i = 0; i < array.length; i++) {
        const testArray = [...array];
        testArray.splice(i, 1);
        if (isIncreasingBy(testArray, lowerLimit, upperLimit)) {
            return true;
        }
    }
    return false;
};
const partOne = () => {
    const input = setup();
    const reports = input.map((x) => x.split(' ').map((xx) => +xx));
    const evaluation = reports.map((x) =>
        isIncreasingBy(x, 1, 3) || isDecreasingBy(x, 1, 3) ? 1 : 0
    );
    const evaluationSafeTotal = evaluation.reduce(
        (prev, curr) => prev + curr,
        0
    );
    console.log(`The sum of safe reports is: ${evaluationSafeTotal}`);
};
const partTwo = () => {
    const input = setup();
    const reports = input.map((x) => x.split(' ').map((xx) => +xx));
    const evaluation = reports.map((x) =>
        isIncreasingByTolerant(x, 1, 3) || isDecreasingByTolerant(x, 1, 3)
            ? 1
            : 0
    );
    const evaluationSafeTotal = evaluation.reduce(
        (prev, curr) => prev + curr,
        0
    );
    console.log(`The sum of safe reports is: ${evaluationSafeTotal}`);
};
partOne();
partTwo();
