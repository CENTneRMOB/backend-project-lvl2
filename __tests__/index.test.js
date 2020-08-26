import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';
import factory from '../src/testingFactory.js';

const fixturesPath = path.resolve('./__fixtures__');
const resultFilePath = path.join(fixturesPath, 'result');
const expectedContent = fs.readFileSync(resultFilePath, 'utf-8');

// JSON test
describe('JSON test group', () => {
  const firstJsonFile = 'file1.json';
  const secondJsonFile = 'file2.json';
  const [firstJsonFilePath, secondJsonFilePath, firstJsonFileFormat,
    secondJsonFileFormat] = factory(fixturesPath, firstJsonFile, secondJsonFile);

  test('Files format should be .json and both file formats should be equal', () => {
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
  const [firstYamlFilePath, secondYamlFilePath, firstYamlFileFormat,
    secondYamlFileFormat] = factory(fixturesPath, firstYamlFile, secondYamlFile);

  test('Files format should be .yaml and both file formats should be equal', () => {
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

// ini test
describe('INI test group', () => {
  const firstIniFile = 'file1.ini';
  const secondIniFile = 'file2.ini';
  const [firstIniFilePath, secondIniFilePath, firstIniFileFormat,
    secondIniFileFormat] = factory(fixturesPath, firstIniFile, secondIniFile);

  test('Files format should be .ini and both file formats should be equal', () => {
    expect(firstIniFileFormat).toBe('.ini');
    expect(secondIniFileFormat).toBe('.ini');
    expect(firstIniFileFormat === secondIniFileFormat).toBeTruthy();
  });

  test('Should return difference between two INI files', () => {
    expect(genDiff(firstIniFilePath, secondIniFilePath)).toBe(expectedContent);
  });

  test('Result file shoud be truthy and defined', () => {
    expect(genDiff(firstIniFilePath, secondIniFilePath)).toBeTruthy();
    expect(genDiff(firstIniFilePath, secondIniFilePath)).toBeDefined();
  });
});
//
