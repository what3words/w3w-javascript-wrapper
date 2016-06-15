#what3words javascript-wrapper

Use the what3words API in your website (see http://developer.what3words.com/api)


## Installation

This will require jQuery included, if you aren't already using it:
`<script src="//jquery"></script>`

Download and include the what3words JavaScript file
`<script src="/javascript/what3words.js"></script>`

You will need an API key from what3words.

## Functions

### what3words.forward(words, callback);
This function takes either:
- a string of 3 words `'table.book.chair'`
- an array of 3 words `['table', 'book', 'chair']`

And the first parameter of the callback is:
- an array of 2 coordinates `[0.1234, 1.5678]`

### what3words.reverse(position, callback);
This function takes either:
- a string of 2 positions `'0.1234, 1.5678'`
- an array of 2 positions `[0.1234, 1.5678]`

And the first parameter of the callback is:
- an array of 3 words `['table', 'book', 'chair']`

### what3words.autosuggest(words, callback);
This function takes either:
- a string of 2 words and a partial `'table.book.ch'`
- an array of 2 words and a partial `['table', 'book', 'ch']`

And the first parameter of the callback is:
- an array of 2 coordinates `[0.1234, 1.5678]`

### what3words.standardblend(words, callback);
This function takes a 3 word address may either be a full 3 word address or a partial 3 word address containing the first 2 words in full and at least 1 character of the 3rd word in either string or array format.
- a string of 2 words and a partial `'plan.clips.above'`
- an array of 2 words and a partial `['plan', 'clips', 'abov']`

And the first parameter of the callback is:
- an array of 2 coordinates `{
  "blends": [
    {
      "distance": 1,
      "rank": 1,
      "words": "plan.clips.above",
      "language": "en",
      "place": "Teddington, London",
      "geometry": {
        "lng": -0.348023,
        "lat": 51.432393
      },
      "country": "gb"
    },
...
}`

### what3words.setLanguage(language)
This function sets the classes' language, and takes a 2 letter language string:
- `what3words.setLanguage('fr');`

### what3words.languages()
This function returns a list of available languages from the API:
- `what3words.languages();`

## Code examples

### Convert position to 3 words

```javascript
what3words.forward([0.1234, 1.5678], function (ret) {
  console.log(ret);
  // Returns ["overtime", "pruners", "bagel"]
});
```

### Convert 3 words to position

```javascript
what3words.reverse(['table', 'book', 'chair'], function (ret) {
  console.log(ret);
  // Returns [41.12876, -73.403726]
});
```
