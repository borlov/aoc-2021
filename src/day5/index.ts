import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) => readFile(file).map(item => {
  const match = item.match(/(\d+),(\d+) -> (\d+),(\d+)/);
  return match && [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10), parseInt(match[4], 10)];
}).filter(item => item) as number[][];

type Table = { [key: string]: number };

const addItem = (result: Table, x: number, y: number) => {
  if (!result[`${x},${y}`]) result[`${x},${y}`] = 0;
  result[`${x},${y}`]++;
}

export const runPart1 = (file?: string) => {
  const data = getFileData(file);

  const vectors = data.filter(item => item[0] === item[2] || item[1] === item[3]);
  const table: Table = vectors.reduce((result, item) => {
    if (item[0] === item[2]) {
      const yStart = Math.min(item[1], item[3]);
      const yEnd = Math.max(item[1], item[3]);
      for (let i = yStart; i <= yEnd; i++) {
        addItem(result, item[0], i);
      }
    } else {
      const xStart = Math.min(item[0], item[2]);
      const xEnd = Math.max(item[0], item[2]);
      for (let i = xStart; i <= xEnd; i++) {
        addItem(result, i, item[1]);
      }
    }
    return result;
  }, {});

  return Object.values(table).reduce((sum, item) => item > 1 ? sum + 1 : sum, 0);
}

export const runPart2 = (file?: string) => {
  const data = getFileData(file);
  const vectors = data.filter(item => item[0] === item[2] || item[1] === item[3] || Math.abs(item[0] - item[2]) === Math.abs(item[1] - item[3]));

  const table: Table = vectors.reduce((result, item) => {
    const xStart = item[0];
    const yStart = item[1];
    const xEnd = item[2];
    const yEnd = item[3];
    const xDiff = xEnd - xStart;
    const yDiff = yEnd - yStart;
    const nSteps = Math.max(Math.abs(xDiff), Math.abs(yDiff)) + 1;
    const xStep = xDiff === 0 ? 0 : xDiff < 0 ? -1 : 1;
    const yStep = yDiff === 0 ? 0 : yDiff < 0 ? -1 : 1;

    for (let i = 0; i < nSteps; i++) {
      addItem(result, xStart + i * xStep, yStart + i * yStep);
    }
    return result;
  }, {});

  return Object.values(table).reduce((sum, item) => item > 1 ? sum + 1 : sum, 0);
}
