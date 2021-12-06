import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) => readFile(file);

export const runPart1 = (file?: string) => {
  const data = getFileData(file);
  console.log(data);
  // TODO

  const result = 0;
  return result;
}

export const runPart2 = (file?: string) => {
  const data = getFileData(file);
  console.log(data);
  // TODO

  const result = 0;
  return result;
}
