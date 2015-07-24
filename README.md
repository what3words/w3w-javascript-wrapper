# w3w-javascript-wrapper

## Description

A _vanilla_ Javascript wrapper, with no dependencies, to authenticate and interact with the [what3words](http://developer.what3words.com/) REST API.

## Installation

### Via Bower

```bash
$ bower install w3w-javascript-wrapper
```

### Via Download

The latest version is always available for download from https://github.com/what3words/w3w-javascript-wrapper/archive/master.zip

## Usage

Include the what3words wrapper into your HTML source.

```html
<script src="//[path-to-wrapper]/dist/what3words.js" type="text/javascript"></script>
```

You'll need to [register](https://map.what3words.com/register?dev=true) for a what3words API key to access the API. The key is passed to a new instance of the `What3Words` class.

```javascript
var options =  {
    key: 'YOUR-API-KEY-HERE',
    lang: 'en'
};
var w3w = new What3Words(options);
```

## Callbacks

Each what3words API call uses two callbacks, invoked on either success or failure of the API call. The callback handler is passed to each API call and is specified as an object literal as follows:

```javascript
var callbackHandler = {
    onSuccess: function(response) {
        // successful response handling
    },
    onFailure: function(response) {
        // error response handling
    }
};
```

Each callback's `response` parameter will contain the JSON payload from the what3words API.

## Functions

### What3Words.wordsToPosition(words, corners, callbackHandler);

Converts a 3 words address to the corresponding coordinates, as longitude and latitude.

The `words` parameter can be either:
- a string of 3 dot separated words: `'index.home.raft'`
- or an array of 3 words: `['index', 'home', 'raft']`

The `corners` parameter is a `boolean` value; if set to `true` to return JSON will contain the bounding box for the 3 word address.

The `onSuccess` callback's JSON will look similar to the following:

```JSON
{
    "type": "3 words",
    "words": ["index", "home", "raft"],
    "position": [51.521251, -0.203586],
    "language": "en"
}
```

For more information see the `w3w` [documentation](http://developer.what3words.com/api/#3toposition).

### What3Words.positionToWords(position, corners, callbackHandler);

Converts a longitude and latitude to the nearest 3 word address.

The `position` parameter can be either:
- a string containing comma separated longitude and latitude: `'0.1234, 1.5678'`
- an array of longitude and latitude: `[0.1234, 1.5678]`

The `corners` parameter is a `boolean` value; if set to `true` to return JSON will contain the bounding box for the 3 word address.

The `onSuccess` callback's JSON will look similar to the following:

```JSON
{
    "words": ["plan", "clips", "above"],
    "position": [51.432393, -0.348023],
    "language": "en"
}
```

For more information see the `position` [documentation](http://developer.what3words.com/api/#positionto3).

### What3Words.getLanguages(callbackHandler);

Returns the set of languages that the what3words API currently supports.

The `onSuccess` callback's JSON will look similar to the following:

```JSON
{
    "languages": [
        {"code": "de", "name_display": "Deutsch (beta)"},
        {"code": "en", "name_display": "English"},
        {"code": "es", "name_display": "Español"},
        {"code": "fr", "name_display": "Français"},
        {"code": "pt", "name_display": "Português"},
        {"code": "ru", "name_display": "Русский (beta)"},
        {"code": "sv", "name_display": "Svenska (beta)"},
        {"code": "sw", "name_display": "Kiswahili"},
        {"code": "tr", "name_display": "Türkçe (beta)"}
    ]
}
```

For more information see the `get-languages` [documentation](http://developer.what3words.com/api/#getlanguages).

### What3Words.setLanguage(language)

Helper function to override the default language with a custom language, specified as an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 2 character language code.
