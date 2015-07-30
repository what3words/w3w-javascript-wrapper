/**
 * Module: What3Words
 * @module: What3Words
 */

if (!window.XMLHttpRequest && window.ActiveXObject) {
    window.XMLHttpRequest = function() {
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
    };
}

What3WordsUtils = {
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
        var query = Array();
        for (var key in params) {
            query.push(key + '=' + encodeURIComponent(params[key]));
        }
        return query.join('&');
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
                        callback.OnFailure(json);
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

/**
 * Creates a new What3Words wrapper class
 * @class
 * @param {Object} options Wrapper configuration options object
 * @param {string} options.key Your API key
 * @param {string} [options.lang=en] Optional language code, specified as an ISO 639-1 code
 * @throws {Error} Missing what3words API key
 */
function What3Words(options) {
    this.base_url = 'https://api.what3words.com/';
    this.urls = {
        wordsToPosition: this.base_url + 'w3w',
        positionToWords: this.base_url + 'position',
        getLanguages: this.base_url + 'get-languages'
    };

    if (options && !options.hasOwnProperty('key')) {
        throw new Error('Missing what3words API key');
    }
    this.options = {
        lang: 'en'
    };
    this.options = What3WordsUtils.mergeOptions(this.options, options);
}

/**
 * Sets a new default language
 * @function What3Words#setLanguage
 * @param {string} lang The new default language, specified as an ISO 639-1 code
 */

What3Words.prototype.setLanguage = function(lang) {
    if (lang) {
        this.options.lang = lang;
    }
};

/**
 * Callback handler
 * @callback What3Words#Callback
 * @param response {Object} JSON response
 */

/**
 * Callback handler properties
 * @typedef {Object} What3Words#CallbackHandler
 * @property onSuccess {What3Words#Callback}
 * @property onFailure {What3Words#Callback}
 */

// * param callback {Object.<onSuccess: function, onFailure: function>} Callback handler properties


/**
 * Converts a 3 word address to coordinates
 * @function What3Words#wordsToPosition
 * @param words {string|Array} 3 word address, specified either as a dot separated string or a 3 element array
 * @param corners {boolean} Specifies whether to return the bounding box of the 3 word address
 * @param callback {What3Words#CallbackHandler} Callback handler properties
 * @throws {Error} Missing 3 word address parameter
 * @throws {Error} Invalid 3 word address parameter
 * @throws {Error} Missing corners parameter
 * @throws {Error} Invalid corners parameter
 * @throws {Error} Missing callback parameter
 * @throws {Error} Invalid callback parameter
 */
What3Words.prototype.wordsToPosition = function(words, corners, callback) {
    if (typeof words === 'undefined') {
        throw new Error('Missing 3 word address parameter');
    }
    else if (typeof words === 'object') {
        words = words.join('.');
    }
    else if (typeof words !== 'string') {
        throw new Error('Invalid 3 word address parameter');
    }

    if (typeof corners === 'undefined') {
        throw new Error('Missing corners parameter');
    }
    else if (typeof corners !== 'boolean') {
        throw new Error('Invalid corners parameter');
    }

    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter');
    }
    else if (typeof callback !== 'object') {
        throw new Error('Missing or invalid callback parameter');
    }

    var params = {};
    var args = {
        string: words
    };
    // Hack to handle the way in which the corners parameter is treated. This param
    // isn't really boolean, it's the presence of the param that kicks in the return
    // of the bounding box, not whether corners is truthy
    if (corners) {
        args.corners = corners;
    }
    params = What3WordsUtils.mergeOptions(params, this.options, args);
    var url = this.urls.wordsToPosition + '?' + What3WordsUtils.assembleQuery(params);
    // console.log('wordsToPosition: ' + url);
    What3WordsUtils.handleRequest(url, callback);
};

/**
 * Converts coordinates to the nearest 3 word address
 * @function What3Words#positionToWords
 * @param words {string|Array} Coordinates as longitude/latitude, specified either as a comma separated string or a 2 element array
 * @param corners {boolean} Specifies whether to return the bounding box of the 3 word address
 * @param callback {What3Words#CallbackHandler} Callback handler properties
 * @throws {Error} Missing position parameter
 * @throws {Error} Invalid position parameter
 * @throws {Error} Missing corners parameter
 * @throws {Error} Invalid corners parameter
 * @throws {Error} Missing callback parameter
 * @throws {Error} Invalid callback parameter
 */
What3Words.prototype.positionToWords = function(position, corners, callback) {
    if (typeof position === 'undefined') {
        throw new Error('Missing position parameter');
    }
    else if (typeof position === 'object') {
        position = position.join(',');
    }
    else if (typeof position !== 'string') {
        throw new Error('Invalid position parameter');
    }

    if (typeof corners === 'undefined') {
        throw new Error('Missing corners parameter');
    }
    else if (typeof corners !== 'boolean') {
        throw new Error('Invalid corners parameter');
    }

    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter');
    }
    else if (typeof callback !== 'object') {
        throw new Error('Missing or invalid callback parameter');
    }

    var params = {};
    var args = {
        position: position,
    };
    // Hack to handle the way in which the corners parameter is treated. This param
    // isn't really boolean, it's the presence of the param that kicks in the return
    // of the bounding box, not whether corners is truthy
    if (corners) {
        args.corners = corners;
    }
    params = What3WordsUtils.mergeOptions(params, this.options, args);
    var url = this.urls.positionToWords + '?' + What3WordsUtils.assembleQuery(params);
    // console.log('positionToWords: ' + url);
    What3WordsUtils.handleRequest(url, callback);
};

/**
* Returns the currently available set of supported languages
* @function What3Words#getLanguages
* @param callback {What3Words#CallbackHandler} Callback handler properties
* @throws {Error} Missing callback parameter
* @throws {Error} Invalid callback parameter
*/
What3Words.prototype.getLanguages = function(callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter');
    }
    else if (typeof callback !== 'object') {
        throw new Error('Missing or invalid callback parameter');
    }

    var params = {
        key: this.options.key
    };
    var url = this.urls.getLanguages + '?' + What3WordsUtils.assembleQuery(params);
    // console.log('getLanguages: ' + url);
    What3WordsUtils.handleRequest(url, callback);
};
