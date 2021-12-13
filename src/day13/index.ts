import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

enum Axis { x = 'x', y = 'y' }
type Dot = [number, number];
type Instruction = { axis: Axis, value: number };
type Data = { dots: Dot[], instructions: Instruction[] };


const getFileData = (file: string = inputFile): Data => readFile(file).reduce(
  (result, item) => {
    const instructionMatches = item.match(/fold along (x|y)=(\d+)/);
    if (instructionMatches) {
      result.instructions.push({
        axis: instructionMatches[1] as Axis,
        value: parseInt(instructionMatches[2], 10)
      });
    } else {
      result.dots.push(
        item.split(',').map(coordinate => parseInt(coordinate, 10)) as Dot
      );
    }
    return result;
  },
  { dots: [], instructions: [] } as Data
);

const fold = (dots: Dot[], instruction: Instruction): Dot[] =>
  dots
    .map(dot => {
      let x = dot[0];
      let y = dot[1];
      if (instruction.axis === Axis.x) {
        x = dot[0] < instruction.value ?
          dot[0] : 2 * instruction.value - dot[0];
      }

      if (instruction.axis === Axis.y) {
        y = dot[1] < instruction.value ?
          dot[1] : 2 * instruction.value - dot[1];
      }
      return [x, y] as Dot;
    })
    .filter((dot, i, list) =>
      dot &&
      i === list.findIndex(item => (
        item &&
        item[0] === dot[0] &&
        item[1] === dot[1])
      )
    ) as Dot[];

export const runPart1 = (file?: string) => {
  const data = getFileData(file);
  const dots = fold(data.dots, data.instructions[0]);

  return dots.length;
}

export const runPart2 = (file?: string, isPrint = true) => {
  const data = getFileData(file);
  let dots = data.dots;
  data.instructions.forEach(instruction => {
    dots = fold(dots, instruction);
  });

  const maxX = dots.map(dot => dot[0]).sort((a, b) => b - a)[0];
  const maxY = dots.map(dot => dot[1]).sort((a, b) => b - a)[0];
  let output = ''
  for (let y = 0; y <= maxY; y++) {
    output += '\n';
    for (let x = 0; x <= maxX; x++) {
      const i = dots.findIndex(dot => dot[0] === x && dot[1] === y);
      if (i === -1) {
        output += '.';
      } else {
        dots.splice(i, 1);
        output += '#';
      }
    }
  }

  if (isPrint) {
    console.log(output);
  } else {
    return output;
  }
}
