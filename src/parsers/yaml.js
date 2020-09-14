import yaml from 'js-yaml';

export default (content) => yaml.safeLoad(content);
