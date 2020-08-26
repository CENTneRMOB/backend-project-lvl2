import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';
import factory from '../src/testingFactory.js';

const fixturesPath = path.resolve('./__fixtures__');
const resultFilePath = path.join(fixturesPath, 'result');
const expectedContent = fs.readFileSync(resultFilePath, 'utf-8');

describe.each([['file1.json', 'file2.json'], ['file1.yaml', 'file2.yaml'], ['file1.ini', 'file2.ini']])('Test block', (firstFile, secondFile) => {
  const [firstFilePath, secondFilePath, firstFileFormat,
    secondJsonFileFormat] = factory(fixturesPath, firstFile, secondFile);

  test('Files format should equal', () => {
    expect(firstFileFormat === secondJsonFileFormat).toBeTruthy();
  });

  test('Should return difference between two files', () => {
    expect(genDiff(firstFilePath, secondFilePath)).toBe(expectedContent);
  });

  test('Result file shoud be truthy and defined', () => {
    expect(genDiff(firstFilePath, secondFilePath)).toBeTruthy();
    expect(genDiff(firstFilePath, secondFilePath)).toBeDefined();
  });
});
