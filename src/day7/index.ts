import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) => readFile(file)[0].split(',').map(item => parseInt(item, 10));

const getFuel = (positions: number[], position: number, stepFuelDiff = 0) => positions.reduce((sum, item) => {
  const steps = Math.abs(item - position);
  const fuel = steps * (2 + stepFuelDiff * (steps - 1)) / 2;
  return sum + fuel;
}, 0);

export const runPart1 = (file?: string, stepFuelDiff = 0) => {
  const positions = getFileData(file);
  let result;

  const fuels: number[] = [];
  let min = Math.min(...positions);
  let max = Math.max(...positions);
  fuels[min] = getFuel(positions, min, stepFuelDiff);
  fuels[max] = getFuel(positions, max, stepFuelDiff);
  do {
    const average = Math.round((min + max) / 2);
    fuels[average] = getFuel(positions, average, stepFuelDiff);
    if (fuels[min] < fuels[max]) {
      max = average;
    } else {
      min = average;
    }

    if (max - min === 1) {
      result = Math.min(fuels[min], fuels[max]);
      break;
    }
    // eslint-disable-next-line no-constant-condition
  } while (true);

  return result;
}

export const runPart2 = (file?: string) => {
  return runPart1(file, 1);
}
