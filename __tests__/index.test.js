import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';
import factory from '../src/testingFactory.js';

const fixturesPath = path.resolve('./__fixtures__');

// JSON test
describe('JSON test group', () => {
  const firstFile = 'file1.json';
  const secondFile = 'file2.json';
  const resultFile = 'resultJSON';
  const [firstFilePath, secondFilePath, expectedFilePath, firstFileFormat,
    secondFileFormat] = factory(fixturesPath, firstFile, secondFile, resultFile);
  const expectedContent = fs.readFileSync(expectedFilePath, 'utf-8');

  test('Files format should be JSON and both file formats should be equal', () => {
    expect(firstFileFormat).toBe('.json');
    expect(secondFileFormat).toBe('.json');
    expect(firstFileFormat === secondFileFormat).toBeTruthy();
  });

  test('Should return difference between two JSON files', () => {
    expect(genDiff(firstFilePath, secondFilePath)).toBe(expectedContent);
  });

  test('Result file shoud be truthy and defined', () => {
    expect(genDiff(firstFilePath, secondFilePath)).toBeTruthy();
    expect(genDiff(firstFilePath, secondFilePath)).toBeDefined();
  });
});
//

// YAML test
describe('YAML test group', () => {
  const firstFile = 'file1.yaml';
  const secondFile = 'file2.yaml';
  const resultFile = 'resultYAML';
  const [firstFilePath, secondFilePath, expectedFilePath, firstFileFormat,
    secondFileFormat] = factory(fixturesPath, firstFile, secondFile, resultFile);
  const expectedContent = fs.readFileSync(expectedFilePath, 'utf-8');

  test('Files format should be YAML and both file formats should be equal', () => {
    expect(firstFileFormat).toBe('.yaml');
    expect(secondFileFormat).toBe('.yaml');
    expect(firstFileFormat === secondFileFormat).toBeTruthy();
  });

  test('Should return difference between two YAML files', () => {
    expect(genDiff(firstFilePath, secondFilePath)).toBe(expectedContent);
  });

  test('Result file shoud be truthy and defined', () => {
    expect(genDiff(firstFilePath, secondFilePath)).toBeTruthy();
    expect(genDiff(firstFilePath, secondFilePath)).toBeDefined();
  });
});
//
