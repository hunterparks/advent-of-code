const fs = require('fs');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const PROJECT_URL = 'https://github.com/hunterparks/advent-of-code';
const README = `${__dirname}/README.md`;
const YEAR = new Date().getFullYear();

const createScript = (path, url) => {
    const data = `// From ${url}
const fs = require('fs');
const path = require('path');
const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(path.join(__dirname, inputPath), { encoding: 'utf-8' }).split('\\n');
};
const partOne = () => {
    const input = setup('sample.txt');
};
const partTwo = () => {
    const input = setup('sample.txt');
};
partOne();
partTwo();
`;
    fs.writeFileSync(path, data);
};

const titleToPath = (title) =>
    title
        .toLowerCase()
        .replace(':', '')
        .replace(/ /g, '-')
        .replace(/[0-9]+/, (match) =>
            parseInt(match) < 10 ? `0${match}` : match
        );

const updateReadme = (dayTitle) => {
    let readmeContent = fs.readFileSync(README).toString().split('\n');
    readmeContent.splice(readmeContent.length - 1, 1);

    const dayPath = encodeURIComponent(titleToPath(dayTitle));
    readmeContent.push(
        `-   [${dayTitle}](${PROJECT_URL}/tree/main/${YEAR}/${dayPath})`
    );
    readmeContent.push('</details>');
    fs.writeFileSync(README, readmeContent.join('\n'));
};

const main = () => {
    rl.question('Advent URL? ', (adventUrl) => {
        rl.question('Advent Title? ', (adventTitle) => {
            const adventPath = `${__dirname}/${YEAR}/${titleToPath(
                adventTitle
            )}`;
            fs.mkdirSync(adventPath, { recursive: true });
            updateReadme(adventTitle);
            createScript(`${adventPath}/script.js`, adventUrl);
            fs.writeFileSync(`${adventPath}/input.txt`, '');
            fs.writeFileSync(`${adventPath}/sample.txt`, '');
            rl.close();
        });
    });
    rl.on('close', () => {
        process.exit(0);
    });
};

main();
