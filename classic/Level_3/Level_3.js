const fs = require('fs');

// Function to check if a position has been visited
function hasVisited(visited, position) {
  return visited.has(position);
}

// Function to calculate the dot product of two vectors
function dotProduct(vector1, vector2) {
  return vector1[0] * vector2[0] + vector1[1] * vector2[1];
}

// Function to check if the vectors are orthogonal
function areOrthogonal(vector1, vector2) {
  return dotProduct(vector1, vector2) === 0;
}

// Function to check if there are intersections in a route
function hasIntersections(route) {
  const visited = new Set();
  const positions = route.split(' ').map(coord => coord.split(',').map(Number));

  let lastPosition = positions[0];

  for (let i = 1; i < positions.length; i++) {
    let currentPosition = positions[i];

    if (hasVisited(visited, currentPosition)) {
      return 'INVALID'; // There is an intersection
    }

    const vector1 = [lastPosition[0] - currentPosition[0], lastPosition[1] - currentPosition[1]];

    if (i >= 2) {
      const vector2 = [positions[i - 2][0] - positions[i - 1][0], positions[i - 2][1] - positions[i - 1][1]];

      if (areOrthogonal(vector1, vector2)) {
        return 'INVALID'; // There is an intersection
      }
    }

    visited.add(currentPosition);
    lastPosition = currentPosition;
  }

  return 'VALID'; // No intersections
}

// Read input from a file
const input = fs.readFileSync('.data/level3_1', 'utf-8').split('\n');
const numRoutes = parseInt(input[1]);
const routeLines = input.slice(2, 2 + numRoutes);

// Check for intersections in each route
const result = routeLines.map(route => hasIntersections(route));

// Write the results to an output file
fs.writeFileSync('output.txt', result.join('\n'), 'utf-8');
console.log(result.join('\n'));
