// From https://adventofcode.com/2020/day/13
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const absoluteModulo = (a, b) => ((a % b) + b) % b;

const getInverse = (a, mod) => {
    const b = a % mod;
    for (let i = 1; i < mod; i++) {
        if ((b * i) % mod === 1) return i;
    }
    return 1;
}

const chineseRemainderTheorem = (buses) => {
    // Thank you, https://en.wikipedia.org/wiki/Chinese_remainder_theorem
    // Thank you, https://codesandbox.io/s/focused-lewin-subsf?file=/src/index.js
    // x = a (mod n)
    // x - some unknown, constant value of t
    // a - bus number MINUS offest % bus number
    // n - cycle length (= bus number)
    
    // To solve each row, we also need
    // N - all N's added up
    // nU = N / n
    // i - inverse modulo

    const N = buses.reduce((acc, curr) => {
        if (curr === 'x') return acc;
        return acc === null ? curr : acc * curr;
    }, null);
    const sum = buses.reduce((acc, curr, idx) => {
        if (curr === 'x') return acc;
        const a = absoluteModulo(curr - idx, curr);
        const nU = N / curr;
        const inverse = getInverse(nU, curr);
        return acc + BigInt(BigInt(a) * BigInt(nU) * BigInt(inverse));
    }, 0n);
    return sum % BigInt(N);
};

const partOne = () => {
    const input = setup();
    const time = +input[0];
    const buses = input[1].split(',').filter((bus) => bus !== 'x').map((item) => +item);
    const arrivalTimes = buses.map((bus) => (Math.ceil(time / bus) * bus) - time);
    const minTime = Math.min.apply(null, arrivalTimes);
    const targetBus = buses[arrivalTimes.indexOf(minTime)];
    console.log(`ID (${targetBus}) * wait time (${minTime} mins): ${targetBus * minTime}`);
};

const partTwo = () => {
    let [, buses] = setup();
    buses = buses.split(',').map((bus) => bus === 'x' ? 'x' : +bus);
    const baseTime = chineseRemainderTheorem(buses);
    console.log(`Base time index: ${baseTime}`);
};

partOne();
partTwo();
