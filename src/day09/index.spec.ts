import path from 'path';
import { runPart1, runPart2} from '.';

const mockFile = path.join(__dirname, 'mock');

describe('day09', () => {
  it('runs part1 as expected', () => {
    expect(runPart1(mockFile)).toBe(15);
  })
  it('runs part2 as expected', () => {
    expect(runPart2(mockFile)).toBe(1134);
  })
});
