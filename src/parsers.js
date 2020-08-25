import yaml from 'js-yaml';

const formatWithParsers = { '.json': JSON.parse, '.yaml': yaml.safeLoad };

export default (extension) => formatWithParsers[extension];
