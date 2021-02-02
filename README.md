# @cantonese/segmenter

This library currently does not implement true segmentation for Cantonese. It is instead a placeholder for future work.

Implements the [proposed `Intl.Segmenter` API shape](https://github.com/tc39/proposal-intl-segmenter).

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
