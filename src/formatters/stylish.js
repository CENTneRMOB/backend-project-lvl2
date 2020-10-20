import _ from 'lodash';

const getIndent = (space) => ' '.repeat(space);
const indentStep = 2;

const stringify = (value, valueDepth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const childNodeDepth = valueDepth + indentStep;
  const mappedValueElements = Object.entries(value)
    .map(([key, subValue]) => `${getIndent(childNodeDepth + indentStep)}${key}: ${stringify(subValue, childNodeDepth + indentStep)}`);

  return [
    '{',
    ...mappedValueElements,
    `${getIndent(valueDepth)}}`,
  ].join('\n');
};

export default (diff) => {
  const iter = (node, nodeDepth) => node.flatMap((item) => {
    const lineIndent = getIndent(nodeDepth);
    const innerLineDepth = nodeDepth + indentStep;
    const mapping = {
      add: (key) => `${lineIndent}+ ${key}: ${stringify(item.value, innerLineDepth)}`,
      remove: (key) => `${lineIndent}- ${key}: ${stringify(item.value, innerLineDepth)}`,
      equal: (key) => `${lineIndent}  ${key}: ${stringify(item.value, innerLineDepth)}`,
      changed: (key) => [
        `${lineIndent}- ${key}: ${stringify(item.value1, innerLineDepth)}`,
        `${lineIndent}+ ${key}: ${stringify(item.value2, innerLineDepth)}`,
      ],
      nested: (key) => [
        `${lineIndent}  ${key}: {`,
        ...iter(item.children, innerLineDepth + indentStep),
        `${getIndent(innerLineDepth)}}`,
      ],
    };
    const { type, key } = item;
    return mapping[type](key);
  });
  return [
    '{',
    ...iter(diff, indentStep),
    '}',
  ].join('\n');
};
