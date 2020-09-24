import yaml from 'js-yaml';
import iniParser from './ini.js';

const parsers = { '.json': (content) => JSON.parse(content), '.yaml': (content) => yaml.safeLoad(content), '.ini': iniParser };

export default (extension) => parsers[extension];
