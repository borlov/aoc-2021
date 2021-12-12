import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) => readFile(file);

interface GetScoreProps {
  list: string[],
  scoreTable: Record<string, number>,
  sumMultiplier?: number
}
const getScore = (
  {
    list,
    scoreTable,
    sumMultiplier = 1
  }: GetScoreProps
): number =>
  list.reduce(
    (sum: number, item: string) => (
      sumMultiplier * sum + scoreTable[item]
    ),
    0
  );

export const clearData = (data: string[]) => data.map(item => {
  let prevItem;
  do {
    prevItem = item;
    item = prevItem.replaceAll(/(\(\)|\[\]|\{\}|<>)/g, '');
  } while (item !== prevItem);
  return prevItem;
})


export const runPart1 = (file?: string) => {
  const data = getFileData(file);
  const cleanedData = clearData(data);

  const resultTable = cleanedData
    .map(item => item.match(/(\)|\]|\}|>)/))
    .map(item => item && item[1])
    .filter(item => item) as string[];

  const scoreTable = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  };

  const result = getScore({
    list: resultTable,
    scoreTable
  });
  return result;
}

export const runPart2 = (file?: string) => {
  const data = getFileData(file);
  const cleanedData = clearData(data);

  const scoreTable = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  };

  const resultTable = cleanedData
    .filter(item => !item.match(/\)|\]|\}|>/))
    .map(item => {
      const missingParts = item
        .replaceAll('(', ')')
        .replaceAll('[', ']')
        .replaceAll('{', '}')
        .replaceAll('<', '>')
        .split('')
        .reverse();

      return getScore({
        list: missingParts as string[],
        scoreTable,
        sumMultiplier: 5
      });
    });

  resultTable.sort((a, b) => a - b);
  return resultTable[Math.floor(resultTable.length / 2)];
}
