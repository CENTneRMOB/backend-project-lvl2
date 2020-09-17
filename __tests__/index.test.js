import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const getFilePath = (name, extension) => {
  const dirname = path.resolve('./__fixtures__');
  return path.join(dirname, `${name}.${extension}`);
};

let stylishExpectedContent;
let plainExpectedContent;
let jsonExpectedContent;

beforeAll(() => {
  stylishExpectedContent = fs.readFileSync(getFilePath('stylish-result', 'txt'), 'utf-8');
  plainExpectedContent = fs.readFileSync(getFilePath('plain-result', 'txt'), 'utf-8');
  jsonExpectedContent = fs.readFileSync(getFilePath('json-result', 'txt'), 'utf-8');
});

describe.each([['json'], ['yaml'], ['ini']])('Testing each input file\'s format with each output format', (extension) => {
  const firstFilePath = getFilePath('file1', extension);
  const secondFilePath = getFilePath('file2', extension);

  test(`Should return difference between two .${extension} in stylish format`, () => {
    expect(genDiff(firstFilePath, secondFilePath, 'stylish')).toBe(stylishExpectedContent);
  });
  test(`Should return difference between two .${extension} in plain format`, () => {
    expect(genDiff(firstFilePath, secondFilePath, 'plain')).toBe(plainExpectedContent);
  });
  test(`Should return difference between two .${extension} in json format`, () => {
    expect(genDiff(firstFilePath, secondFilePath, 'json')).toBe(jsonExpectedContent);
  });
});
