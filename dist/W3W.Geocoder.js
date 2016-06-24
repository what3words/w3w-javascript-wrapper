(function() {
/*jshint -W097 */
'use strict';

var W3W = {
    version: '3.0.0'
};

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = W3W;
}

else if (typeof defined === 'function' && define.amd) {
    define(W3W);
}

if (typeof window !== 'undefined') {
    var oldW3W = window.W3W;

    W3W.noConflict = function() {
        window.W3W = oldW3W;
        return this;
    };

    window.W3W = W3W;
}

W3W.Xhr = {
    getXhr: function() {
        if (window.XMLHttpRequest) {
            return window.XMLHttpRequest;
        }
        else {
            if (window.ActiveXObject) {
                try {
                    return new ActiveXObject('MSxml2.XMLHTTP');
                }
                catch (e) {
                    try {
                        return new ActiveXObject('Microsoft.XMLHTTP');
                    }
                    catch (exc) {
                        return false;
                    }
                }
            }

            return false;
        }
    },

    handleRequest: function(url, callback, method, body) {
        var xhr = new XMLHttpRequest();
        method = (method) ? method : 'GET';

        xhr.open(method, url, true);
        xhr.onreadystatechange = function(event) {
            var json;
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    json = JSON.parse(xhr.responseText);
                    if (json.hasOwnProperty('error') && callback.onFailure) {
                        callback.onFailure(json);
                    }
                    else if (callback.onSuccess) {
                        callback.onSuccess(json);
                    }
                }
                else {
                    if (callback.onFailure) {
                        json = JSON.parse(xhr.responseText);
                        callback.onFailure(json);
                    }
                }
            }
        };

        if (body) {
            xhr.setRequestHeader('Content-Length', body.length);
            xhr.send(body);
        }
        else {
            xhr.send();
        }
    }
};

W3W.Utils = {
    mergeOptions: function(dest) {
        var i;
        var j;
        var len;
        var src;

        for (i=1, len = arguments.length; i<len; i++) {
            src = arguments[i];
            for (j in src) {
                dest[j] = src[j];
            }
        }
        return dest;
    },

    assembleQuery: function(params) {
        var query = [];
        for (var key in params) {
            query.push(key + '=' + encodeURIComponent(params[key]));
        }
        return query.join('&');
    }
};

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

W3W.Geocoder.prototype.grid = function(params, callback) {
    if (typeof params === 'undefined' || typeof params !== 'object') {
        throw new Error('Missing or invalid params object');
    }

    if (params) {
        if (!params.hasOwnProperty('bbox')) {
            throw new Error('The params object is missing required bbox property');
        }

        params.bbox = this._formatBoundingBox(params.bbox);
        if (null === params.bbox) {
            throw new Error('Invalid format coordinates for params.bbox');
        }
    }

    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter');
    }
    else if (typeof callback !== 'object') {
        throw new Error('Missing or invalid callback parameter');
    }

    params = W3W.Utils.mergeOptions(params, this.options);
    var url = this.urls.grid + '?' + W3W.Utils.assembleQuery(params);
    W3W.Xhr.handleRequest(url, callback);
};

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
})();