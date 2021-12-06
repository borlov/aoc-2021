import path from 'path';
import { runPart1, runPart2} from '.';

const mockFile = path.join(__dirname, 'mock');

describe('day1', () => {
  it('runs part1 as expected', () => {
    expect(runPart1(mockFile)).toBe(7);
  })
  it('runs part2 as expected', () => {
    expect(runPart2(mockFile)).toBe(5);
  })
});
