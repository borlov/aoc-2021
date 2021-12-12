import fs from 'fs';

export const readFile = (filepath: string): string[] =>
  fs.readFileSync(filepath, 'utf8')
    .toString()
    .split('\n')
    .filter(item => item);
