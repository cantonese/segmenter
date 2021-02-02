const GRANULARITY = ['character', 'word'];
const privateFields = new WeakMap();

export class Segmenter {
  constructor(locale, options = {}) {
    let processedOptions = {};

    if (GRANULARITY.indexOf(options.granularity) !== -1) {
      processedOptions.granularity = options.granularity;
    } else {
      processedOptions.granularity = GRANULARITY[0];
    }

    privateFields[this] = {
      locale,
      options: processedOptions
    };
  }

  get [Symbol.toStringTag]() {
    return 'Segmenter';
  }

  segment(string) {
    return new Segments(this, string);
  }
};

export class Segments {
  constructor(segmenter, string) {
    privateFields[this] = {
      segmenter,
      string
    };
  }

  get [Symbol.toStringTag]() {
    return 'Segments';
  }

  [Symbol.iterator]() {
    let { segmenter, string } = privateFields[this];
    return new SegmentIterator(segmenter, string);
  }

  containing(index) {
    let { segmenter, string } = privateFields[this];
    let iterator = new SegmentIterator(segmenter, string);

    let previousSegmentData = iterator.next();
    for (let segmentData of iterator) {
      if (index < segmentData.index) {
        return previousSegmentData;
      }
      previousSegmentData = segmentData;
    }
  }
}

export class SegmentIterator {
  constructor(segmenter, string) {
    privateFields[this] = {
      segmenter,
      string,
      iterator: string[Symbol.iterator](),
      index: 0
    };
  }

  get [Symbol.toStringTag]() {
    return 'SegmentIterator';
  }

  [Symbol.iterator]() { return this; }

  next() {
    // TODO: identify real boundaries.
    let delegatedIteratorResult = privateFields[this].iterator.next();

    let segmenter = privateFields[this].segmenter;
    let options = privateFields[segmenter].options;

    // `isWordLike` only applies when granularity is `word`.
    let isWordLike = undefined;
    if (options.granularity === 'word') {
      // TODO: identify is isWordLike.
      isWordLike = true;
    }

    // `value` is undefined if the iterator is `done`.
    let value = undefined;
    if (!delegatedIteratorResult.done) {
      value = Object.create(null);
      value.segment = delegatedIteratorResult.value;
      value.index = privateFields[this].index;
      value.input = privateFields[this].string;
      value.isWordLike = isWordLike;

      // Capture progression through the input string.
      privateFields[this].index += value.segment.length;
    }

    // Build the output of the iterator.
    let result = {
      done: delegatedIteratorResult.done,
      value
    };

    return result;
  }
}
