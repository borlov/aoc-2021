import path from 'path';
import { readFile } from '../utils/index';

const inputFile = path.join(__dirname, 'input');

type Cave = string;
type Router = Record<Cave, Cave[]>;
type Path = Cave[];
type ValidateCaveFn = (path: Path, cave: Cave) => boolean;

const addRoute = (obj: Router, a: Cave, b: Cave) => {
  if (!obj[a]) obj[a] = [];
  if (!obj[a].includes(b)) obj[a].push(b);
}

const getFileData = (file: string = inputFile) => readFile(file)
  .map(line => line.split('-'))
  .reduce((result, item) => {
    addRoute(result, item[0], item[1]);
    addRoute(result, item[1], item[0]);
    return result;
  }, {} as Router);

const isCaveBig = (cave: Cave) => cave.toUpperCase() === cave;

const doStep = (
  paths: Path[],
  router: Router,
  validateCave: ValidateCaveFn
): Path[] => paths.reduce(
  (result: Path[], path: Path) => {
    const lastCave = path[path.length - 1];
    if (lastCave === 'end') return result;

    const newPaths = router[lastCave]
      .filter(cave => validateCave(path, cave))
      .map(cave => [...path, cave]);
    return result.concat(newPaths);
  },
  [] as Path[]
);

const run = (file: string, validateCave: ValidateCaveFn) => {
  const router = getFileData(file);
  let paths = [['start']];
  let total = 0;

  do {
    paths = doStep(paths, router, validateCave);
    total += paths.filter(path => path[path.length - 1] === 'end').length;
  } while (paths.length);

  return total;
}

export const runPart1 = (file: string = inputFile) => {
  const validateCave = (path: Path, cave: Cave): boolean => (
    !path.includes(cave) ||
    isCaveBig(cave)
  );

  return run(file, validateCave);
}

export const runPart2 = (file: string = inputFile) => {
  const validateCave: ValidateCaveFn = (path: Path, cave: Cave): boolean => (
    !path.includes(cave) ||
    isCaveBig(cave) ||
    (
      !['start', 'end'].includes(cave) &&
      path.every((item, i) => isCaveBig(item) || path.indexOf(item) === i)
    )
  );

  return run(file, validateCave);
}
