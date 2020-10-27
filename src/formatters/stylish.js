import _ from 'lodash';

const getIndent = (space) => ' '.repeat(space);
const indentStep = 4;

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const innerDepth = depth + indentStep;
  const valueEntries = Object.entries(value)
    .map(([key, val]) => `${getIndent(innerDepth)}    ${key}: ${stringify(val, innerDepth)}`);

  return [
    '{',
    ...valueEntries,
    `${getIndent(depth + indentStep)}}`,
  ].join('\n');
};

const mapping = {
  add: (node, depth) => `${getIndent(depth)}  + ${node.key}: ${stringify(node.value, depth)}`,
  remove: (node, depth) => `${getIndent(depth)}  - ${node.key}: ${stringify(node.value, depth)}`,
  equal: (node, depth) => `${getIndent(depth)}    ${node.key}: ${stringify(node.value, depth)}`,
  changed: (node, depth) => [
    `${getIndent(depth)}  - ${node.key}: ${stringify(node.value1, depth)}`,
    `${getIndent(depth)}  + ${node.key}: ${stringify(node.value2, depth)}`,
  ],
  nested: (item, nodeDepth, iter) => [
    `${getIndent(nodeDepth + indentStep)}${item.key}: {`,
    ...iter(item.children, nodeDepth + indentStep),
    `${getIndent(nodeDepth + indentStep)}}`,
  ],
};

const stylish = (diff) => {
  const iter = (nodeItems, nodeDepth) => nodeItems
    .flatMap((item) => mapping[item.type](item, nodeDepth, iter));

  return [
    '{',
    ...iter(diff, 0),
    '}',
  ].join('\n');
};

export default stylish;
