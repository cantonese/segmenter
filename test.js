import { Segmenter } from './index.js';

function assert(a, b) {
  if (JSON.stringify(a) == JSON.stringify(b)) {
    return true;
  } else {
    throw new Error('Tests failed.');
  }
}

/// ***

const myGraphemeSegmenter = new Segmenter('zh-hk', { granularity: 'grapheme' });
const graphemeSpreadExpected = [
  { segment: '我', index: 0, input: '我好鍾意食飯', isWordLike: undefined },
  { segment: '好', index: 1, input: '我好鍾意食飯', isWordLike: undefined },
  { segment: '鍾', index: 2, input: '我好鍾意食飯', isWordLike: undefined },
  { segment: '意', index: 3, input: '我好鍾意食飯', isWordLike: undefined },
  { segment: '食', index: 4, input: '我好鍾意食飯', isWordLike: undefined },
  { segment: '飯', index: 5, input: '我好鍾意食飯', isWordLike: undefined }
];
const graphemeContainingExpected = { segment: '鍾', index: 2, input: '我好鍾意食飯', isWordLike: undefined };

let graphemeSpread = [...myGraphemeSegmenter.segment('我好鍾意食飯')];
let graphemeContaining = myGraphemeSegmenter.segment('我好鍾意食飯').containing(2);

assert(graphemeSpread, graphemeSpreadExpected);
assert(graphemeContaining, graphemeContainingExpected);

// ***

const myWordSegmenter = new Segmenter('zh-hk', { granularity: 'word' });

const wordSpreadExpected = [
  { segment: '我', index: 0, input: '我好鍾意食飯', isWordLike: true },
  { segment: '好', index: 1, input: '我好鍾意食飯', isWordLike: true },
  { segment: '鍾意', index: 2, input: '我好鍾意食飯', isWordLike: true },
  { segment: '食飯', index: 4, input: '我好鍾意食飯', isWordLike: true },
];
const wordContainingExpected = { segment: '鍾意', index: 2, input: '我好鍾意食飯', isWordLike: true };

let wordSpread = [...myWordSegmenter.segment('我好鍾意食飯')];
let wordContainingStart = myWordSegmenter.segment('我好鍾意食飯').containing(2);
let wordContainingEnd = myWordSegmenter.segment('我好鍾意食飯').containing(3);

assert(wordSpread, wordSpreadExpected);
assert(wordContainingStart, wordContainingExpected);
assert(wordContainingEnd, wordContainingExpected);

console.log('Tests passed.');
