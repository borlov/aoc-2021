import fs from 'fs';

export const readFile = (filepath: string): string[] => {
  try {
    var data = fs.readFileSync(filepath, 'utf8');
    return data.toString().split('\n').filter(item => item);
  } catch (e) {
    console.log('Error:', e);
    return [];
  }
}
