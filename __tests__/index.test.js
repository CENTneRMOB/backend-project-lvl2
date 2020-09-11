import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const fixturesPath = path.resolve('./__fixtures__');
const stylishResultFilePath = path.join(fixturesPath, 'stylish.result');
const plainResultFilePath = path.join(fixturesPath, 'plain.result');
const stylishExpectedContent = fs.readFileSync(stylishResultFilePath, 'utf-8');
const plainExpectedContent = fs.readFileSync(plainResultFilePath, 'utf-8');

const beforeFileName = 'file1';
const afterFileName = 'file2';

const getFilePathAndExtension = (name, extension) => {
  const filePath = path.join(fixturesPath, `${name}${extension}`);
  const fileExtension = path.extname(filePath);
  return [filePath, fileExtension];
};

describe.each([['.json'], ['.yaml'], ['.ini']])('Test block', (extension) => {
  const [firstFilePath, firstFileExtension] = getFilePathAndExtension(beforeFileName, extension);
  const [secondFilePath, secondFileExtension] = getFilePathAndExtension(afterFileName, extension);

  test(`Files extensions should be '${extension}' and both files extensions should be equal`, () => {
    expect(firstFileExtension).toBe(`${extension}`);
    expect(secondFileExtension).toBe(`${extension}`);
    expect(firstFileExtension === secondFileExtension).toBeTruthy();
  });
  test(`Should return difference between two ${extension} in stylish format`, () => {
    expect(genDiff(firstFilePath, secondFilePath, 'stylish')).toBe(stylishExpectedContent);
  });
  test(`Should return difference between two ${extension} in plain format`, () => {
    expect(genDiff(firstFilePath, secondFilePath, 'plain')).toBe(plainExpectedContent);
  });
});
