import path from 'path';
import { runPart1, runPart2 } from '.';

const mockFile = path.join(__dirname, 'mock');

const part2Result = `
#####
#...#
#...#
#...#
#####`;

describe('day13', () => {
  it('runs part1 as expected', () => {
    expect(runPart1(mockFile)).toBe(17);
  })
  it('runs part2 as expected', () => {
    expect(runPart2(mockFile, false)).toBe(part2Result);
    expect(runPart2(mockFile, true)).toBe(undefined);
  })
});
