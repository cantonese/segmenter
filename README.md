# @cantonese/segmenter

This library implements basic `grapheme` and `word` segmentation for Cantonese by comparing a depth-first trie traversal of a word list to a supplied string. The trie is built from an unmodified [words.hk word list](https://words.hk/faiman/analysis/wordslist/).

In the future it will use different models informed by natural language processing/computational linguistics.

Implements the [proposed `Intl.Segmenter` API shape](https://github.com/tc39/proposal-intl-segmenter).

## Installation

`npm install --save https://github.com/cantonese/segmenter`

## Usage

```js
import { Segmenter } from '@cantonese/segmenter';

function transform(segmentInfo) {
  return segmentInfo.segment.reverse();
}

var mySegmenter = new Segmenter('zh-hk', { granularity: 'word' });
var mySegments = mySegmenter.segment('我好鍾意食飯');
var transformed = [...mySegments].map(transform);

var atIndex = mySegments.contains(2);
```
