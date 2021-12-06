import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) => readFile(file).map(item => parseInt(item, 10));

export const runPart1 = (file?: string) => {
  const data = getFileData(file);
  let result = 0;
  for (let i = 0; i < data?.length - 1; i++) {
    if (data[i] < data[i + 1]) result++;
  }

  return result;
}

export const runPart2 = (file?: string) => {
  const data = getFileData(file);
  let result = 0;
  for (let i = 0; i < data?.length - 2; i++) {
    if (data[i] < data[i + 3]) result++;
  }

  return result;
}
