import _ from 'lodash';

const spase = ' ';
const getIndent = (depth) => `${spase.repeat(depth)}`;
const depthStep = 2;

const tranformValueToString = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const mappedValueElements = Object.entries(value).map(([key, subValue]) => `${getIndent(depth + depthStep * 3)}${key}: ${tranformValueToString(subValue, depth + depthStep * 2)}`);

  return `{\n${mappedValueElements.join('\n')}\n${getIndent(depth + depthStep)}}`;
};

export default (diff) => {
  const iter = (node, depth) => node.map((item) => {
    const mapping = {
      add: (key) => `${getIndent(depth)}+ ${key}: ${tranformValueToString(item.value, depth)}`,
      remove: (key) => `${getIndent(depth)}- ${key}: ${tranformValueToString(item.value, depth)}`,
      equal: (key) => `${getIndent(depth)}  ${key}: ${tranformValueToString(item.value, depth)}`,
      changed: (key) => `${getIndent(depth)}- ${key}: ${tranformValueToString(item.value1, depth)}\n${getIndent(depth)}+ ${key}: ${tranformValueToString(item.value2, depth)}`,
      nested: (key) => `${getIndent(depth)}  ${key}: {\n${iter(item.children, depth + depthStep * 2).join('\n')}\n${getIndent(depth + depthStep)}}`,
    };
    const { type, key } = item;
    return mapping[type](key);
  });
  return `{\n${iter(diff, depthStep).join('\n')}\n}`;
};
