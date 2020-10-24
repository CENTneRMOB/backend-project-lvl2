import _ from 'lodash';

const getIndent = (space) => ' '.repeat(space);
const putOperationSign = (string, sign) => {
  switch (sign) {
    case '+':
      return string.replace(/..$/, '+ ');
    case '-':
      return string.replace(/..$/, '- ');
    default:
      return string;
  }
};
const indentStep = 4;

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const innerDepth = depth + indentStep;
  const valueEntries = Object.entries(value)
    .map(([key, subValue]) => `${getIndent(innerDepth)}${key}: ${stringify(subValue, innerDepth)}`);

  return [
    '{',
    ...valueEntries,
    `${getIndent(depth)}}`,
  ].join('\n');
};

const mapping = {
  add: (node, depth) => `${putOperationSign(getIndent(depth), '+')}${node.key}: ${stringify(node.value, depth)}`,
  remove: (node, depth) => `${putOperationSign(getIndent(depth), '-')}${node.key}: ${stringify(node.value, depth)}`,
  equal: (node, depth) => `${putOperationSign(getIndent(depth))}${node.key}: ${stringify(node.value, depth)}`,
  changed: (node, depth) => [
    `${putOperationSign(getIndent(depth), '-')}${node.key}: ${stringify(node.value1, depth)}`,
    `${putOperationSign(getIndent(depth), '+')}${node.key}: ${stringify(node.value2, depth)}`,
  ],
};

const stylish = (diff) => {
  const iter = (nodeItems, nodeDepth) => nodeItems.flatMap((item) => {
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
