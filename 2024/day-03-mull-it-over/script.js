// From https://adventofcode.com/2024/day/3
const fs = require('fs');
const path = require('path');
const setup = (inputPath = 'input.txt') => {
    return fs
        .readFileSync(path.join(__dirname, inputPath), { encoding: 'utf-8' })
        .split('\n');
};
const partOne = () => {
    const input = setup().join('');
    const validMul = /mul\(\d{1,3}\,\d{1,3}\)/g;
    const validMuls = [...input.matchAll(validMul)]
        .map((x) => x[0])
        .map((x) =>
            x
                .replace('mul(', '')
                .replace(')', '')
                .replace(',', ' ')
                .split(' ')
                .map((xx) => +xx)
        )
        .map((x) => x[0] * x[1]);
    const totalMuls = validMuls.reduce((prev, curr) => prev + curr, 0);
    console.log(`The sum of the valid mul operators is: ${totalMuls}`);
};
const partTwo = () => {
    const input = setup().join('');
    const validMul = /mul\(\d{1,3}\,\d{1,3}\)/g;
    const validDo = /do\(\)/g;
    const validDont = /don't\(\)/g;
    const validMuls = [...input.matchAll(validMul)];
    const validDos = [...input.matchAll(validDo)];
    const validDonts = [...input.matchAll(validDont)];
    const allValid = [...validMuls, ...validDos, ...validDonts]
        .sort((a, b) => a['index'] - b['index'])
        .map((x) => x[0]);

    let doing = true;
    const allValidDoing = allValid.reduce((prev, curr) => {
        if (curr === 'do()') {
            doing = true;
        } else if (curr === "don't()") {
            doing = false;
        } else {
            if (doing) {
                prev.push(curr);
            }
        }
        return prev;
    }, []);
    const allValidDoingResult = allValidDoing
        .map((x) =>
            x
                .replace('mul(', '')
                .replace(')', '')
                .replace(',', ' ')
                .split(' ')
                .map((xx) => +xx)
        )
        .map((x) => x[0] * x[1]);
    const totalMuls = allValidDoingResult.reduce(
        (prev, curr) => prev + curr,
        0
    );
    console.log(`The sum of the valid doing mul operators is: ${totalMuls}`);
};
partOne();
partTwo();
