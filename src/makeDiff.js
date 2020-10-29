import _ from 'lodash';

const markers = {
  ADD: 'add',
  REMOVE: 'remove',
  EQUAL: 'equal',
  CHANGED: 'changed',
  NESTED: 'nested',
};

const makeDiff = (obj1, obj2) => {
  const unionOfKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedUnionOfKeys = _.sortBy(unionOfKeys);

  return sortedUnionOfKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return { type: markers.REMOVE, key, value: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { type: markers.ADD, key, value: obj2[key] };
    }
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: markers.NESTED, key, children: makeDiff(value1, value2) };
    }
    if (value1 === value2) {
      return { type: markers.EQUAL, key, value: value1 };
    }

    return {
      type: markers.CHANGED, key, value1, value2,
    };
  });
};

export default makeDiff;
