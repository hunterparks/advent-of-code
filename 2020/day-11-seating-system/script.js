// From https://adventofcode.com/2020/day/11
const fs = require('fs');

const setup = (inputPath = 'input.txt') => {
    return fs.readFileSync(inputPath, { encoding: 'utf-8' }).split('\n');
};

const getFirstDirection = (map, values, _x, _y, [h , v]) => {
    let x = _x + h;
    let y = _y + v;
    while (map[y] && map[y][x]) {
        if (values.includes(map[y][x])) {
            return [x, y];
        }
        x += h;
        y += v;
    }
};

const getVisualNeighbors = (map, x, y) => {
    return [
        getFirstDirection(map, ['#', 'L'], x, y, [ 0, -1]), // Top
        getFirstDirection(map, ['#', 'L'], x, y, [ 1, -1]), // Top Right
        getFirstDirection(map, ['#', 'L'], x, y, [ 1,  0]), // Right
        getFirstDirection(map, ['#', 'L'], x, y, [ 1,  1]), // Bottom Right
        getFirstDirection(map, ['#', 'L'], x, y, [ 0,  1]), // Bottom
        getFirstDirection(map, ['#', 'L'], x, y, [-1,  1]), // Bottom Left
        getFirstDirection(map, ['#', 'L'], x, y, [-1,  0]), // Left
        getFirstDirection(map, ['#', 'L'], x, y, [-1, -1])  // Top Left
    ].filter((v) => v)
    .filter(([_x, _y]) => typeof (map[_y] && map[_y][_x]) !== 'undefined')
    .map(([_x, _y]) => map[_y][_x]); 
};

const getNeighbors = (map, x, y) => {
    let neighbors = [
        [x    , y - 1], // Top
        [x + 1, y - 1], // Top Right
        [x + 1, y    ], // Right
        [x + 1, y + 1], // Bottom Right
        [x    , y + 1], // Bottom
        [x - 1, y + 1], // Bottom Left
        [x - 1, y    ], // Left
        [x - 1, y - 1]  // Top Left
    ].filter(([_x, _y]) => typeof (map[_y] && map[_y][_x]) !== 'undefined');
    return neighbors.map(([_x, _y]) => map[_y][_x]);
};

const processMap = (map, directNeighbors = true) => {
    let currentMap = [...map];
    let changed;
    do {
        changed = false;
        let nextMap = Array(currentMap.length)
            .fill()
            .map(_ => Array(currentMap[0].length).fill());
        
        for (let y = 0; y < currentMap.length; y++) {
            for (let x = 0; x < currentMap[0].length; x++) {
                let seat = currentMap[y][x];
                let neighbors = directNeighbors
                    ? getNeighbors(currentMap, x, y)
                    : getVisualNeighbors(currentMap, x, y);
                let occupied_neighbors = 0;
                let empty_neighbors = 0;
                neighbors.forEach((neighbor) => {
                    if (neighbor === '#') occupied_neighbors++;
                    else if (neighbor === 'L') empty_neighbors++;
                });
                if (seat === '.') {
                    nextMap[y][x] = '.';
                } else if (seat === 'L') {
                    if (occupied_neighbors === 0) {
                        nextMap[y][x] = '#';
                        changed = true;
                    } else nextMap[y][x] = 'L';
                } else if (seat === '#') {
                    if (occupied_neighbors >= (directNeighbors ? 4 : 5)) {
                        nextMap[y][x] = 'L';
                        changed = true;
                    } else nextMap[y][x] = '#';
                }
            }
        }
        currentMap = nextMap;
    } while(changed);
    return currentMap;
};

const partOne = () => {
    const input = setup();
    const finalMap = processMap(input).map((item) => item.join('')).join('');
    const occupiedCount = finalMap.split('').filter((item) => item === '#').length;
    console.log(`Occupied Count: ${occupiedCount}`);
};

const partTwo = () => {
    const input = setup();
    const finalMap = processMap(input, false).map((item) => item.join('')).join('');
    const occupiedCount = finalMap.split('').filter((item) => item === '#').length;
    console.log(`Occupied Count: ${occupiedCount}`);
};

partOne();
partTwo();