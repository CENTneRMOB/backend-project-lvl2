import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const fixturesPath = path.resolve('./__fixtures__');
const resultFilePath = path.join(fixturesPath, 'result');
const expectedContent = fs.readFileSync(resultFilePath, 'utf-8');

describe.each([['file1.json', 'file2.json', '.json'], ['file1.yaml', 'file2.yaml', '.yaml'],
  ['file1.ini', 'file2.ini', '.ini']])('Test block', (firstFile, secondFile, format) => {
  const firstFilePath = path.join(fixturesPath, firstFile);
  const secondFilePath = path.join(fixturesPath, secondFile);
  const firstFileFormat = path.extname(firstFilePath);
  const secondFileFormat = path.extname(secondFilePath);

  test(`Files format should be '${format}' and both file formats should be equal`, () => {
    expect(firstFileFormat).toBe(`${format}`);
    expect(secondFileFormat).toBe(`${format}`);
    expect(firstFileFormat === secondFileFormat).toBeTruthy();
  });

  test(`Should return difference between two '${format}' files`, () => {
    expect(genDiff(firstFilePath, secondFilePath)).toBe(expectedContent);
  });
});
