import { Segmenter } from './index.js';

function assert(a, b) {
  if (JSON.stringify(a) == JSON.stringify(b)) {
    return true;
  } else {
    throw new Error('Tests failed.');
  }
}

const spreadExpected = [
  { segment: '我', index: 0, input: '我好鍾意食飯', isWordLike: undefined },
  { segment: '好', index: 1, input: '我好鍾意食飯', isWordLike: undefined },
  { segment: '鍾', index: 2, input: '我好鍾意食飯', isWordLike: undefined },
  { segment: '意', index: 3, input: '我好鍾意食飯', isWordLike: undefined },
  { segment: '食', index: 4, input: '我好鍾意食飯', isWordLike: undefined },
  { segment: '飯', index: 5, input: '我好鍾意食飯', isWordLike: undefined }
];
const containingExpected = { segment: '鍾', index: 2, input: '我好鍾意食飯', isWordLike: undefined };

const mySegmenter = new Segmenter('zh-hk', { granularity: 'character' });

let spread = [...mySegmenter.segment('我好鍾意食飯')];
let containing = mySegmenter.segment('我好鍾意食飯').containing(2);

assert(spread, spreadExpected);
assert(containing, containingExpected);

console.log('Tests passed.');
