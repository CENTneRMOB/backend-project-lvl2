import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const plainOutput = (diff) => plain(diff);
const stylishOutput = (diff) => stylish(diff);
const jsonOutput = (diff) => json(diff);

const formatters = { plain: plainOutput, stylish: stylishOutput, json: jsonOutput };

export default (diff, format) => formatters[format](diff);
