import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const fixturesDirname = path.resolve('../__fixtures__');
const firstFilePath = path.join(fixturesDirname, 'file1.json');
const secondFilePath = path.join(fixturesDirname, 'file2.json');
const expectedFilePath = path.join(fixturesDirname, 'result');
const expectedContent = fs.readFileSync(expectedFilePath, 'utf-8');

console.log('expectedContent: ', expectedContent);
console.log('expectedFilePath: ', expectedFilePath);

test('Should return difference between two JSON files', () => {
  expect(genDiff(firstFilePath, secondFilePath)).toBe(expectedContent);
});

test('Result file shoud not be a number or undefined', () => {
  expect(genDiff(firstFilePath, secondFilePath)).toBeNaN();
  expect(genDiff(firstFilePath, secondFilePath)).toBeDefined();
});
