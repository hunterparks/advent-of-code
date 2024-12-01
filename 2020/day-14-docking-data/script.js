// From https://adventofcode.com/2020/day/14
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const applyMask = (value, mask, versionTwo = false) => {
    let binaryValue = value.toString(2).padStart(36, '0').split('').map(digit => +digit);
    if (versionTwo) {
        let returnValues = [];
        let xIndicies = [];
        for (let i = 0; i < mask.length; i++) {
            const maskValue = mask[i];
            if (maskValue === '0') {
                // Unchanged
            } else if (maskValue === '1') {
                binaryValue[i] = 1;
            } else if (maskValue === 'X') {
                xIndicies.push(i);
            }
        }
        for (let i = 0; i < 2 ** xIndicies.length; i++) {
            const maskIteration = i.toString(2).padStart(36, '0');
            let binaryValueCopy = [...binaryValue];
            let maskIterationIndex = maskIteration.length - 1;
            for(let j = xIndicies.length - 1; j >= 0; j--) {
                binaryValueCopy[xIndicies[j]] = maskIteration[maskIterationIndex];
                maskIterationIndex--;
            }
            returnValues.push(parseInt(binaryValueCopy.join(''), 2));
        }
        return returnValues;
    } else {
        for (let i = 0; i < mask.length; i++) {
            const maskValue = mask[i];
            if (maskValue === '1') {
                binaryValue[i] = 1
            } else if (maskValue === '0') {
                binaryValue[i] = 0;
            }
        }
        return parseInt(binaryValue.join(''), 2);
    }
};

const getInitializedMemory = (instructions, versionTwo = false) => {
    let memory = [];
    let mask = 'X'.repeat(36);
    for (instruction of instructions) {
        const [, command, data] = instruction.match(/(.+) = (.*)/);
        if (command === 'mask') mask = data;
        else {
            const index = +command.match(/mem\[(.*)\]/)[1];
            if (versionTwo) {
                const addresses = applyMask(index, mask, versionTwo);
                for (address of addresses) {
                    memory[address] = +data;
                }
            } else {
                const value = applyMask(+data, mask);
                memory[index] = value;
            }
        }
    }
    return memory;
};

const partOne = () => {
    const input = setup();
    const initializedMemory = getInitializedMemory(input);
    console.log(`Memory sum: ${initializedMemory.reduce((acc, curr) => acc + curr, 0)}`);
};

const partTwo = () => {
    const input = setup();
    const initializedMemory = getInitializedMemory(input, true);
    console.log(`Memory sum: ${Object.values(initializedMemory).reduce((acc, curr) => acc + curr, 0)}`);
};

partOne();
partTwo();
