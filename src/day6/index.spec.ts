import path from 'path';
import { runPart1, runPart2} from '.';

const mockFile = path.join(__dirname, 'mock');

describe('day6', () => {
  it('runs part1 as expected', () => {
    expect(runPart1(mockFile, 18)).toBe(26);
    expect(runPart1(mockFile, 80)).toBe(5934);
  })
  it('runs part2 as expected', () => {
    expect(runPart2(mockFile, 256)).toBe(26984457539);
  })
});
