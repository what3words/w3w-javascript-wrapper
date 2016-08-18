# ![what3words](https://map.what3words.com/images/map/marker-border.png)w3w-javascript-wrapper ![Build Status](https://travis-ci.org/what3words/w3w-javascript-wrapper.svg)

## Description

A _vanilla_ Javascript wrapper, with no upstream dependencies, to authenticate and interact with v2 of the [what3words RESTful API](https://docs.what3words.com/api/v2/).

## Installation

### Via Bower

```bash
$ bower install w3w-javascript-wrapper
```

### Via NPM

```bash
$ npm install w3w-javascript-wrapper --save
```

### Via Download

The latest version is always available for download from https://github.com/what3words/w3w-javascript-wrapper/archive/master.zip

## Getting Started

Include the what3words wrapper into your HTML source.

```html
<script src="//[path-to-wrapper]/dist/W3W.Geocoder.min.js" type="text/javascript"></script>
```

You'll need to [register](https://map.what3words.com/register?dev=true) for a what3words API key to access the API. The key is passed to a new instance of the `W3W.Geocoder` class.

```javascript
var options =  {
    key: 'YOUR-API-KEY-HERE',
    lang: 'en'
};
var w3w = new W3W.Geocoder(options);
```

## <a name="callbacks"></a>Callbacks

Each `W3W.Geocoder` method call uses two callbacks, which invoked on either success or failure of the API call. The callback handler must be passed to each method and is specified as an object literal as follows:

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

## Forward Geocoding

Forward geocodes a 3 word address to a position, expressed as coordinates of latitude and longitude.

See also the [what3words API forward geocoding documentation](https://docs.what3words.com/api/v2/#forward) for more detailed information.

### `W3W.Geocoder.forward(params, callbackHandler);`

#### `params`

Object literal containing the parameters to be passed to the `forward` method.

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `addr` | `String` | None | A 3 word address |
| `lang` | `String` | `en` | A supported 3 word address language as an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 2 letter code |

#### `callbackHandler`

Object literal containing the `onSuccess` and `onFailure` functions; see [callbacks](#callbacks) for more information.

The `onSuccess` callback's JSON will look similar to the following:

```JSON
{
  "crs": {
    "type": "link",
    "properties": {
      "href": "http://spatialreference.org/ref/epsg/4326/ogcwkt/",
      "type": "ogcwkt"
    }
  },
  "words": "index.home.raft",
  "bounds": {
    "southwest": {
      "lng": -0.203607,
      "lat": 51.521238
    },
    "northeast": {
      "lng": -0.203564,
      "lat": 51.521265
    }
  },
  "geometry": {
    "lng": -0.203586,
    "lat": 51.521251
  },
  "language": "en",
  "map": "http://w3w.co/index.home.raft",
  "status": {
    "status": 200,
    "reason": "OK"
  },
  "thanks": "Thanks from all of us at index.home.raft for using a what3words API"
}
```

#### Forward Geocoding Example

```JavaScript
var w3w;
var options = {
    key: 'API-KEY'
};

w3w = new W3W.Geocoder(options);

var callback = {
    onSuccess: function(data) {
        console.log(JSON.stringify(data));
    },
    onFailure: function(data) {
        console.log(JSON.stringify(data));
    }
};

var params = {
    addr: 'index.home.raft'
};

w3w.forward(params, callback);

```

## Reverse Geocoding

Reverse geocodes coordinates, expressed as latitude and longitude to a 3 word address.

See also the [what3words API reverse geocoding documentation](https://docs.what3words.com/api/v2/#reverse) for more detailed information.

### `W3W.Geocoder.reverse(params, callbackHandler);`

#### `params`

Object literal containing the parameters to be passed to the `reverse` method.

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `coords` | `String`,`Array` | None | Coordinates either as a comma separated string or as an array in long, lat order |
| `lang` | `String` | `en` | A supported 3 word address language as an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 2 letter code |

#### `callbackHandler`

Object literal containing the `onSuccess` and `onFailure` functions; see [callbacks](#callbacks) for more information.

The `onSuccess` callback's JSON will look similar to the following:

```JSON
{
  "crs": {
    "type": "link",
    "properties": {
      "href": "http://spatialreference.org/ref/epsg/4326/ogcwkt/",
      "type": "ogcwkt"
    }
  },
  "words": "index.home.raft",
  "bounds": {
    "southwest": {
      "lng": -0.203607,
      "lat": 51.521238
    },
    "northeast": {
      "lng": -0.203564,
      "lat": 51.521265
    }
  },
  "geometry": {
    "lng": -0.203586,
    "lat": 51.521251
  },
  "language": "en",
  "map": "http://w3w.co/index.home.raft",
  "status": {
    "status": 200,
    "reason": "OK"
  },
  "thanks": "Thanks from all of us at index.home.raft for using a what3words API"
}
```

#### Reverse Geocoding Example

```JavaScript
var w3w;
var options = {
    key: 'API-KEY'
};

w3w = new W3W.Geocoder(options);

var callback = {
    onSuccess: function(data) {
        console.log(JSON.stringify(data));
    },
    onFailure: function(data) {
        console.log(JSON.stringify(data));
    }
};

var params = {
    coords: [51.521251, -0.203586]
};

w3w.reverse(params, callback);
```

## AutoSuggest

Returns a list of 3 word addresses based on user input and other parameters.

This method provides corrections for the following types of input error:

* typing errors
* spelling errors
* misremembered words (e.g. singular vs. plural)
words in the wrong order

The `autosuggest` method determines possible corrections to the supplied 3 word address string based on the probability of the input errors listed above and returns a ranked list of suggestions. This method can also take into consideration the geographic proximity of possible corrections to a given location to further improve the suggestions returned.

See also the [what3words API AutoSuggest documentation](https://docs.what3words.com/api/v2/#autosuggest) for more detailed information.

### Input 3 word address
You will only receive results back if the partial 3 word address string you submit contains the first two words and at least the first character of the third word; otherwise an error message will be returned.

### Clipping and Focus
We provide various clipping policies to allow you to specify a geographic area that is used to exclude results that are not likely to be relevant to your users. We recommend that you use the `clip` parameter to give a more targeted, shorter set of results to your user. If you know your user’s current location, we also strongly recommend that you use the `focus` to return results which are likely to be more relevant.

In summary, the clip policy is used to optionally restrict the list of candidate `autosuggest` results, after which, if `focus` has been supplied, this will be used to weight the results in order of relevancy to the `focus`.

### Language
The `lang` parameter is mandatory for `autosuggest`; we recommend that you set this according to the language of your user interface, or the browser/device language of your user. If your software or app displays 3 word addresses to users (in addition to accepting 3 words as a search/input) then we recommend you set the `lang` parameter for this method to the same language that 3 word addresses are displayed to your users.

### `W3W.Geocoder.autosuggest(params, callbackHandler);`

#### `params`

Object literal containing the parameters to be passed to the `autosuggest` method.

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `addr` | `String` | None | The full or partial 3 word address to obtain blended candidates for. At minimum this must be the first two complete words plus at least one character from the third word |
| `focus` | `String`,`Array` | None | A location, specified as a either as a comma separated string or as an array in long, lat order used to refine the results. If specified, the results will be weighted to give preference to those near the specified location |
| `lang` | `String` | None | A supported 3 word address language as an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 2 letter code |
| `clip` | `Object` | None | A clipping policy, described below |

#### No Clipping

| Param | Type | Description |
| ----- | ---- | ----------- |
| `type` | `String` | The value `none` |

#### Radius Clipping

| Param | Type | Description |
| ----- | ---- | ----------- |
| `type` | `String` | The value `radius` |
| `focus` | `String`, `Array` | A location, specified as a either as a comma separated string or as an array in long, lat order
| `distance` | `Number` | The distance in km from the clip `focus` outside which results will be excluded

#### Focus Clipping

| Param | Type | Description |
| ----- | ---- | ----------- |
| `type` | `String` | The value `focus` |
| `distance` | `Number` | The distance in km from the main `focus` outside which results will be excluded

#### Bounding Box Clipping

| Param | Type | Description |
| ----- | ---- | ----------- |
| `type` | `String` | The value `bbox` |
| `bbox` | `String`, `Array` | Bounding box, specified by the northeast and southwest corner coordinates, outside which results will be excluded. The bounding box can be specified either as a comma separated string or as an array of 4 elements in lat, long order|

#### `callbackHandler`

Object literal containing the `onSuccess` and `onFailure` functions; see [callbacks](#callbacks) for more information.

The `onSuccess` callback's JSON will look similar to the following:

```JSON{
  "suggestions": [
    {
      "score": 98.876510656689,
      "country": "gb",
      "distance": 22,
      "words": "index.home.herb",
      "rank": 1,
      "geometry": {
        "lng": -0.069423,
        "lat": 51.333077
      },
      "place": "Warlingham, Surrey"
    },
    {
      "score": 101.02473665127,
      "country": "gb",
      "distance": 30,
      "words": "index.home.cars",
      "rank": 2,
      "geometry": {
        "lng": -0.262548,
        "lat": 51.686435
      },
      "place": "Shenley AV, Herts."
    },
    {
      "score": 103.30110763031,
      "country": "gb",
      "distance": 17,
      "words": "index.home.fears",
      "rank": 3,
      "geometry": {
        "lng": -0.170096,
        "lat": 51.314292
      },
      "place": "Coulsdon, London"
    }
  ],
  "status": {
    "status": 200,
    "reason": "OK"
  },
  "thanks": "Thanks from all of us at index.home.raft for using a what3words API"
}
```

#### AutoSuggest Example

```JavaScript
var w3w;
var options = {
    key: 'API-KEY'
};

w3w = new W3W.Geocoder(options);

var callback = {
    onSuccess: function(data) {
        console.log(JSON.stringify(data));
    },
    onFailure: function(data) {
        console.log(JSON.stringify(data));
    }
};

// No focus and no clipping
var params = {
    addr: 'plan.clips.a',
    lang: 'en',
    clip: {
        type: 'none'
    }
};
w3w.autosuggest(params, callback);

// With focus and no clipping
params = {
    addr: 'plan.clips.a',
    focus: [51.521251, -0.203586],
    lang: 'en',
    clip: {
        type: 'none'
    }
};
w3w.autosuggest(params, callback);

/// With focus and clipping to 100 km of the focus
params = {
    addr: 'plan.clips.a',
    focus: [51.521251, -0.203586],
    lang: 'en',
    clip: {
        type: 'focus',
        distance: 100
    }
};
w3w.autosuggest(params, callback);

// With no focus and clipping to 100 km of 51.521251, -0.203586
params = {
    addr: 'plan.clips.a',
    lang: 'en',
    clip: {
        type: 'radius',
        focus: [51.521251, -0.203586],
        distance: 100
    }
};
w3w.autosuggest(params, callback);

// With focus and clipping inside of a bounding box
params = {
    addr: 'plan.clips.a',
    lang: 'en',
    focus: [51.4243877, -0.3474524],
    clip: {
        type: 'bbox',
        bbox: [54, 2, 50, -4]
    }
};
w3w.autosuggest(params, callback);
```

## StandardBlend

Returns a blend of the three most relevant 3 word address candidates for a given location, based on a full or partial 3 word address.

The specified 3 word address may either be a full 3 word address or a partial 3 word address containing the first 2 words in full and at least 1 character of the 3rd word. The `standardblend` method provides the search logic that powers the search box on [map.what3words.com](https://map.what3words.com/) and in the what3words mobile apps.

See also the [what3words API StandardBlend documentation](https://docs.what3words.com/api/v2/#sstandardblend) for more detailed information.

### `W3W.Geocoder.standardblend(params, callbackHandler);`

#### `params`

Object literal containing the parameters to be passed to the `standardblend` method.

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `addr` | `String` | None | The full or partial 3 word address to obtain blended candidates for. At minimum this must be the first two complete words plus at least one character from the third word |
| `focus` | `String`,`Array` | None | A location, specified as a either as a comma separated string or as an array in long, lat order used to refine the results. If specified, the results will be weighted to give preference to those near the specified location |
| `lang` | `String` | None | A supported 3 word address language as an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 2 letter code |

#### `callbackHandler`

Object literal containing the `onSuccess` and `onFailure` functions; see [callbacks](#callbacks) for more information.

The `onSuccess` callback's JSON will look similar to the following:

```JSON
{
  "blends": [
    {
      "country": "gb",
      "distance": 15,
      "words": "index.home.raft",
      "rank": 1,
      "language": "en",
      "geometry": {
        "lng": -0.203586,
        "lat": 51.521251
      },
      "place": "Bayswater, London"
    },
    {
      "country": "us",
      "distance": 6240,
      "words": "indexes.home.raft",
      "rank": 2,
      "language": "en",
      "geometry": {
        "lng": -81.23548,
        "lat": 37.833158
      },
      "place": "Prosperity, West Virginia"
    },
    {
      "country": "us",
      "distance": 6282,
      "words": "index.homes.raft",
      "rank": 3,
      "language": "en",
      "geometry": {
        "lng": -79.81275,
        "lat": 36.02206
      },
      "place": "Greensboro, North Carolina"
    }
  ],
  "status": {
    "status": 200,
    "reason": "OK"
  },
  "thanks": "Thanks from all of us at index.home.raft for using a what3words API"
}
```

#### StandardBlend Example

```JavaScript
var w3w;
var options = {
    key: 'API-KEY'
};

w3w = new W3W.Geocoder(options);

var callback = {
    onSuccess: function(data) {
        console.log(JSON.stringify(data));
    },
    onFailure: function(data) {
        console.log(JSON.stringify(data));
    }
};

var params = {
    addr: 'index.home.raft',
    lang: 'en',
    focus: [51.4243877, -0.3474524]
};

w3w.standardblend(params, callback);
```

## Grid

Returns a section of the 3m x 3m what3words grid for a given area.

See also the [what3words API grid documentation](https://docs.what3words.com/api/v2/#grid) for more detailed information.

### `W3W.Geocoder.grid(params, callbackHandler);`

#### `params`

Object literal containing the parameters to be passed to the `grid` method.

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `bbox` | `String`, `Array` | None | Bounding box, specified by the northeast and southwest corner coordinates, for which the grid should be returned. The bounding box can be specified either as a comma separated string or as an array of 4 elements in lat, long order|

#### `callbackHandler`

Object literal containing the `onSuccess` and `onFailure` functions; see [callbacks](#callbacks) for more information.

The `onSuccess` callback's JSON will look similar to the following:

```JSON
{
  "lines": [
    {
      "start": {
        "lng": 0.11612600000001,
        "lat": 52.208009918068
      },
      "end": {
        "lng": 0.11753999999999,
        "lat": 52.208009918068
      }
    },
    {
      "start": {
        "lng": 0.11612600000001,
        "lat": 52.20803686934
      },
      "end": {
        "lng": 0.11753999999999,
        "lat": 52.20803686934
      }
    },
    ...
  ],
  "status": {
    "status": 200,
    "reason": "OK"
  },
  "thanks": "Thanks from all of us at index.home.raft for using a what3words API"
}
```

#### Grid Example

```JavaScript
var w3w;
var options = {
    key: 'API-KEY'
};

w3w = new W3W.Geocoder(options);

var callback = {
    onSuccess: function(data) {
        console.log(JSON.stringify(data));
    },
    onFailure: function(data) {
        console.log(JSON.stringify(data));
    }
};

var params = {
    bbox: [52.208867, 0.117540, 52.207988, 0.116126]
};

w3w.grid(params, callback);
```

## Get Languages

Retrieves a list of the currently loaded and available 3 word address languages.

See also the [what3words API get languages documentation](https://docs.what3words.com/api/v2/#lang) for more detailed information.

### `W3W.Geocoder.languages(callbackHandler);`

#### `callbackHandler`

Object literal containing the `onSuccess` and `onFailure` functions; see [callbacks](#callbacks) for more information.

The `onSuccess` callback's JSON will look similar to the following:

```JSON
{
  "languages": [
    {
      "code": "de",
      "name": "German",
      "native_name": "Deutsch (beta)"
    },
    {
      "code": "ru",
      "name": "Russian",
      "native_name": "Русский (beta)"
    },
    {
      "code": "sv",
      "name": "Swedish",
      "native_name": "Svenska (beta)"
    },
    {
      "code": "pt",
      "name": "Portuguese",
      "native_name": "Português (beta)"
    },
    {
      "code": "sw",
      "name": "Swahili",
      "native_name": "Kiswahili (beta)"
    },
    {
      "code": "en",
      "name": "English",
      "native_name": "English"
    },
    {
      "code": "it",
      "name": "Italian",
      "native_name": "Italiano (beta)"
    },
    {
      "code": "fr",
      "name": "French",
      "native_name": "Français (beta)"
    },
    {
      "code": "es",
      "name": "Spanish; Castilian",
      "native_name": "Español (beta)"
    },
    {
      "code": "tr",
      "name": "Turkish",
      "native_name": "Türkçe (beta)"
    }
  ],
  "status": {
    "status": 200,
    "reason": "OK"
  },
  "thanks": "Thanks from all of us at index.home.raft for using a what3words API"
}
```

#### Get Languages Example

```JavaScript
var w3w;
var options = {
    key: 'API-KEY'
};

w3w = new W3W.Geocoder(options);

var callback = {
    onSuccess: function(data) {
        console.log(JSON.stringify(data));
    },
    onFailure: function(data) {
        console.log(JSON.stringify(data));
    }
};

w3w.languages(callback);
```
