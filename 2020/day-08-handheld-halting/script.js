// From https://adventofcode.com/2020/day/8
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const runProgram = (program, checkDone = false) => {
    let visitedLines = [];
    let accumulator = 0;
    let programCounter = 0;
    let done = false;
    do {
        if (programCounter >= program.length) {
            done = checkDone && true;
            continue;
        }
        const { op, value } = program[programCounter];
        visitedLines.push(programCounter);
        if (op === 'jmp') {
            programCounter += value;
        } else if (op === 'acc') {
            accumulator += value;
            programCounter++;
        } else if (op === 'nop') {
            programCounter++;
        }
    }
    while(!done && !visitedLines.includes(programCounter));
    return checkDone ? { accumulator, error: !done } : accumulator;
};

const partOne = () => {
    const input = setup();
    const program = input.map((line) => {
        const [ operation, value ] = line.split(' ');
        return { op: operation, value: +value };
    });
    console.log(`Accumulator: ${runProgram(program)}`);
};

const partTwo = () => {
    const input = setup();
    const program = input.map((line) => {
        const [ operation, value ] = line.split(' ');
        return { op: operation, value: +value };
    });
    const nopIdx = program.reduce((acc, curr, index) => {
        if (curr.op === 'nop') acc.push(index);
        return acc;
    }, []);
    const jmpIdx = program.reduce((acc, curr, index) => {
        if (curr.op === 'jmp') acc.push(index);
        return acc;
    }, []);
    let solution = 0;
    for (let index of nopIdx) {
        let tempProgram = JSON.parse(JSON.stringify(program));
        tempProgram[index] = 'jmp';
        const { accumulator, error } = runProgram(tempProgram, true);
        if (error) continue;
        solution = accumulator;
        break;
    }
    if (solution === 0) {
        for (let index of jmpIdx) {
            let tempProgram = JSON.parse(JSON.stringify(program));
            tempProgram[index].op = 'nop';
            const { accumulator, error } = runProgram(tempProgram, true);
            if (error) continue;
            solution = accumulator;
            break;
        }
    }
    console.log(`Accumulator: ${solution}`);
};

partOne();
partTwo();
