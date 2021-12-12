import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) => readFile(file)
  .map(item => item.split(' '));

export const runPart1 = (file?: string) => {
  const data = getFileData(file);
  let x = 0;
  let y = 0;

  data.forEach(move => {
    const command = move[0];
    const distance = parseInt(move[1], 10);
    switch (command) {
      case 'forward':
        x += distance;
        return;
      case 'down':
        y += distance;
        return;
      case 'up':
        y -= distance;
        return;
    }
  });

  return x * y;
}

export const runPart2 = (file?: string) => {
  const data = getFileData(file);
  let x = 0;
  let y = 0;
  let aim = 0;

  data.forEach(move => {
    const command = move[0];
    const distance = parseInt(move[1], 10);

    switch (command) {
      case 'forward':
        x += distance;
        y += aim * distance;
        return;
      case 'down':
        aim += distance;
        return;
      case 'up':
        aim -= distance;
    }
  });

  return x * y;
}
