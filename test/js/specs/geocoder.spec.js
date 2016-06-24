validateHTTPStatus = function(data) {
    expect(data.status).toBeDefined();
    expect(data.status.status).toBeDefined();
    expect(data.status.status).toEqual(200);
}

validateJSONPayload = function(data) {
    validateHTTPStatus(data);
    expect(data.crs).toBeDefined();
    expect(data.words).toBeDefined();
    expect(data.words).toEqual('index.home.raft');
    expect(data.bounds).toBeDefined();
    expect(data.bounds.southwest).toBeDefined();
    expect(data.bounds.southwest.lng).toBeDefined();
    expect(data.bounds.southwest.lat).toBeDefined();
    expect(data.bounds.southwest.lng).toEqual(-0.203607);
    expect(data.bounds.southwest.lat).toEqual(51.521238);
    expect(data.bounds.northeast).toBeDefined();
    expect(data.bounds.northeast.lng).toBeDefined();
    expect(data.bounds.northeast.lat).toBeDefined();
    expect(data.bounds.northeast.lng).toEqual(-0.203564);
    expect(data.bounds.northeast.lat).toEqual(51.521265);
    expect(data.geometry).toBeDefined();
    expect(data.geometry.lng).toBeDefined();
    expect(data.geometry.lat).toBeDefined();
    expect(data.geometry.lng).toEqual(-0.203586);
    expect(data.geometry.lat).toEqual(51.521251);
    expect(data.language).toBeDefined();
    expect(data.language).toEqual('en');
    expect(data.map).toBeDefined();
    expect(data.map).toEqual('http://w3w.co/index.home.raft');
};

describe('what3words', function() {
    describe('initialisation and loading', function() {
        it('should be available as a function', function() {
            expect(typeof W3W.Geocoder).toEqual('function');
        })
    });

    describe('constructor exceptions', function() {
        var what3words;
        var options;

        missingOptions = function() {
            what3words = new W3W.Geocoder();
        };

        missingApiKey = function() {
            options = {};
            what3words = new W3W.Geocoder(options);
        }

        it('should throw Error when missing options', function() {
            expect(missingOptions).toThrowError(Error);
        });
        it('should throw Error when missing API key in options', function() {
            expect(missingApiKey).toThrowError(Error);
        });
    });

    describe('construction', function() {
        var what3words;
        var options = {
            key: W3W_API_KEY
        };

        beforeEach(function() {
            what3words = new W3W.Geocoder(options);
        });

        it('should be instance of W3W.Geocoder', function() {
            // expect(what3words).to.be.an.instanceof(W3W.Geocoder);
            expect(what3words).toEqual(jasmine.any(W3W.Geocoder));
        })
    });

    describe('#forward', function() {
        var what3words;
        var options = {
            key: W3W_API_KEY
        };

        beforeEach(function() {
            what3words = new W3W.Geocoder(options);
        });

        it('should forward geocode index.home.raft', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateJSONPayload(data);
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };
            var params = {
                addr: 'index.home.raft'
            };
            what3words.forward(params, callback);
        });
    });

    describe('#reverse', function() {
        var what3words;
        var options = {
            key: W3W_API_KEY
        };

        beforeEach(function() {
            what3words = new W3W.Geocoder(options);
        });

        it('should reverse geocode 51.521251, -0.203586', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateJSONPayload(data);
                    done();
                },
                onFailure: function(data) {
                    expect(data.status.status).toEqual(200);
                    done();
                }
            };
            var params = {
                coords: [51.521251, -0.203586]
            };
            what3words.reverse(params, callback);
        });
    });

    describe('#autosuggest', function() {
        var what3words;
        var options = {
            key: W3W_API_KEY
        };

        beforeEach(function() {
            what3words = new W3W.Geocoder(options);
        });

        it('should autosuggest plan.clips.a with no focus and no clipping', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateHTTPStatus(data);
                    expect(data.suggestions).toBeDefined();
                    expect(data.suggestions.length).toEqual(3);
                    expect(data.suggestions[0].words).toEqual('plan.clips.also');
                    expect(data.suggestions[1].words).toEqual('plan.clips.back');
                    expect(data.suggestions[2].words).toEqual('plan.clips.each');
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };
            var params = {
                addr: 'plan.clips.a',
                lang: 'en',
                clip: {
                    type: 'none'
                }
            };
            what3words.autosuggest(params, callback);
        });

        it('should autosuggest plan.clips.a with focus and no clipping', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateHTTPStatus(data);
                    expect(data.suggestions).toBeDefined();
                    expect(data.suggestions.length).toEqual(3);
                    expect(data.suggestions[0].words).toEqual('plan.clips.area');
                    expect(data.suggestions[1].words).toEqual('plan.clips.arts');
                    expect(data.suggestions[2].words).toEqual('plan.slips.cage');
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };
            var params = {
                addr: 'plan.clips.a',
                focus: [51.521251, -0.203586],
                lang: 'en',
                clip: {
                    type: 'none'
                }
            };
            what3words.autosuggest(params, callback);
        });

        it('should autosuggest plan.clips.a with focus and clip=focus(100)', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateHTTPStatus(data);
                    expect(data.suggestions).toBeDefined();
                    expect(data.suggestions.length).toEqual(3);
                    expect(data.suggestions[0].words).toEqual('plan.clips.area');
                    expect(data.suggestions[1].words).toEqual('plan.clips.arts');
                    expect(data.suggestions[2].words).toEqual('plan.slips.cage');
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };
            var params = {
                addr: 'plan.clips.a',
                focus: [51.521251, -0.203586],
                lang: 'en',
                clip: {
                    type: 'focus',
                    distance: 100
                }
            };
            what3words.autosuggest(params, callback);
        });

        it('should autosuggest plan.clips.a with no focus and clip=radius(51.521251,-0.203586,100)', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateHTTPStatus(data);
                    expect(data.suggestions).toBeDefined();
                    expect(data.suggestions.length).toEqual(3);
                    expect(data.suggestions[0].words).toEqual('plan.clips.area');
                    expect(data.suggestions[1].words).toEqual('plan.clips.arts');
                    expect(data.suggestions[2].words).toEqual('plan.slips.cage');
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };
            var params = {
                addr: 'plan.clips.a',
                lang: 'en',
                clip: {
                    type: 'radius',
                    focus: [51.521251, -0.203586],
                    distance: 100
                }
            };
            what3words.autosuggest(params, callback);
        });

        it('should autosuggest plan.clips.a with focus of 51.4243877,-0.3474524 and clip=bbox(54,2,50,-4)', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateHTTPStatus(data);
                    expect(data.suggestions).toBeDefined();
                    expect(data.suggestions.length).toEqual(3);
                    expect(data.suggestions[0].words).toEqual('plan.clips.area');
                    expect(data.suggestions[1].words).toEqual('plan.flips.dawn');
                    expect(data.suggestions[2].words).toEqual('plan.clips.arts');
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };
            var params = {
                addr: 'plan.clips.a',
                lang: 'en',
                focus: [51.4243877, -0.3474524],
                clip: {
                    type: 'bbox',
                    bbox: [54, 2, 50, -4]
                }
            };
            what3words.autosuggest(params, callback);
        });
    });

    describe('#standardblend', function() {
        var what3words;
        var options = {
            key: W3W_API_KEY
        };

        beforeEach(function() {
            what3words = new W3W.Geocoder(options);
        });

        it('should return a standardblend for index.home.raft with a focus of 51.4243877,-0.3474524', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateHTTPStatus(data);

                    expect(data.blends).toBeDefined();
                    expect(data.blends).toBeArray();
                    expect(data.blends.length).toEqual(3);
                    expect(data.blends[0].words).toEqual('index.home.raft');
                    expect(data.blends[1].words).toEqual('indexes.home.raft');
                    expect(data.blends[2].words).toEqual('index.homes.raft');
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };
            var params = {
                addr: 'index.home.raft',
                lang: 'en',
                focus: [51.4243877, -0.3474524]
            };
            what3words.standardblend(params, callback);
        });
    });

    describe('#grid', function() {
        var what3words;
        var options = {
            key: W3W_API_KEY
        };

        beforeEach(function() {
            what3words = new W3W.Geocoder(options);
        });

        it('should create a grid for bounding box 52.208867,0.117540,52.207988,0.116126', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateHTTPStatus(data);

                    expect(data.lines).toBeDefined();
                    expect(data.lines).toBeArray();
                    expect(data.lines.length).toBeGreaterThan(4);
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };

            var params = {
                bbox: [52.208867, 0.117540, 52.207988, 0.116126]
            };
            what3words.grid(params, callback);
        });
    });

    describe('#languages', function() {
        var what3words;
        var options = {
            key: W3W_API_KEY
        };

        beforeEach(function() {
            what3words = new W3W.Geocoder(options);
        });

        it('should return valid 3 word address languages', function(done) {
            callback = {
                onSuccess: function(data) {
                    validateHTTPStatus(data);

                    expect(data.languages).toBeDefined();
                    expect(data.languages).toBeArray();
                    expect(data.languages.length).toBeGreaterThan(1);
                    expect(data.languages[0].code).toBeDefined();
                    expect(data.languages[0].name).toBeDefined();
                    expect(data.languages[0].native_name).toBeDefined();
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };
            what3words.languages(callback);
        });
    });
});
