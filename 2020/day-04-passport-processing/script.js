// From https://adventofcode.com/2020/day/4
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n\n');
};

const partOne = () => {
    const input = setup();
    let validPassports = 0;
    for (data of input) {
        const passportData = data.replace(/\s+/g, ' ').split(' ');
        let passport = {};
        for (item of passportData) {
            const [ key, value ] = item.split(':');
            passport[key] = value;
        }
        if (!passport.byr) continue;
        const birthYear = parseInt(passport.byr);
        if (birthYear < 1920 || birthYear > 2002) continue;
        if (!passport.iyr) continue;
        const issueYear = parseInt(passport.iyr);
        if (issueYear < 2010 || issueYear > 2020) continue;
        if (!passport.eyr) continue;
        const expYear = parseInt(passport.eyr);
        if (expYear < 2020 || expYear > 2030) continue;
        if (!passport.hgt) continue;
        const heightMatch = passport.hgt.match(/(\d+)([a-z]+)/);
        if (!heightMatch) continue;
        const [, heightValue, heightUnit] = heightMatch;
        if (heightUnit === 'cm') {
            if (heightValue < 150 || heightValue > 193) continue;
        } else if (heightUnit === 'in') {
            if (heightValue < 59 || heightValue > 76) continue;
        } else {
            continue;
        }
        if (!passport.hcl) continue;
        const hclMatch = passport.hcl.match(/\#([0-9a-f]+)/);
        if (hclMatch === null || hclMatch[1].length !== 6) continue;
        if (!passport.ecl) continue;
        if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl)) continue;
        if (!passport.pid) continue;
        if (passport.pid.length !== 9 || parseInt(passport.pin) === NaN) continue;
        validPassports++;
    }
    console.log(`Valid passports: ${validPassports}`);
};

const partTwo = () => {
    const input = setup();
};

partOne();
partTwo();
