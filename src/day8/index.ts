import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) =>
  readFile(file)
    .map(item =>
      item
        .match(/([a-g]+)/g)
        ?.map(item => item.split('').sort().join('')) as string[]
    );

const decode = (list: string[]): string[] => {
  const result: string[] = [];
  result[1] = list.find(item => item.length === 2) as string;
  result[4] = list.find(item => item.length === 4) as string;
  result[7] = list.find(item => item.length === 3) as string;
  result[8] = list.find(item => item.length === 7) as string;
  result[6] = list.find(item =>
    item.length === 6 &&
    result[1].split('').some(c => !item.includes(c))
  ) as string;

  result[0] = list.find(item =>
    item.length === 6 &&
    !result.includes(item) &&
    result[4].split('').some(c => !item.includes(c))
  ) as string;

  result[9] = list.find(item =>
    item.length === 6 &&
    !result.includes(item)
  ) as string;

  result[5] = list.find(item =>
    item.length === 5 &&
    !result.includes(item) && item.split('').every(c => result[6].includes(c))
  ) as string;

  result[3] = list.find(item =>
    item.length === 5 &&
    !result.includes(item) &&
    item.split('').every(c => result[9].includes(c))
  ) as string;

  result[2] = list.find(item => !result.includes(item)) as string;

  return result;
}

export const runPart1 = (file?: string) => {
  const data = getFileData(file).map(item => item?.slice(-4));
  const items = (<string[]>[]).concat(...data);
  const result = items.reduce((sum, item) =>
    [2, 4, 3, 7].includes(item.length) ? sum + 1 : sum, 0
  );

  return result;
}

export const runPart2 = (file?: string) => {
  const data = getFileData(file);
  const result = data.reduce((sum, row) => {
    const dictionary = decode(row.slice(0, 10));
    const output = row
      .slice(-4)
      .map(item => dictionary.indexOf(item))
      .join('');

    return sum + parseInt(output, 10);
  }, 0);

  return result;
}
