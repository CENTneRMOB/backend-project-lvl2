import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFilePath = (name, extension) => path.join(dirname, '..', '__fixtures__', `${name}${extension}`);

describe.each([['.json'], ['.yaml'], ['.ini']])('Test %s format files', (extension) => {
  let stylishExpectedContent;
  let plainExpectedContent;
  let jsonExpectedContent;
  let firstFilePath;
  let secondFilePath;

  beforeAll(() => {
    stylishExpectedContent = fs.readFileSync(getFilePath('stylish-result', '.txt'), 'utf-8');
    plainExpectedContent = fs.readFileSync(getFilePath('plain-result', '.txt'), 'utf-8');
    jsonExpectedContent = fs.readFileSync(getFilePath('json-result', '.txt'), 'utf-8');
    firstFilePath = getFilePath('file1', extension);
    secondFilePath = getFilePath('file2', extension);
  });
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
