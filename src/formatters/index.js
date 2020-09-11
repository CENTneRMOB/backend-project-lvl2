import plain from './plain.js';
import stylish from './stylish.js';

const plainOutput = (diff) => plain(diff);
const stylishOutput = (diff) => stylish(diff);

const formatters = { plain: plainOutput, stylish: stylishOutput };

export default (diff, format) => formatters[format](diff);
