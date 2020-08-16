import fs from 'fs';
import _ from 'lodash';

const ADD = 'add';
const REMOVE = 'remove';
const EQUAL = 'equal';
const CHANGED = 'changed';

const genDiff = (filePath1, filePath2) => {
  const content1 = fs.readFileSync(filePath1, 'utf-8');
  const content2 = fs.readFileSync(filePath2, 'utf-8');
  const obj1 = JSON.parse(content1);
  const obj2 = JSON.parse(content2);

  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);

  const unionOfKeys = _.uniq(keysOfObj1.concat(keysOfObj2)).sort();
  const diff = [];

  unionOfKeys.forEach((key) => {
    if (!_.has(obj2, key)) {
      diff.push({ type: REMOVE, key, value: obj1[key] });
    } else if (!_.has(obj1, key)) {
      diff.push({ type: ADD, key, value: obj2[key] });
    } else {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (value1 === value2) {
        diff.push({ type: EQUAL, key, value: value1 });
      } else {
        diff.push({
          type: CHANGED, key, value1, value2,
        });
      }
    }
  });

  const result = [];

  diff.forEach((element) => {
    const { type, key } = element;
    switch (type) {
      case ADD:
        result.push(`  + ${key}: ${element.value}`);
        break;
      case REMOVE:
        result.push(`  - ${key}: ${element.value}`);
        break;
      case EQUAL:
        result.push(`    ${key}: ${element.value}`);
        break;
      case CHANGED:
        result.push(`  - ${key}: ${element.value1}`);
        result.push(`  + ${key}: ${element.value2}`);
        break;
      default:
        console.log('error');
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
