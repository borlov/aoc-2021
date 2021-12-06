import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

const getFileData = (file: string = inputFile) => readFile(file);

export const runPart1 = (file?: string) => {
  const data = getFileData(file);

  const inputs = data[0].split(',').map(item => parseInt(item, 10));
  const nCards = (data.length - 1) / 5;
  let cards = [];

  for (let i = 0; i < nCards; i++) {
    cards[i] = { rows: [], columns: [] } as {
      rows: number[][], columns: number[][]
    };
    for (let j = i * 5 + 1; j < i * 5 + 6; j++) {
      cards[i].rows.push(data[j].split(' ').map(item => parseInt(item, 10)).filter(item => !isNaN(item)));
    }
    for (let j = 0; j < 5; j++) {
      cards[i].columns.push(cards[i].rows.map(row => row[j]));
    }
  }

  let resultCard;
  let lastInput: number = 0;

  for (let i = 0; i < inputs.length; i++) {
    lastInput = inputs[i];
    cards.forEach(card => {
      card.rows = card.rows.map(row => row.filter(item => item !== lastInput));
      card.columns = card.columns.map(columns => columns.filter(item => item !== lastInput));
    });

    resultCard = cards.find(card => card.rows.some(row => !row.length) || card.columns.some(column => !column.length))
    if (resultCard) break;
  }

  const restSum = resultCard?.rows.reduce((sum, item) => sum + item.reduce((itemSum, a) => itemSum + a, 0), 0) || 0;

  return lastInput * restSum;
}

export const runPart2 = (file?: string) => {
  const data = getFileData(file);

  const inputs = data[0].split(',').map(item => parseInt(item, 10));
  const nCards = (data.length - 1) / 5;
  let cards = [] as {
    rows: number[][], columns: number[][]
  }[];

  for (let i = 0; i < nCards; i++) {
    cards[i] = { rows: [], columns: [] } as {
      rows: number[][], columns: number[][]
    };
    for (let j = i * 5 + 1; j < i * 5 + 6; j++) {
      cards[i].rows.push(data[j].split(' ').map(item => parseInt(item, 10)).filter(item => !isNaN(item)));
    }
    for (let j = 0; j < 5; j++) {
      cards[i].columns.push(cards[i].rows.map(row => row[j]));
    }
  }

  let resultCard;
  let lastInput: number = 0;

  for (let i = 0; i < inputs.length; i++) {
    lastInput = inputs[i];
    cards.forEach(card => {
      card.rows = card.rows.map(row => row.filter(item => item !== lastInput));
      card.columns = card.columns.map(columns => columns.filter(item => item !== lastInput));
    });

    const newcards = cards.filter(card => card.rows.every(row => row.length) && card.columns.every(column => column.length))
    if (!newcards.length) {
      resultCard = cards[0];
      break;
    }

    cards = newcards;
  }

  const restSum = resultCard?.rows.reduce((sum, item) => sum + item.reduce((itemSum, a) => itemSum + a, 0), 0) || 0;

  return lastInput * restSum;
}
