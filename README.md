#what3words javascript-wrapper

Use the what3words API in your website (see http://developer.what3words.com/api)


## Installation

This will require jQuery included, if you aren't already using it:
`<script src="//jquery"></script>`

Download and include the what3words JavaScript file
`<script src="/javascript/what3words.js"></script>`


## Functions

### what3words.wordsToPosition(words, callback);
This function takes either:
- a string of 3 words `'table.book.chair'`
- an array of 3 words `['table', 'book', 'chair']`

And the first parameter of the callback is:
- an array of 2 coordinates `[0.1234, 1.5678]`

### what3words.positionToWords(position, callback);
This function takes either:
- a string of 2 positions `'0.1234, 1.5678'`
- an array of 2 positions `[0.1234, 1.5678]`

And the first parameter of the callback is:
- an array of 3 words `['table', 'book', 'chair']`

### what3words.setLanguage(language)
This function sets the classes' language, and takes a 2 letter language string:
- `what3words.setLanguage('fr');`


## Code examples

### Convert position to 3 words

```javascript
what3words.positionToWords([0.1234, 1.5678], function (ret) {
  console.log(ret);
  // Returns ["overtime", "pruners", "bagel"]
});
```

### Convert 3 words to position

```javascript
what3words.wordsToPosition(['table', 'book', 'chair'], function (ret) {
  console.log(ret);
  // Returns [41.12876, -73.403726]
});
```
