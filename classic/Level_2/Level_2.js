const fs = require('fs');

// Fonction pour déterminer si deux coordonnées sont sur la même île
function areCoordinatesOnSameIsland(map, x1, y1, x2, y2, visited) {
  if (x1 < 0 || x1 >= map[0].length || y1 < 0 || y1 >= map.length || x2 < 0 || x2 >= map[0].length || y2 < 0 || y2 >= map.length) {
    return false;
  }

  if (visited[y1][x1] || visited[y2][x2] || map[y1][x1] !== 'L' || map[y2][x2] !== 'L') {
    return false;
  }

  visited[y1][x1] = true;

  if (x1 === x2 && y1 === y2) {
    return true;
  }

  return (
    areCoordinatesOnSameIsland(map, x1 + 1, y1, x2, y2, visited) ||
    areCoordinatesOnSameIsland(map, x1 - 1, y1, x2, y2, visited) ||
    areCoordinatesOnSameIsland(map, x1, y1 + 1, x2, y2, visited) ||
    areCoordinatesOnSameIsland(map, x1, y1 - 1, x2, y2, visited)
  );
}

// Lecture de l'entrée depuis le fichier
const inputData = fs.readFileSync('./data/level2_5.in', 'utf-8');
const sanitizedInputData = inputData.replace(/,/g, ' '); // Remplace les virgules par des espaces
const input = sanitizedInputData.split('\n');

const size = parseInt(input[0]);
const map = input.slice(1, size + 1).map(row => row.trim());
const numPairs = parseInt(input[size + 1]);
const coordinates = input.slice(size + 2, size + 2 + numPairs).map(pair => pair.split(' ').map(Number));

// Création d'une matrice pour garder une trace des cases visitées
const visited = Array.from({ length: size }, () => Array(size).fill(false));

// Déterminer si chaque paire de coordonnées est sur la même île
const result = coordinates.map(pair => {
  const [x1, y1, x2, y2] = pair;
  visited.forEach(row => row.fill(false)); // Réinitialiser la matrice de visite
  return areCoordinatesOnSameIsland(map, x1, y1, x2, y2, visited) ? 'SAME' : 'DIFFERENT';
});

// Écrire les résultats dans le fichier de sortie
fs.writeFileSync('./data/level2_5.out', result.join('\n'), 'utf-8');
console.log(result.join('\n'));