import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) => readFile(file)
  .map(line => line.split('').map(item => parseInt(item, 10)));

const increment = (table: number[][], a: number, b: number) => {
  if (a < 0 || a === table.length || b < 0 || b === table[0].length) return;

  table[a][b]++;
  if (table[a][b] === 10) {
    for (let i = a-1; i <= a+1; i++) {
      for (let j = b-1; j <= b+1; j++) {
        increment(table, i, j);
      }
    }
  }
}

const doStep = (table: number[][]): number => {
  const nRows = table.length;
  const nColumns = table[0].length;
  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nColumns; j++) {
      increment(table, i, j);
    }
  }

  let nFlashes = 0;

  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nColumns; j++) {
      if (table[i][j] > 9) {
        nFlashes++;
        table[i][j] = 0;
      }
    }
  }

  return nFlashes;
};

export const runPart1 = (file?: string) => {
  let table = getFileData(file);
  let nFlashes = 0;
  for (let i = 0; i < 100; i++) {
    nFlashes += doStep(table);
  }
  return nFlashes;
}

export const runPart2 = (file?: string) => {
  const table = getFileData(file);
  let nSteps = 0;
  do {
    nSteps++;
  } while (doStep(table) !== 100)

  return nSteps;
}
