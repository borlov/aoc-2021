import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

type LetterAmount = Record<string, number>;
type TupleAmount = Record<string, number>;
type Rules = Record<string, string>;
type Data = {
  letterAmount: TupleAmount
  tupleAmount: TupleAmount,
  rules: Rules
}

const increment = (
  obj: TupleAmount | LetterAmount,
  key: string,
  amount = 1
) => {
  if (!obj[key]) obj[key] = 0;
  obj[key] = (obj[key] || 0) + amount;
}

const getFileData = (file: string = inputFile): Data => {
  const data = readFile(file);
  return {
    ...(data.shift() || '')
      .split('')
      .reduce(
        (result, ch, i, list) => {
          increment(result.letterAmount, ch);
          if (!list[i + 1]) return result;

          increment(result.tupleAmount, ch + list[i + 1]);
          return result;
        },
        { letterAmount: {}, tupleAmount: {} } as {
          letterAmount: LetterAmount
          tupleAmount: TupleAmount
        }
      ),
    rules: data
      .map(line => line.match(/(\w)(\w) -> (\w)/))
      .reduce((result, itemMatches) => {
        if (!itemMatches) return result;

        const key = itemMatches[1] + itemMatches[2];
        const value = itemMatches[3];
        result[key] = value;
        return result;
      }, {} as Rules)
  }
};

const doStep = (
  tupleAmount: TupleAmount,
  letterAmount: LetterAmount,
  rules: Rules
): TupleAmount => {
  const output: TupleAmount = {};
  for (const pair in tupleAmount) {
    const insertion = rules[pair];
    if (!insertion) continue;
    const amount = tupleAmount[pair];
    if (!letterAmount[insertion]) letterAmount[insertion] = 0;
    letterAmount[insertion] += amount;

    increment(output, pair[0] + insertion, amount);
    increment(output, insertion + pair[1], amount);
  }

  return output;
}

export const run = (file: string = inputFile, nSteps: number) => {
  const { letterAmount, tupleAmount, rules } = getFileData(file);
  let iTupleAmount = tupleAmount;
  for (let i = 0; i < nSteps; i++) {
    iTupleAmount = doStep(iTupleAmount, letterAmount, rules);
  }

  const amounts = Object.values(letterAmount).sort((a, b) => a - b);

  return (amounts.pop() as number) - (amounts.shift() as number);
}

export const runPart1 = (file?: string) => run(file, 10);

export const runPart2 = (file?: string) => run(file, 40)
