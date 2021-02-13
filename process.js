import fs from 'fs';

var file = fs.readFileSync('wordslist.csv', 'utf8');
var linesArray = file.split('\n');
var words = linesArray.map((line) => { return line.split(',')[0]; });

var trie = {};
function add(node, string) {
  var charactersArray = [...string];

  var head = charactersArray.shift();
  var tail = charactersArray.join('');

  node[head] = node[head] || {};

  if (tail.length) {
    add(node[head], tail);
  }
}

words.forEach(function(word) {
  if (word) {
    add(trie, word);
  }
});

console.log(JSON.stringify(trie));
