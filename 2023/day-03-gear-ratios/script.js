// From https://adventofcode.com/2023/day/3
const fs = require('fs');
const WindowEventHandlersImpl = require('jsdom/lib/jsdom/living/nodes/WindowEventHandlers-impl');
const path = require('path');
const setup = (inputPath = 'input.txt') => {
    return fs
        .readFileSync(path.join(__dirname, inputPath), { encoding: 'utf-8' })
        .split('\n');
};

class Grid {
    data = new Map();
    add = (position, value) => {
        this.data.set(`${position.x},${position.y}`, { value, position });
    };
    get = (position) => {
        this.data.get(`${position.x},${position.y}`);
    };
    forEach = (callback) => {
        this.data.forEach(callback);
    };
}

const boundary = (coordinate, width) => ({
    min: {
        x: coordinate.x - 1,
        y: coordinate.y - 1,
    },
    max: {
        x: coordinate.x + width,
        y: coordinate.y + 1,
    },
});
const within = (coordinate, bounds) =>
    coordinate.x >= bounds.min.x &&
    coordinate.y >= bounds.min.y &&
    coordinate.x <= bounds.max.x &&
    coordinate.y <= bounds.max.y;

const findParts = (partNumbers, symbols) => {
    const parts = [];
    partNumbers.forEach((number) => {
        symbols.forEach((symbol) => {
            if (
                within(
                    symbol.position,
                    boundary(number.position, number.value.toString().length)
                )
            ) {
                parts.push(number.value);
            }
        });
    });
    return parts;
};

const parseGrid = (lines) => {
    const partNumbers = new Grid();
    const symbols = new Grid();
    lines.forEach((line, y) => {
        let digits = '';
        let numberX = -1;
        for (let x = 0; x < lines.length; x++) {
            const character = line.charAt(x);
            if (character === '.') {
                // Empty
            } else if (!Number.isNaN(Number(character))) {
                digits += character;
                numberX = numberX === -1 ? x : numberX;
                if (x < line.length - 1) {
                    continue;
                }
            } else {
                symbols.add({ x, y }, character);
            }
            if (digits.length > 0) {
                partNumbers.add({ x: numberX, y }, +digits);
                digits = '';
                numberX = -1;
            }
        }
    });
    return { partNumbers, symbols };
};

const partOne = () => {
    const input = setup();
    const { partNumbers, symbols } = parseGrid(input);
    const result = findParts(partNumbers, symbols).reduce((p, c) => p + c, 0);
    console.log(`The sum of part numbers is: ${result}`);
};

const partTwo = () => {
    const input = setup();
    let result = 0;
    const { partNumbers, symbols } = parseGrid(input);
    const parts = findParts(partNumbers, symbols);
    symbols.forEach((symbol) => {
        const adjacent = [];
        partNumbers.forEach((number) => {
            if (parts.includes(number.value)) {
                if (
                    within(
                        symbol.position,
                        boundary(
                            number.position,
                            number.value.toString().length
                        )
                    )
                ) {
                    adjacent.push(number.value);
                }
            }
        });
        if (adjacent.length === 2) {
            result += adjacent[0] * adjacent[1];
        }
    });
    console.log(`The sum of gear ratios is: ${result}`);
};

partOne();
partTwo();
