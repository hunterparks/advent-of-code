// From https://adventofcode.com/2023/day/1
const fs = require('fs');
const path = require('path');
const setup = (inputPath = 'input.txt') => {
    return fs
        .readFileSync(path.join(__dirname, inputPath), { encoding: 'utf-8' })
        .split('\n');
};
const partOne = () => {
    const input = setup('sample.txt');
    const numbers = input.map((value) => {
        const firstNumber = value.split('').find((v) => !Number.isNaN(+v));
        const lastNumber = value.split('').findLast((v) => !Number.isNaN(+v));
        return +`${firstNumber}${lastNumber}`;
    });
    const sum = numbers.reduce((s, v) => s + v);
    console.log(`The sum is: ${sum}`);
};
const partTwo = () => {
    const input = setup('sample.txt');
    const numbers = input.map((value) => {
        let newValue = value.replaceAll('one', 'o1ne');
        newValue = newValue.replaceAll('two', 't2wo');
        newValue = newValue.replaceAll('three', 't3hree');
        newValue = newValue.replaceAll('four', 'f4our');
        newValue = newValue.replaceAll('five', 'f5ive');
        newValue = newValue.replaceAll('six', 's6ix');
        newValue = newValue.replaceAll('seven', 's7even');
        newValue = newValue.replaceAll('eight', 'e8ight');
        newValue = newValue.replaceAll('nine', 'n9ine');
        const firstNumber = newValue.split('').find((v) => !Number.isNaN(+v));
        const lastNumber = newValue
            .split('')
            .findLast((v) => !Number.isNaN(+v));
        return +`${firstNumber}${lastNumber}`;
    });
    const sum = numbers.reduce((s, v) => s + v);
    console.log(`The sum is: ${sum}`);
};
partOne();
partTwo();
