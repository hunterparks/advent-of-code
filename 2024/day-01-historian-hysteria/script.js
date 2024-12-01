// From https://adventofcode.com/2024/day/1
const fs = require('fs');
const path = require('path');
const setup = (inputPath = 'input.txt') => {
    return fs
        .readFileSync(path.join(__dirname, inputPath), { encoding: 'utf-8' })
        .split('\n');
};
const partOne = () => {
    const input = setup();
    const [leftList, rightList] = input.reduce(
        (prev, curr) => {
            const [left, right] = curr.split('   ');
            prev[0].push(+left);
            prev[1].push(+right);
            return prev;
        },
        [[], []]
    );
    leftList.sort();
    rightList.sort();
    const distanceList = [];
    for (let i = 0; i < leftList.length; i++) {
        const left = leftList[i];
        const right = rightList[i];
        distanceList.push(Math.abs(left - right));
    }
    const totalDistance = distanceList.reduce((prev, curr) => prev + curr, 0);
    console.log(`The total distance is: ${totalDistance}`);
};
const partTwo = () => {
    const input = setup();
    const [leftList, rightList] = input.reduce(
        (prev, curr) => {
            const [left, right] = curr.split('   ');
            prev[0].push(+left);
            prev[1].push(+right);
            return prev;
        },
        [[], []]
    );
    const similarityList = [];
    const rightFrequencyMap = new Map();
    for (const right of rightList) {
        if (rightFrequencyMap.has(right)) {
            rightFrequencyMap.set(right, rightFrequencyMap.get(right) + 1);
        } else {
            rightFrequencyMap.set(right, 1);
        }
    }
    const leftMatchMap = new Map();
    for (const left of leftList) {
        if (!leftMatchMap.has(left)) {
            const freq = rightFrequencyMap.get(left) || 0;
            leftMatchMap.set(left, left * freq);
        }
        similarityList.push(leftMatchMap.get(left));
    }
    const totalSimilarity = similarityList.reduce(
        (prev, curr) => prev + curr,
        0
    );
    console.log(`The total similary is: ${totalSimilarity}`);
};
partOne();
partTwo();
