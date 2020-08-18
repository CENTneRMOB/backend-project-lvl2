import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const fixturesPath = path.resolve('./__fixtures__');
const firstFilePath = path.join(fixturesPath, 'file1.json');
const secondFilePath = path.join(fixturesPath, 'file2.json');
const expectedFilePath = path.join(fixturesPath, 'result');
const expectedContent = fs.readFileSync(expectedFilePath, 'utf-8');

test('Should return difference between two JSON files', () => {
  expect(genDiff(firstFilePath, secondFilePath)).toBe(expectedContent);
});

test('Result file shoud not be a number or undefined', () => {
  expect(genDiff(firstFilePath, secondFilePath)).toBeTruthy();
  expect(genDiff(firstFilePath, secondFilePath)).toBeDefined();
});
