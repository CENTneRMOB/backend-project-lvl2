import yaml from 'js-yaml';
import iniParser from './ini.js';

const parsers = { json: JSON.parse, yaml: yaml.safeLoad, ini: iniParser };

export default (format, content) => parsers[format](content);
