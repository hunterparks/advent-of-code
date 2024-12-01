// From https://adventofcode.com/2020/day/9
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const parseXmas = (dataStream, preambleSize) => {
    for (let i = preambleSize; i < dataStream.length; i++) {
        const buffer = dataStream.slice(i - preambleSize, i);
        const current = dataStream[i];
        let valid = false;
        for (let j = buffer.length - 1; j >= 0; j--) {
            const one = buffer[j];
            for (let k = buffer.length - 1; k >= 0; k--) {
                if (j !== k) {
                    const two = buffer[k];
                    valid = one + two === current;
                    if (valid) break;
                }
            }
            if (valid) break;
        }
        if (!valid) return current;
    }
};

const findEncryptionWeakness = (dataStream, invalidDigit) => {
    for (let i = 0; i < dataStream.length - 2; i++) {
        for (let j = i + 3; j < dataStream.length; j++) {
            const subset = dataStream.slice(i, j);
            const sum = subset.reduce((acc, curr) => acc + curr, 0);
            if (sum === invalidDigit) {
                const smallest = Math.min.apply(null, subset);
                const largest = Math.max.apply(null, subset);
                return smallest + largest;
            }
        }
    }
};

const partOne = () => {
    const input = setup().map((item) => +item);
    const invalidDigit = parseXmas(input, 25);
    console.log(`Invalid digit: ${invalidDigit}`);
};

const partTwo = () => {
    const input = setup().map((item) => +item);
    const invalidDigit = parseXmas(input, 25);
    const encryptionWeakness = findEncryptionWeakness(input, invalidDigit);
    console.log(`Encryption weakness: ${encryptionWeakness}`);
};

partOne();
partTwo();
