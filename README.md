#what3words javascript-wrapper

Use the what3words API in your website (see http://what3words.com/api/reference)


## Installation

This will require jQuery included, if you aren't already using it:
`<script src="//jquery"></script>`

Download and include the what3words JavaScript file
`<script src="/javascript/what3words.js"></script>`


## Functions

### What3words.wordsToPosition(words, callback);
This function takes either:
- a string of 3 words `'table.book.chair'`
- or an array of 3 words `['table', 'book', 'chair']`
- a oneword string `'*BobsHouse'`

And the first parameter of the callback is:
- an array of 2 coordinates `[0.1234, 1.5678]`

### What3words.positionToWords(position, callback);
This function takes either:
- a string of 2 positions `'0.1234, 1.5678'`
- or an array of 2 positions `[0.1234, 1.5678]`

And the first parameter of the callback is:
- an array of 3 words `['table', 'book', 'chair']`

### What3words.setLanguage(language)
This function sets the classes' language, and takes a 2 letter language string:
- `What3words.setLanguage('fr');`


## Code examples

### Convert position to 3 words

```javascript
What3words.positionToWords([0.1234, 1.5678], function (ret) {
  console.log(ret);
  // Returns ["overtime", "pruners", "bagel"]
});
```

### Convert 3 words to position

```javascript
What3words.wordsToPosition(['table', 'book', 'chair'], function (ret) {
  console.log(ret);
  // Returns [41.12876, -73.403726]
});
```
