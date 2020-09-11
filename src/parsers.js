import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import ini from 'ini';

const extensionWithParsers = { '.json': JSON.parse, '.yaml': yaml.safeLoad, '.ini': ini.parse };

export default (filePath1, filePath2) => {
  const getExtension = path.extname(filePath1);
  const parse = extensionWithParsers[getExtension];
  const content1 = fs.readFileSync(filePath1, 'utf-8');
  const content2 = fs.readFileSync(filePath2, 'utf-8');
  const obj1 = parse(content1);
  const obj2 = parse(content2);
  return [obj1, obj2];
};
