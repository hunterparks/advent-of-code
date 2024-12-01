// From https://adventofcode.com/2021/day/3
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const partOne = () => {
    const input = setup();
    let bits = [];
    let gamma = '';
    let epsilon = '';
    input.forEach((line) => {
        line.split('').forEach((char, index) => {
            if (!bits[index]) {
                bits[index] = [];
            }
            bits[index].push(char);
        });
    });
    bits.forEach((bit) => {
        const numZeros = bit.filter((b) => b === '0').length;
        const numOnes = bit.filter((b) => b === '1').length;
        if (numZeros > numOnes) {
            gamma += '0';
            epsilon += '1';
        } else {
            gamma += '1';
            epsilon += '0';
        }
    });
    const gamma10 = parseInt(gamma, 2);
    const epsilon10 = parseInt(epsilon, 2);
    console.log(`Power consumption: ${gamma10 * epsilon10}`);
};

const parseInput = (input, index, isOxyGen) => {
    if (input.length <= 1) return input;
    let bits = [];
    input.forEach((line) => {
        line.split('').forEach((char, index) => {
            if (!bits[index]) {
                bits[index] = [];
            }
            bits[index].push(char);
        });
    });
    const bit = bits[index];
    const numZeros = bit.filter((b) => b === '0').length;
    const numOnes = bit.filter((b) => b === '1').length;
    if (isOxyGen) {
        if (numZeros > numOnes) {
            return parseInput(
                input.filter((i) => i.charAt(index) === '0'),
                index + 1,
                isOxyGen
            );
        } else {
            return parseInput(
                input.filter((i) => i.charAt(index) === '1'),
                index + 1,
                isOxyGen
            );
        }
    } else {
        // CO2 scrub
        if (numZeros > numOnes) {
            return parseInput(
                input.filter((i) => i.charAt(index) === '1'),
                index + 1,
                isOxyGen
            );
        } else {
            return parseInput(
                input.filter((i) => i.charAt(index) === '0'),
                index + 1,
                isOxyGen
            );
        }
    }
};

const partTwo = () => {
    const input = setup(); //'sample.txt');
    let oxyGenInput = parseInput([...input], 0, true);
    let co2ScrubInput = parseInput([...input], 0, false);
    const oxyGenRating = parseInt(oxyGenInput[0], 2);
    const co2ScrubRating = parseInt(co2ScrubInput[0], 2);
    console.log(`Life support: ${oxyGenRating * co2ScrubRating}`);
};

partOne();
partTwo();
