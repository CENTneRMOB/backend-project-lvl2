import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFullFileName = (name, extension) => `${name}${extension}`;
const getFixturePath = (fileName) => path.join(dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

describe.each([['.json'], ['.yml'], ['.ini']])('Test %s format files', (extension) => {
  const stylishExpectedContent = readFile('stylish-result.txt', 'utf-8');
  const plainExpectedContent = readFile('plain-result.txt', 'utf-8');
  const jsonExpectedContent = readFile('json-result.txt', 'utf-8');
  const firstFileName = getFullFileName('file1', extension);
  const secondFileName = getFullFileName('file2', extension);
  const firstFilePath = getFixturePath(firstFileName);
  const secondFilePath = getFixturePath(secondFileName);

  test(`Should return difference between two ${extension} in stylish format`, () => {
    expect(genDiff(firstFilePath, secondFilePath, 'stylish')).toBe(stylishExpectedContent);
  });

  test(`Should return difference between two ${extension} in plain format`, () => {
    expect(genDiff(firstFilePath, secondFilePath, 'plain')).toBe(plainExpectedContent);
  });

  test(`Should return difference between two ${extension} in json format`, () => {
    expect(genDiff(firstFilePath, secondFilePath, 'json')).toBe(jsonExpectedContent);
  });
});
