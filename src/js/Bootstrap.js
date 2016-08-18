/*jshint -W097 */
'use strict';

var W3W = {
    version: '3.0.3'
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
