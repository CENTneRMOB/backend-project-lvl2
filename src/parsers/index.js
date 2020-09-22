import jsonParser from './json.js';
import yamlParser from './yaml.js';
import iniParser from './ini.js';

const parsers = { '.json': jsonParser, '.yaml': yamlParser, '.ini': iniParser };

export default (extension) => {
  const parser = parsers[extension];
  return parser;
};
