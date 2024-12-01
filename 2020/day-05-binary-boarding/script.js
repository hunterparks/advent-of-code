// From https://adventofcode.com/2020/day/5
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const partOne = () => {
    const input = setup();
    let boardingPasses = [];
    for (pass of input) {
        const rowData = pass.slice(0, 7);
        const colData = pass.slice(7);
        let minRow = 0;
        let maxRow = 128;
        for (rowInfo of rowData) {
            if (rowInfo === 'B') {
                minRow += (maxRow - minRow) / 2;
            }
            if (rowInfo === 'F') {
                maxRow -= (maxRow - minRow) / 2;
            }
        }
        const row = minRow;
        let minCol = 0;
        let maxCol = 8;
        for (colInfo of colData) {
            if (colInfo === 'R') {
                minCol += (maxCol - minCol) / 2;
            }
            if (colInfo === 'L') {
                maxCol -= (maxCol - minCol) / 2;
            }
        }
        const col = minCol;
        boardingPasses.push({ row, col, id: row * 8 + col });
    }
    console.log(`Highest Seat ID: ${boardingPasses.sort((a, b) => b.id - a.id)[0].id}`);
};

const partTwo = () => {const input = setup();
    let boardingPasses = [];
    for (pass of input) {
        const rowData = pass.slice(0, 7);
        const colData = pass.slice(7);
        let minRow = 0;
        let maxRow = 128;
        for (rowInfo of rowData) {
            if (rowInfo === 'B') {
                minRow += (maxRow - minRow) / 2;
            }
            if (rowInfo === 'F') {
                maxRow -= (maxRow - minRow) / 2;
            }
        }
        const row = minRow;
        let minCol = 0;
        let maxCol = 8;
        for (colInfo of colData) {
            if (colInfo === 'R') {
                minCol += (maxCol - minCol) / 2;
            }
            if (colInfo === 'L') {
                maxCol -= (maxCol - minCol) / 2;
            }
        }
        const col = minCol;
        boardingPasses.push({ row, col, id: row * 8 + col });
    }
    const sortedBoardingPasses = boardingPasses.sort((a, b) => b.id - a.id);
    let myId;
    for (let i = 0; i < sortedBoardingPasses.length; i++) {
        if (i + 1 < sortedBoardingPasses.length) {
            const thisId = sortedBoardingPasses[i].id;
            const nextId = sortedBoardingPasses[i + 1].id;
            if (thisId - 1 !== nextId) {
                myId = thisId - 1;
                break;
            }
        }
    }
    console.log(`Your Seat ID: ${myId}`);
};

partOne();
partTwo();
