import fs from 'fs';
import path from 'path';
import jsonParser from './json.js';
import yamlParser from './yaml.js';
import iniParser from './ini.js';

const jsonParse = (content) => jsonParser(content);
const yamlParse = (content) => yamlParser(content);
const iniParse = (content) => iniParser(content);

const extensionWithParsers = { '.json': jsonParse, '.yaml': yamlParse, '.ini': iniParse };

export default (filePath1, filePath2) => {
  const getExtension = path.extname(filePath1);
  const parse = extensionWithParsers[getExtension];
  const content1 = fs.readFileSync(filePath1, 'utf-8');
  const content2 = fs.readFileSync(filePath2, 'utf-8');
  const obj1 = parse(content1);
  const obj2 = parse(content2);
  return [obj1, obj2];
};
