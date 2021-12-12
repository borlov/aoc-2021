import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) =>
  readFile(file).map(item => item.split('').map(item => parseInt(item, 10)));

export const runPart1 = (file?: string) => {
  const table = getFileData(file);
  const nColumns = table[0].length;
  const lowPoints: number[] = [];
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < nColumns; j++) {
      const item = table[i][j];
      if (
        (i - 1 === -1 || item < table[i - 1][j]) &&
        (i + 1 === table.length || item < table[i + 1][j]) &&
        (j - 1 === -1 || item < table[i][j - 1]) &&
        (j + 1 === nColumns || item < table[i][j + 1])
      ) {
        lowPoints.push(item);
      }
    }
  }

  return lowPoints.reduce((sum, item) => sum + item, lowPoints.length);
}

type Point = string;
type Basin = Point[];

export const runPart2 = (file?: string) => {
  const table = getFileData(file);
  const nColumns = table[0].length;
  let basins: Basin[] = []

  const _ = (x: number, y: number): Point => x + ',' + y;

  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < nColumns; j++) {
      if (table[i][j] !== 9) {
        const { sameBasins, otherBasings } = basins.reduce(
          (result, basin) => {
            const isSameBasin = basin.some(item =>
              [_(i - 1, j), _(i, j - 1)].includes(item));

            const list = isSameBasin ? result.sameBasins : result.otherBasings;
            list.push(basin);

            return result;
          },
          { sameBasins: [] as Basin[], otherBasings: [] as Basin[] }
        );

        const currentBasin = ([_(i, j)] as Basin).concat(...sameBasins);
        basins = [currentBasin, ...otherBasings];
      }
    }
  }

  const basingsSizes = basins.map(basin => basin.length).sort((a, b) => b - a);

  return basingsSizes[0] * basingsSizes[1] * basingsSizes[2];
}
