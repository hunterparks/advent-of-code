// From https://adventofcode.com/2023/day/2
const fs = require('fs');
const path = require('path');
const setup = (inputPath = 'input.txt') => {
    return fs
        .readFileSync(path.join(__dirname, inputPath), { encoding: 'utf-8' })
        .split('\n');
};
const partOne = () => {
    const input = setup();
    const maxDice = {
        red: 12,
        green: 13,
        blue: 14,
    };
    const result = input.map((game) => {
        return game
            .split(': ')[1]
            .split('; ')
            .map((roll) => {
                const turns = roll.split(', ');
                return turns.every((turn) => {
                    const [count, color] = turn.split(' ');
                    return maxDice[color] >= +count;
                });
            })
            .every((roll) => roll);
    });
    console.log(
        `The sum of valid game IDs is: ${result.reduce((p, c, i) => {
            return c ? p + (i + 1) : p;
        }, 0)}`
    );
};
const partTwo = () => {
    const input = setup();
    const result = input.map((game) => {
        const counts = {
            red: 0,
            green: 0,
            blue: 0,
        };
        game.split(': ')[1]
            .split('; ')
            .map((roll) => {
                const turns = roll.split(', ');
                turns.forEach((turn) => {
                    const [count, color] = turn.split(' ');
                    if (counts[color] < +count) {
                        counts[color] = +count;
                    }
                });
            });
        return Object.values(counts).reduce((p, c) => p * c, 1);
    });
    console.log(
        `The sum of the game powers is: ${result.reduce((p, c) => p + c, 0)}`
    );
};
partOne();
partTwo();
