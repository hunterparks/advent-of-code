// From https://adventofcode.com/2020/day/2
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const partOne = () => {
    const input = setup();
    let validPasswords = 0;
    for (data of input) {
        const passwordData = data.match(/(\d+)\-(\d+) ([a-z]): ([a-z]+)/);
        const minChar = parseInt(passwordData[1]);
        const maxChar = parseInt(passwordData[2]);
        const targetChar = passwordData[3];
        const password = passwordData[4];
        const numTargetChars = password.split('').filter((char) => char === targetChar).length;
        if (numTargetChars >= minChar && numTargetChars <= maxChar) {
            validPasswords++;
        }
    }
    console.log(`Valid Passwords: ${validPasswords}`);
};

const partTwo = () => {
    const input = setup();
    let validPasswords = 0;
    for (data of input) {
        const passwordData = data.match(/(\d+)\-(\d+) ([a-z]): ([a-z]+)/);
        const firstPos = parseInt(passwordData[1]);
        const secondPos = parseInt(passwordData[2]);
        const targetChar = passwordData[3];
        const password = passwordData[4];
        const firstChar = password.charAt(firstPos - 1);
        const secondChar = password.charAt(secondPos - 1);
        if ((firstChar === targetChar && secondChar !== targetChar)
            || (firstChar !== targetChar && secondChar === targetChar)) {
            validPasswords++;
        }
    }
    console.log(`Valid Passwords: ${validPasswords}`);
};

partOne();
partTwo();