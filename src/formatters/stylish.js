import _ from 'lodash';

const getIndent = (spaceCount) => ' '.repeat(spaceCount);
const indentStep = 4;

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const innerDepth = depth + indentStep;
  const lines = Object.entries(value)
    .map(([key, val]) => `${getIndent(innerDepth)}${key}: ${stringify(val, innerDepth)}`);

  return [
    '{',
    ...lines,
    `${getIndent(depth)}}`,
  ].join('\n');
};

const mapping = {
  add: (node, depth) => `${getIndent(depth)}  + ${node.key}: ${stringify(node.value, depth + indentStep)}`,
  remove: (node, depth) => `${getIndent(depth)}  - ${node.key}: ${stringify(node.value, depth + indentStep)}`,
  equal: (node, depth) => `${getIndent(depth)}    ${node.key}: ${stringify(node.value, depth + indentStep)}`,
  changed: (node, depth) => [
    `${getIndent(depth)}  - ${node.key}: ${stringify(node.value1, depth + indentStep)}`,
    `${getIndent(depth)}  + ${node.key}: ${stringify(node.value2, depth + indentStep)}`,
  ],
  nested: (item, depth, iter) => `${getIndent(depth)}    ${item.key}: ${iter(item.children, depth + indentStep)}`,
};

const stylish = (diff) => {
  const iter = (nodes, depth) => {
    const lines = nodes.flatMap((node) => mapping[node.type](node, depth, iter));

    return [
      '{',
      ...lines,
      `${getIndent(depth)}}`,
    ].join('\n');
  };

  return iter(diff, 0);
};

export default stylish;
