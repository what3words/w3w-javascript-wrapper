var what3words = new function (language) {

	this.API_KEY = 'YOURAPIKEY'; 		// Change to your what3words API key
	this.language = language || 'en'; 	// Change to your default language

	/**
	 * Wrapper for API GET caller function
	 */
	this.getRequest = function (url, data, callback) {
		data.key = this.API_KEY;
		data.lang = this.language;
		$.get('https://api.what3words.com/v2/' + url, data, callback, 'JSON');
	};

	/**
	 * Sets the language in which to return words
	 */
	this.setLanguage = function (language) {
		if (language !== undefined)
			this.language = language;
	};
	
	/**
	 * Sets the API key
	 */
	this.setKey = function (key) {
		if (key !== undefined)
			this.API_KEY = key;
	};

	/**
	 * Forward Geocode (words to location)
	 * https://docs.what3words.com/api/v2/#forward
	 * Checks for a object and explodes to '.' string
	 * Return a Lat/Lon Gemetry Object
	 */
	this.forward = function (words, callback){
		if (typeof words === 'undefined')
			throw 'No valid words passed';
		else if (typeof words === 'object')
			words = words.join('.');
		else if (typeof words !== 'string')
			throw 'Invalid words passed';
		var data = {
			addr : words
		};
		this.getRequest('forward', data, function (ret) { callback(ret.geometry); });	
	}
	
	/**
	 * Reverse Geocode (location to words)
	 * https://docs.what3words.com/api/v2/#reverse
	 */
	this.reverse = function (location, callback){
		if (typeof location === 'undefined')
			throw 'No valid location passed';
		else if (typeof location === 'object')
			location = location.join(',');
		else if (typeof location !== 'string')
			throw 'Invalid location passed';
		var data = { coords: location };
		this.getRequest('reverse', data, function (ret) { callback(ret.words); });
	}
	
	/**
	 * Get a list of possible suggestions
	 * Requires at least two full words and one letter+ of the third word
	 * https://docs.what3words.com/api/v2/#autosuggest
	 * Returns an array of suggestions
	 * Currently DOES NOT implement clip / focus capabilities
	 */
	this.autosuggest = function (words,callback){
		if (typeof words === 'undefined')
			throw 'No valid words passed';
		else if (typeof words === 'object')
			words = words.join('.');
		else if (typeof words !== 'string')
			throw 'Invalid words passed';
		var data = {
			addr : words
		};
		this.getRequest('autosuggest', data, function (ret) { callback(ret.suggestions); });	
	}
	
	/**
	 * Standard Blend from the API
	 * https://docs.what3words.com/api/v2/#standardblend
	 */
	this.standardlend = function (words,callback){
		if (typeof words === 'undefined')
			throw 'No valid words passed';
		else if (typeof words === 'object')
			words = words.join('.');
		else if (typeof words !== 'string')
			throw 'Invalid words passed';
		var data = {
			addr : words
		};
		this.getRequest('standardblend', data, function (ret) { callback(ret.blends); });
	}
	
	/**
	 * Return a Grid available from the API
	 * https://docs.what3words.com/api/v2/#grid
	 * Input is the Max and Min for Lat and Lng
	 */
	this.grid = function (xm,xn,ym,yn,callback){
		var bbox = [xm,ym,xn,yn];
		var str = bbox.join(',');
		this.getRequest('grid', str, function (ret) { callback(ret.lines); });
	}
	
	/**
	 * Return a list of langauges available from the API
	 * https://docs.what3words.com/api/v2/#lang-result
	 */
	this.languages = function (callback){
		this.getRequest('languages', null, function (ret) { callback(ret.languages); });
	}
};
