import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) => readFile(file)[0].split(',').map(item => parseInt(item, 10));

export const runPart1 = (file?: string, days = 80) => {
  const data = getFileData(file);

  let group = Array(9).fill(0);
  data.forEach(item => group[item] += 1);

  for (let i = 0; i < days; i++) {
    group = group.reduce((result, amount, age) => {
      if (age === 0) {
        result[6] += amount;
        result[8] += amount;
      } else {
        result[age - 1] += amount;
      }
      return result;
    }, Array(9).fill(0));
  }

  return group.reduce((result, amount) => result + amount, 0);
}

export const runPart2 = (file?: string, days = 256) => {
  return runPart1(file, days);
}
