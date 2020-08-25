import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';
import factory from '../src/testingFactory.js';

const fixturesPath = path.resolve('./__fixtures__');

// JSON test
describe('JSON test group', () => {
  const firstJsonFile = 'file1.json';
  const secondJsonFile = 'file2.json';
  const resultJsonFile = 'resultJSON';
  const [firstJsonFilePath, secondJsonFilePath, expectedJsonFilePath, firstJsonFileFormat,
    secondJsonFileFormat] = factory(fixturesPath, firstJsonFile, secondJsonFile, resultJsonFile);
  const expectedContent = fs.readFileSync(expectedJsonFilePath, 'utf-8');

  test('Files format should be JSON and both file formats should be equal', () => {
    expect(firstJsonFileFormat).toBe('.json');
    expect(secondJsonFileFormat).toBe('.json');
    expect(firstJsonFileFormat === secondJsonFileFormat).toBeTruthy();
  });

  test('Should return difference between two JSON files', () => {
    expect(genDiff(firstJsonFilePath, secondJsonFilePath)).toBe(expectedContent);
  });

  test('Result file shoud be truthy and defined', () => {
    expect(genDiff(firstJsonFilePath, secondJsonFilePath)).toBeTruthy();
    expect(genDiff(firstJsonFilePath, secondJsonFilePath)).toBeDefined();
  });
});
//

// YAML test
describe('YAML test group', () => {
  const firstYamlFile = 'file1.yaml';
  const secondYamlFile = 'file2.yaml';
  const resultYamlFile = 'resultYAML';
  const [firstYamlFilePath, secondYamlFilePath, expectedYamlFilePath, firstYamlFileFormat,
    secondYamlFileFormat] = factory(fixturesPath, firstYamlFile, secondYamlFile, resultYamlFile);
  const expectedContent = fs.readFileSync(expectedYamlFilePath, 'utf-8');

  test('Files format should be YAML and both file formats should be equal', () => {
    expect(firstYamlFileFormat).toBe('.yaml');
    expect(secondYamlFileFormat).toBe('.yaml');
    expect(firstYamlFileFormat === secondYamlFileFormat).toBeTruthy();
  });

  test('Should return difference between two YAML files', () => {
    expect(genDiff(firstYamlFilePath, secondYamlFilePath)).toBe(expectedContent);
  });

  test('Result file shoud be truthy and defined', () => {
    expect(genDiff(firstYamlFilePath, secondYamlFilePath)).toBeTruthy();
    expect(genDiff(firstYamlFilePath, secondYamlFilePath)).toBeDefined();
  });
});
//
