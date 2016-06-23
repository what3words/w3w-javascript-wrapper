/**
 * Module: W3W.Geocoder
 * @module: W3W.Geocoder
 */

/**
 * Creates a new W3W.Geocoder wrapper class
 * @class
 * @param {Object} options Wrapper configuration options object
 * @param {string} options.key Your API key
 * @param {string} [options.lang=en] Optional language code, specified as an ISO 639-1 code
 * @throws {Error} Missing what3words options
 * @throws {Error} Missing what3words API key
 */
W3W.Geocoder = function(options) {
    this.base_url = 'https://api.what3words.com/v2/';
    this.urls = {
        forward: this.base_url + 'forward',
        reverse: this.base_url + 'reverse',
        autosuggest: this.base_url + 'autosuggest',
        standardblend: this.base_url + 'standardblend',
        grid: this.base_url + 'grid',
        languages: this.base_url + 'languages'
    };

    if (typeof options === 'undefined') {
        throw new Error('Missing what3words options');
    }
    else if (options && !options.hasOwnProperty('key')) {
        throw new Error('Missing what3words API key');
    }
    this.options = {
        lang: 'en'
    };
    this.options = W3W.Utils.mergeOptions(this.options, options);
};

/**
 * Sets a new default language
 * @function W3W.Geocoder#setLanguage
 * @param {string} lang The new default language, specified as an ISO 639-1 code
 */

W3W.Geocoder.prototype.setLanguage = function(lang) {
    if (lang) {
        this.options.lang = lang;
    }
};

/**
 * Callback handler
 * @callback W3W.Geocoder#Callback
 * @param response {Object} JSON response
 */

/**
 * Callback handler properties
 * @typedef {Object} W3W.Geocoder#CallbackHandler
 * @property onSuccess {W3W.Geocoder#Callback}
 * @property onFailure {W3W.Geocoder#Callback}
 */

// * param callback {Object.<onSuccess: function, onFailure: function>} Callback handler properties


/**
 * Forward geocodes a 3 word address to a position, expressed as coordinates of latitude and longitude.
 * @function W3W.Geocoder#forward
 * @param addr {string} A 3 word address, specified a dot separated string
 * @param lang {string} A supported 3 word address language code, as an ISO 639-1 2 letter code
 * @param callback {W3W.Geocoder#CallbackHandler} Callback handler properties
 * @throws {Error} Missing 3 word address parameter
 * @throws {Error} Invalid 3 word address parameter
 * @throws {Error} Invalid lang parameter
 * @throws {Error} Missing callback parameter
 * @throws {Error} Invalid callback parameter
 */

// var params = {
//     addr: 'index.home.raft',
//     lang: 'en'
// };
W3W.Geocoder.prototype.forward = function(params, callback) {
    if (typeof params === 'undefined' || typeof params !== 'object') {
        throw new Error('Missing or invalid params object');
    }

    if (params) {
        if (!params.hasOwnProperty('addr')) {
            throw new Error('The params object is missing required addr property');
        }
        else if (typeof params.addr !== 'string') {
            throw new Error('params.addr must be a string');
        }

        if (params.hasOwnProperty('lang') && typeof params.lang !== 'string') {
            throw new Error('params.lang must be a string');
        }
    }

    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter');
    }
    else if (typeof callback !== 'object') {
        throw new Error('Missing or invalid callback parameter');
    }

    params = W3W.Utils.mergeOptions(params, this.options);
    var url = this.urls.forward + '?' + W3W.Utils.assembleQuery(params);
    W3W.Xhr.handleRequest(url, callback);
};

/**
 * Reverse geocodes coordinates, expressed as latitude and longitude to a 3 word address.
 * @function W3W.Geocoder#reverse
 * @param coords {string|Array} Coordinates as longitude/latitude, specified either as a comma separated string or a 2 element array
 * @param lang {string} A supported 3 word address language code, as an ISO 639-1 2 letter code
 * @param callback {W3W.Geocoder#CallbackHandler} Callback handler properties
 * @throws {Error} Missing coords parameter
 * @throws {Error} Invalid coords parameter
 * @throws {Error} Invalid lang parameter
 * @throws {Error} Missing callback parameter
 * @throws {Error} Invalid callback parameter
 */

// var params = {
//      coords: [lat, long],
//      coords: 'lat,long',
//      lang: 'en'
// };
W3W.Geocoder.prototype.reverse = function(params, callback) {
    if (typeof params === 'undefined' || typeof params !== 'object') {
        throw new Error('Missing or invalid params object');
    }

    if (params) {
        if (!params.hasOwnProperty('coords')) {
            throw new Error('The params object is missing required coords property');
        }
        else {
            params.coords = this._formatCoords(params.coords);
            if (null === params.coords) {
                throw new Error('Invalid format coordinates for params.coords');
            }
        }

        if (params.hasOwnProperty('lang') && typeof params.lang !== 'string') {
            throw new Error('params.lang must be a string');
        }
    }

    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter');
    }
    else if (typeof callback !== 'object') {
        throw new Error('Missing or invalid callback parameter');
    }

    params = W3W.Utils.mergeOptions(params, this.options);
    var url = this.urls.reverse + '?' + W3W.Utils.assembleQuery(params);
    W3W.Xhr.handleRequest(url, callback);
};

// var params = {
//      lang: 'en',
//      addr: 'index.home.r'
//     focus: [lat, lng],
//     focus: 'lat,lng',
//     clip: {
//         type: 'none'
//     }
//     clip: {
//         type: 'radius',
//         focus: [lat, lng],
//         focus: 'lat,lng',
//         distance: km
//     },
//     clip: {
//         type: 'focus'
//         distance: km
//     },
//     clip: {
//         type: 'bbox',
//         bbox: [lat,lng,lat,lng],
//         bbox: 'lat,lng,lat,lng'
//     }
// };

W3W.Geocoder.prototype.autosuggest = function(params, callback) {
    if (typeof params === 'undefined' || typeof params !== 'object') {
        throw new Error('Missing or invalid params object');
    }

    var clip = {};

    if (params) {
        if (!params.hasOwnProperty('addr')) {
            throw new Error('The params object is missing required addr property');
        }
        else if (typeof params.addr !== 'string') {
            throw new Error('params.addr must be a string');
        }

        if (params.hasOwnProperty('focus')) {
            params.focus = this._formatCoords(params.focus);
            if (null === params.focus) {
                throw new Error('Invalid format coordinates for params.focus');
            }
        }

        if (!params.hasOwnProperty('lang')) {
            throw new Error('The params object is missing required lang property');
        }
        else if (typeof params.lang !== 'string') {
            throw new Error('params.lang must be a string');
        }

        if (params.hasOwnProperty('clip')) {
            if (!params.clip.hasOwnProperty('type')) {
                throw new Error('Invalid clipping policy type for params.clip');
            }

            switch (params.clip.type) {
                case 'none':
                    clip = {
                        clip: 'none'
                    };
                    break;

                case 'radius':
                    if (!params.clip.hasOwnProperty('distance')) {
                        throw new Error('Invalid clipping policy for type radius; missing distance property');
                    }

                    else if (!params.clip.hasOwnProperty('focus')) {
                        throw new Error('Invalid clipping policy for type radius; missing focus property');

                    }

                    else {
                        params.clip.focus = this._formatCoords(params.clip.focus);
                        if (null === params.focus) {
                            throw new Error('Invalid format coordinates for params.clip.focus');
                        }
                    }

                    clip = {
                        clip: 'radius(' + params.clip.focus + ',' + params.clip.distance + ')'
                    };
                    break;

                case 'focus':
                    if (!params.clip.hasOwnProperty('distance')) {
                        throw new Error('Invalid clipping policy for type focus; missing distance property');
                    }
                    else if (!params.hasOwnProperty('focus') || params.focus === null) {
                        throw new Error('Invalid clipping policy for type focus; missing or invalid focus property');
                    }

                    clip = {
                        clip: 'focus(' + params.clip.distance + ')'
                    };
                    break;

                case 'bbox':
                    if (!params.clip.hasOwnProperty('bbox')) {
                        throw new Error('Invalid clipping policy for type bbox; missing bbox property');
                    }
                    params.clip.bbox = this._formatBoundingBox(params.clip.bbox);
                    if (null === params.clip.bbox) {
                        throw new Error('Invalid format coordinates for params.clip.bbox');
                    }

                    clip = {
                        clip: 'bbox(' + params.clip.bbox + ')'
                    };
                    break;

                default:
                    throw new Error('Invalid or unrecognised clipping policy type');
            }
        }
    }

    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter');
    }
    else if (typeof callback !== 'object') {
        throw new Error('Missing or invalid callback parameter');
    }

    params = W3W.Utils.mergeOptions(params, this.options, clip);
    var url = this.urls.autosuggest + '?' + W3W.Utils.assembleQuery(params);
    W3W.Xhr.handleRequest(url, callback);
};

W3W.Geocoder.prototype.standardblend = function(params, callback) {
    if (typeof params === 'undefined' || typeof params !== 'object') {
        throw new Error('Missing or invalid params object');
    }

    if (params) {
        if (!params.hasOwnProperty('addr')) {
            throw new Error('The params object is missing required addr property');
        }
        else if (typeof params.addr !== 'string') {
            throw new Error('params.addr must be a string');
        }

        if (params.hasOwnProperty('focus')) {
            params.focus = this._formatCoords(params.focus);
            if (null === params.focus) {
                throw new Error('Invalid format coordinates for params.focus');
            }
        }

        if (!params.hasOwnProperty('lang')) {
            throw new Error('The params object is missing required lang property');
        }
        else if (typeof params.lang !== 'string') {
            throw new Error('params.lang must be a string');
        }
    }

    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter');
    }
    else if (typeof callback !== 'object') {
        throw new Error('Missing or invalid callback parameter');
    }

    params = W3W.Utils.mergeOptions(params, this.options);
    var url = this.urls.standardblend + '?' + W3W.Utils.assembleQuery(params);
    W3W.Xhr.handleRequest(url, callback);
};

W3W.Geocoder.prototype._formatCoords = function(coords) {
    if (typeof coords === 'object' && coords instanceof Array && coords.length === 2) {
        return coords.join(',');
    }
    else if (typeof coords !== 'string' && !coords.match(/^[-.0-9]{1,},[-.0-9]{1,}$/)) {
        return coords;
    }

    return null;
};

W3W.Geocoder.prototype._formatBoundingBox = function(coords) {
    if (typeof coords === 'object' && coords instanceof Array && coords.length === 4) {
        return coords.join(',');
    }
    else if (typeof coords !== 'string' && !coords.match(/^[-.0-9]{1,},[-.0-9]{1,},[-.0-9]{1,},[-.0-9]{1,}$/)) {
        return coords;
    }

    return null;
};

/**
 * Returns a section of the 3m x 3m what3words grid for a given area.
 * @function W3W.Geocoder#reverse
 * @param bbox {string|Array} Bounding box, specified by the northeast and southwest corner coordinates, for which the grid should be returned, specified either as a comma separated string or a 4 element array.
 * @param callback {W3W.Geocoder#CallbackHandler} Callback handler properties
 * @throws {Error} Missing bbox parameter
 * @throws {Error} Invalid bbox parameter
 * @throws {Error} Missing callback parameter
 * @throws {Error} Invalid callback parameter
 */
W3W.Geocoder.prototype.grid = function(bbox, callback) {
    if (typeof bbox === 'undefined') {
        throw new Error('Missing bbox parameter');
    }
    else if (typeof bbox === 'object') {
        bbox = bbox.join(',');
    }
    else if (typeof bbox !== 'string') {
        throw new Error('Invalid bbox parameter');
    }

    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter');
    }
    else if (typeof callback !== 'object') {
        throw new Error('Missing or invalid callback parameter');
    }

    var params = {};
    var args = {
        bbox: bbox
    };

    params = W3W.Utils.mergeOptions(params, this.options, args);
    var url = this.urls.grid + '?' + W3W.Utils.assembleQuery(params);
    W3W.Xhr.handleRequest(url, callback);
};

/**
* Returns the currently available set of supported languages
* @function W3W.Geocoder#getLanguages
* @param callback {W3W.Geocoder#CallbackHandler} Callback handler properties
* @throws {Error} Missing callback parameter
* @throws {Error} Invalid callback parameter
*/
W3W.Geocoder.prototype.languages = function(callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter');
    }
    else if (typeof callback !== 'object') {
        throw new Error('Missing or invalid callback parameter');
    }

    var params = {
        key: this.options.key
    };
    var url = this.urls.languages + '?' + W3W.Utils.assembleQuery(params);
    W3W.Xhr.handleRequest(url, callback);
};
