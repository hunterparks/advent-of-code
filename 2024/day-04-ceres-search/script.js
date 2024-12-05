// From https://adventofcode.com/2024/day/4
const fs = require('fs');
const path = require('path');
const setup = (inputPath = 'input.txt') => {
    return fs
        .readFileSync(path.join(__dirname, inputPath), { encoding: 'utf-8' })
        .split('\n');
};
const partOne = () => {
    const input = setup().map((x) => x.split(''));
    const height = input.length;
    const width = input[0].length;
    const puzzleIndex = (x, y) =>
        x < 0 || y < 0 || x >= width || y >= height ? -1 : y * width + x;
    const puzzle = input.reduce((prev, curr) => [...prev, ...curr], []);
    let totalXmas = 0;
    for (let y = 0; y < width; y++) {
        for (let x = 0; x < height; x++) {
            const valueIndex = puzzleIndex(x, y);
            if (valueIndex && puzzle[valueIndex] === 'X') {
                // N
                const nIndex = puzzleIndex(x, y - 1);
                if (nIndex && puzzle[nIndex] === 'M') {
                    const nnIndex = puzzleIndex(x, y - 2);
                    if (nnIndex && puzzle[nnIndex] === 'A') {
                        const nnnIndex = puzzleIndex(x, y - 3);
                        if (nnnIndex && puzzle[nnnIndex] === 'S') {
                            totalXmas++;
                        }
                    }
                }
                // NE
                const neIndex = puzzleIndex(x + 1, y - 1);
                if (neIndex && puzzle[neIndex] === 'M') {
                    const neneIndex = puzzleIndex(x + 2, y - 2);
                    if (neneIndex && puzzle[neneIndex] === 'A') {
                        const neneneIndex = puzzleIndex(x + 3, y - 3);
                        if (neneneIndex && puzzle[neneneIndex] === 'S') {
                            totalXmas++;
                        }
                    }
                }
                // E
                const eIndex = puzzleIndex(x + 1, y);
                if (eIndex && puzzle[eIndex] === 'M') {
                    const eeIndex = puzzleIndex(x + 2, y);
                    if (eeIndex && puzzle[eeIndex] === 'A') {
                        const eeeIndex = puzzleIndex(x + 3, y);
                        if (eeeIndex && puzzle[eeeIndex] === 'S') {
                            totalXmas++;
                        }
                    }
                }
                // SE
                const seIndex = puzzleIndex(x + 1, y + 1);
                if (seIndex && puzzle[seIndex] === 'M') {
                    const seseIndex = puzzleIndex(x + 2, y + 2);
                    if (seseIndex && puzzle[seseIndex] === 'A') {
                        const seseseIndex = puzzleIndex(x + 3, y + 3);
                        if (seseseIndex && puzzle[seseseIndex] === 'S') {
                            totalXmas++;
                        }
                    }
                }
                // S
                const sIndex = puzzleIndex(x, y + 1);
                if (sIndex && puzzle[sIndex] === 'M') {
                    const ssIndex = puzzleIndex(x, y + 2);
                    if (ssIndex && puzzle[ssIndex] === 'A') {
                        const sssIndex = puzzleIndex(x, y + 3);
                        if (sssIndex && puzzle[sssIndex] === 'S') {
                            totalXmas++;
                        }
                    }
                }
                // SW
                const swIndex = puzzleIndex(x - 1, y + 1);
                if (swIndex && puzzle[swIndex] === 'M') {
                    const swswIndex = puzzleIndex(x - 2, y + 2);
                    if (swswIndex && puzzle[swswIndex] === 'A') {
                        const swswswIndex = puzzleIndex(x - 3, y + 3);
                        if (swswswIndex && puzzle[swswswIndex] === 'S') {
                            totalXmas++;
                        }
                    }
                }
                // W
                const wIndex = puzzleIndex(x - 1, y);
                if (wIndex && puzzle[wIndex] === 'M') {
                    const wwIndex = puzzleIndex(x - 2, y);
                    if (wwIndex && puzzle[wwIndex] === 'A') {
                        const wwwIndex = puzzleIndex(x - 3, y);
                        if (wwwIndex && puzzle[wwwIndex] === 'S') {
                            totalXmas++;
                        }
                    }
                }
                // NW
                const nwIndex = puzzleIndex(x - 1, y - 1);
                if (nwIndex && puzzle[nwIndex] === 'M') {
                    const nwnwIndex = puzzleIndex(x - 2, y - 2);
                    if (nwnwIndex && puzzle[nwnwIndex] === 'A') {
                        const nwnwnwIndex = puzzleIndex(x - 3, y - 3);
                        if (nwnwnwIndex && puzzle[nwnwnwIndex] === 'S') {
                            totalXmas++;
                        }
                    }
                }
            }
        }
    }
    console.log(`The total number of XMAS: ${totalXmas}`);
};
const partTwo = () => {
    const input = setup().map((x) => x.split(''));
    const height = input.length;
    const width = input[0].length;
    const puzzleIndex = (x, y) =>
        x < 0 || y < 0 || x >= width || y >= height ? -1 : y * width + x;
    const puzzle = input.reduce((prev, curr) => [...prev, ...curr], []);
    let totalXmas = 0;
    for (let y = 0; y < width; y++) {
        for (let x = 0; x < height; x++) {
            const valueIndex = puzzleIndex(x, y);
            if (valueIndex && puzzle[valueIndex] === 'A') {
                const neIndex = puzzleIndex(x + 1, y - 1);
                const seIndex = puzzleIndex(x + 1, y + 1);
                const swIndex = puzzleIndex(x - 1, y + 1);
                const nwIndex = puzzleIndex(x - 1, y - 1);
                if (neIndex && seIndex && swIndex && nwIndex) {
                    const neValue = puzzle[neIndex];
                    const seValue = puzzle[seIndex];
                    const swValue = puzzle[swIndex];
                    const nwValue = puzzle[nwIndex];
                    if (
                        ((swValue === 'M' && neValue === 'S') ||
                            (swValue === 'S' && neValue === 'M')) &&
                        ((nwValue === 'M' && seValue === 'S') ||
                            (nwValue === 'S' && seValue === 'M'))
                    ) {
                        totalXmas++;
                    }
                }
            }
        }
    }
    console.log(`The total number of X-MAS: ${totalXmas}`);
};
partOne();
partTwo();
