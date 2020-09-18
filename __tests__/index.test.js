import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const getFilePath = (name, extension) => {
  const dirname = path.resolve('.', '__fixtures__');
  return path.join(dirname, `${name}${extension}`);
};

describe.each`
extension    | outputFormat    | expectedFormatedContent
${'.json'} | ${'stylish'} | ${fs.readFileSync(getFilePath('stylish-result', '.txt'), 'utf-8')}
${'.json'} | ${'plain'} | ${fs.readFileSync(getFilePath('plain-result', '.txt'), 'utf-8')}
${'.json'} | ${'json'} | ${fs.readFileSync(getFilePath('json-result', '.txt'), 'utf-8')}
${'.yaml'} | ${'stylish'} | ${fs.readFileSync(getFilePath('stylish-result', '.txt'), 'utf-8')}
${'.yaml'} | ${'plain'} | ${fs.readFileSync(getFilePath('plain-result', '.txt'), 'utf-8')}
${'.yaml'} | ${'json'} | ${fs.readFileSync(getFilePath('json-result', '.txt'), 'utf-8')}
${'.ini'} | ${'stylish'} | ${fs.readFileSync(getFilePath('stylish-result', '.txt'), 'utf-8')}
${'.ini'} | ${'plain'} | ${fs.readFileSync(getFilePath('plain-result', '.txt'), 'utf-8')}
${'.ini'} | ${'json'} | ${fs.readFileSync(getFilePath('json-result', '.txt'), 'utf-8')}
`('Should return correct difference between two files with equal extensions(.json, .yaml, .ini)', ({ extension, outputFormat, expectedFormatedContent }) => {
  test(`Should return difference between two ${extension} in ${outputFormat} format`, () => {
    const firstFilePath = getFilePath('file1', extension);
    const secondFilePath = getFilePath('file2', extension);
    expect(genDiff(firstFilePath, secondFilePath, outputFormat)).toBe(expectedFormatedContent);
  });
});
