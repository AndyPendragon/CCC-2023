const fs = require("fs");

// Create an object to store occurrences of rows.
const rowOccurrences = {};

// Define a function to process each row.
function processRow(row) {
  if (row.trim() !== "") {
    // Check if the row is not empty
    // Count the occurrences of each row.
    if (rowOccurrences[row]) {
      rowOccurrences[row]++;
    } else {
      rowOccurrences[row] = 1;
    }
  }
}

// Read the file using an asynchronous function.
fs.readFile("./level1_1.in.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Split the rows and skip the first row (index 0).
  const rows = data.split(/\r?\n/).slice(1);

  // Iterate over each row and process it with the processRow function.
  rows.forEach((row) => {
    processRow(row);
  });

  console.log("Input:");
  console.log(rows);
  console.log("---");

  console.log("Output:");
  for (const row in rowOccurrences) {
    console.log(`${rowOccurrences[row]} ${row}`);
  }
});