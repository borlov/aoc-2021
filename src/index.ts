import yargs from 'yargs';
import path from 'path';

const { day, part } = yargs.argv;
if (!day) throw Error('Day is not set, add --day=N to your command');
if (!part) throw Error('Part is not set, add --part=N to your command');

import(path.resolve('src', `day${day}`)).then(({ runPart1, runPart2 }) => {
  const result = (part === 1) ? runPart1() : runPart2();
  console.table({ day, part, result });
});
