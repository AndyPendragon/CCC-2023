const fs = require('fs');

function getTileType(map, x, y) {
  if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) {
    return 'Invalid';
  }
  return map[y][x];
}

const input = fs.readFileSync('./data/level1_5.in', 'utf-8').split('\n');
const size = parseInt(input[0]);
const map = input.slice(1, size + 1).map(row => row.trim());
const numCoordinates = parseInt(input[size + 1]);
const coordinates = input.slice(size + 2, size + 2 + numCoordinates).map(coord => coord.split(',').map(Number));

const result = coordinates.map(coord => getTileType(map, coord[0], coord[1]));

fs.writeFile('./data/level1_5.out', result.join('\n'), 'utf-8', (err) => {
  if (err) {
    console.error('Error writing output file:', err);
  } else {
    console.log('Output written');
  }
});