import _ from 'lodash';

const getIndent = (space) => ' '.repeat(space);
const indentStep = 4;

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const innerDepth = depth + indentStep;
  const mappedValueElements = Object.entries(value)
    .map(([key, subValue]) => `${getIndent(innerDepth)}${key}: ${stringify(subValue, innerDepth)}`);

  return [
    '{',
    ...mappedValueElements,
    `${getIndent(depth)}}`,
  ].join('\n');
};

const mapping = {
  add: (node, depth) => `${getIndent(depth).replace(/..$/, '+ ')}${node.key}: ${stringify(node.value, depth)}`,
  remove: (node, depth) => `${getIndent(depth).replace(/..$/, '- ')}${node.key}: ${stringify(node.value, depth)}`,
  equal: (node, depth) => `${getIndent(depth)}${node.key}: ${stringify(node.value, depth)}`,
  changed: (node, depth) => [
    `${getIndent(depth).replace(/..$/, '- ')}${node.key}: ${stringify(node.value1, depth)}`,
    `${getIndent(depth).replace(/..$/, '+ ')}${node.key}: ${stringify(node.value2, depth)}`,
  ],
};

const stylish = (diff) => {
  const iter = (node, nodeDepth) => node.flatMap((item) => {
    if (item.type !== 'nested') {
      return mapping[item.type](item, nodeDepth);
    }

    return [
      `${getIndent(nodeDepth)}${item.key}: {`,
      ...iter(item.children, nodeDepth + indentStep),
      `${getIndent(nodeDepth)}}`,
    ];
  });

  return [
    '{',
    ...iter(diff, indentStep),
    '}',
  ].join('\n');
};

export default stylish;
