import _ from 'lodash';

const markers = {
  ADD: 'add',
  REMOVE: 'remove',
  EQUAL: 'equal',
  CHANGED: 'changed',
  NESTED: 'nested',
};

const spase = ' ';

const formatTheValue = (value, spases) => {
  if (_.isPlainObject(value)) {
    const elementsOfValue = Object.entries(value);
    const mapped = elementsOfValue.map(([key, subValue]) => `${spase.repeat(spases + 6)}${key}: ${formatTheValue(subValue, spases + 4)}`);

    return `{\n${mapped.join('\n')}\n${spase.repeat(spases + 2)}}`;
  }

  return value;
};

export default (diff) => {
  const iter = (node, spases) => node.map((item) => {
    const { type, key } = item;
    if (type === markers.REMOVE) {
      return `${spase.repeat(spases)}- ${key}: ${formatTheValue(item.value, spases)}`;
    }
    if (type === markers.ADD) {
      return `${spase.repeat(spases)}+ ${key}: ${formatTheValue(item.value, spases)}`;
    }
    if (type === markers.EQUAL) {
      return `${spase.repeat(spases)}  ${key}: ${formatTheValue(item.value, spases)}`;
    }
    if (type === markers.CHANGED) {
      return `${spase.repeat(spases)}- ${key}: ${formatTheValue(item.value1, spases)}\n${spase.repeat(spases)}+ ${key}: ${formatTheValue(item.value2, spases)}`;
    }

    return `${spase.repeat(spases)}  ${key}: {\n${iter(item.children, spases + 4).join('\n')}\n${spase.repeat(spases + 2)}}`;
  });
  return `{\n${iter(diff, 2).join('\n')}\n}`;
};
