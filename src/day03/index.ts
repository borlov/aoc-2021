import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) => readFile(file);

export const runPart1 = (file?: string) => {
  const data = getFileData(file);

  let gamma = '';
  let epsilon = '';

  const group = Array(data[0].length).fill(0);

  data.forEach((item) => {
    item.split('').forEach((bit, iBit) => {
      group[iBit] += bit === '1' ? 1 : -1;
    });
  });

  group.forEach(item => {
    if (item < 0) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  });

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

export const runPart2 = (file?: string) => {
  const data = getFileData(file);

  let oxygen = '';
  let co2 = '';

  const nBits = data[0].length;

  const filterList = (list: string[], i: number, isMostCommon: boolean) => {
    const compare = list.reduce(
      (sum, item) => sum + ((item[i] === '0') ? -1 : 1),
      0
    );

    let filterBit: string;
    if (isMostCommon) {
      filterBit = compare >= 0 ? '1' : '0';
    } else {
      filterBit = compare >= 0 ? '0' : '1';
    }
    return list.filter(item => item[i] === filterBit);
  };

  let oxygenList = data;
  let iOxygen = 0;
  do {
    oxygenList = filterList(oxygenList, iOxygen++, true);
  } while (oxygenList.length > 1 && iOxygen < nBits);

  oxygen = oxygenList[0];

  let co2List = data;
  let iCO2 = 0;
  do {
    co2List = filterList(co2List, iCO2++, false);
  } while (co2List.length > 1 && iCO2 < nBits);

  co2 = co2List[0];

  return parseInt(oxygen, 2) * parseInt(co2, 2);
}
