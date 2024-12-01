// From https://adventofcode.com/2020/day/1
const fs = require('fs');

const partOne = () => {
    const input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').map((value) => parseInt(value));
    let first, second = null;
    for (let i = 0; i < input.length; i++) {
        first = input[i];
        for (let j = 0; j < input.length; j++) {
            if (i !== j) {
                second = input[j];
                const sum = first + second;
                if (sum === 2020) {
                    break;
                } else {
                    second = null;
                }
            }
        }
        if (second !== null) break;
    }
    console.log(`${first} + ${second} = ${first + second}`);
    console.log(`${first} * ${second} = ${first * second}`);
};

const partTwo = () => {
    const input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').map((value) => parseInt(value));
    let first, second, third = null;
    for (let i = 0; i < input.length; i++) {
        first = input[i];
        for (let j = 0; j < input.length; j++) {
            second = input[j];
            for (let k = 0; k < input.length; k++) {
                if (i !== j && i !== k && j !== k) {
                    third = input[k];
                    const sum = first + second + third;
                    if (sum === 2020) {
                        break;
                    } else {
                        third = null;
                    }
                }
            }
            if (third !== null) break;
            second = null;
        }
        if (second !== null) break;
    }
    console.log(`${first} + ${second} + ${third} = ${first + second + third}`);
    console.log(`${first} * ${second} * ${third} = ${first * second * third}`);
};

partOne();
partTwo();