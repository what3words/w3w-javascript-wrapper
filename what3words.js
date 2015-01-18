
var What3words = new function (language) {

	this.API_KEY = 'YOURAPIKEY'; 		// Change to your what3words API key
	this.language = language || 'en'; 	// Change to your default language

	// --

	this.postRequest = function (url, data, callback) {
		data.key = this.API_KEY;
		data.lang = this.language;
		$.post('http://api.what3words.com/' + url, data, callback, 'JSON');
	};

	/**
	 * Sets the language in which to return words
	 */

	this.setLanguage = function (language) {
		if (language !== undefined)
			this.language = language;
	};

	/**
	 * Convert 3 words or OneWord into position
	 * Takes words either as string, or array of words
	 * Returns array of [lat, long]
	 */

	this.wordsToPosition = function (words, callback) {
		if (typeof words === 'undefined')
			throw 'No valid words passed';
		else if (typeof words === 'object')
			words = words.join('.');
		else if (typeof words !== 'string')
			throw 'Invalid words passed';

		var data = { string: words };
		this.postRequest('w3w', data, function (ret) { callback(ret.position); });
	};

	/**
	 * Convert a position into 3 words
	 * Takes position either as string, or array of [lat, lng]
	 * Returns array of [word1, word2, word3]
	 */

	this.positionToWords = function (position, callback) {
		if (typeof position === 'undefined')
			throw 'No valid position passed';
		else if (typeof position === 'object')
			position = position.join(',');
		else if (typeof position !== 'string')
			throw 'Invalid position passed';

		var data = { position: position };
		this.postRequest('position', data, function (ret) { callback(ret.words); });
	};
};

