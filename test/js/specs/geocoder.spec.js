validateHTTPStatus = function(data) {
    expect(data.status).toBeDefined();
    expect(data.status.status).toBeDefined();
    expect(data.status.status).toEqual(200);
};

validateHTTPPropertyStatus = function(data) {
    expect(data.properties).toBeDefined();
    expect(data.properties.status).toBeDefined();
    expect(data.properties.status.status).toBeDefined();
    expect(data.properties.status.status).toEqual(200);
};

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

validateGeoJSONPayload = function(data) {
    validateHTTPPropertyStatus(data);
    expect(data.crs).toBeDefined();
    expect(data.crs.type).toBeDefined();
    expect(data.crs.type).toEqual('link');
    expect(data.crs.properties.href).toBeDefined();
    expect(data.crs.properties.href).toEqual('http://spatialreference.org/ref/epsg/4326/ogcwkt/');
    expect(data.crs.properties.type).toBeDefined();
    expect(data.crs.properties.type).toEqual('ogcwkt');
    expect(data.crs.properties).toBeDefined();
    expect(data.bbox).toBeDefined();
    expect(data.bbox).toEqual([-0.203607, 51.521238, -0.203564, 51.521265]);
    expect(data.geometry).toBeDefined();
    expect(data.geometry.coordinates).toBeDefined();
    expect(data.geometry.coordinates).toEqual([-0.203586, 51.521251]);
    expect(data.geometry.type).toBeDefined();
    expect(data.geometry.type).toEqual('Point');
    expect(data.type).toBeDefined();
    expect(data.type).toEqual('Feature');
    expect(data.properties).toBeDefined();
    expect(data.properties.words).toBeDefined();
    expect(data.properties.words).toEqual('index.home.raft');
    expect(data.properties.language).toBeDefined();
    expect(data.properties.language).toEqual('en');
    expect(data.properties.map).toBeDefined();
    expect(data.properties.map).toEqual('http://w3w.co/index.home.raft');
    expect(data.properties.thanks).toBeDefined();
};

describe('what3words', function() {
    describe('initialisation and loading', function() {
        it('should be available as a function', function() {
            expect(typeof W3W.Geocoder).toEqual('function');
        });
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
        };

        it('should throw Error when missing options', function() {
            expect(missingOptions).toThrowError(Error);
        });

        it('should throw Error when missing API key in options', function() {
            expect(missingApiKey).toThrowError(Error);
        });
    });

    describe('construction', function() {
        var what3words;

        beforeEach(function() {
            what3words = new W3W.Geocoder({
                key: W3W_API_KEY
            });
        });

        it('should be instance of W3W.Geocoder', function() {
            // expect(what3words).to.be.an.instanceof(W3W.Geocoder);
            expect(what3words).toEqual(jasmine.any(W3W.Geocoder));
        });
    });

    describe('#forward', function() {
        var what3words;

        beforeEach(function() {
            what3words = new W3W.Geocoder({
                key: W3W_API_KEY
            });
        });

        it('should forward geocode index.home.raft defaulting to JSON', function(done) {
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

        it('should forward geocode index.home.raft in JSON', function(done) {
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
                addr: 'index.home.raft',
                format: 'json'
            };

            what3words.forward(params, callback);
        });

        it('should forward geocode index.home.raft in GeoJSON ', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateGeoJSONPayload(data);
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };

            var params = {
                addr: 'index.home.raft',
                format: 'geojson'
            };

            what3words.forward(params, callback);
        });

        it ('should catch an Error exception when an invalid format of type "xml" is requested', function(done) {
            var callback = {
                onSuccess: function(data) {
                    throw new Error('onSuccess should never be invoked');
                },
                onFailure: function(data) {
                    throw new Error('onFailure should never be invoked');
                }
            };

            var params = {
                addr: 'index.home.raft',
                format: 'xml'
            };

            expect(function() {
                what3words.forward(params, callback);
            }).toThrow(new Error('params.format must have a value of "json" or "geojson"'));
            done();
        });
    });

    describe('#reverse', function() {
        var what3words;

        beforeEach(function() {
            what3words = new W3W.Geocoder({
                key: W3W_API_KEY
            });
        });

        it('should reverse geocode [51.521251, -0.203586] defaulting to JSON', function(done) {
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

        it('should reverse geocode [51.521251, -0.203586] in JSON', function(done) {
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
                coords: [51.521251, -0.203586],
                format: 'json'
            };

            what3words.reverse(params, callback);
        });

        it('should reverse geocode [51.521251, -0.203586] in GeoJSON', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateGeoJSONPayload(data);
                    done();
                },
                onFailure: function(data) {
                    expect(data.status.status).toEqual(200);
                    done();
                }
            };

            var params = {
                coords: [51.521251, -0.203586],
                format: 'geojson'
            };

            what3words.reverse(params, callback);
        });

        it ('should catch an Error exception when an invalid format of type "xml" is requested', function(done) {
            var callback = {
                onSuccess: function(data) {
                    throw new Error('onSuccess should never be invoked');
                },
                onFailure: function(data) {
                    throw new Error('onFailure should never be invoked');
                }
            };

            var params = {
                coords: [51.521251, -0.203586],
                format: 'xml'
            };

            expect(function() {
                what3words.reverse(params, callback);
            }).toThrow(new Error('params.format must have a value of "json" or "geojson"'));
            done();
        });
    });

    describe('#autosuggest', function() {
        var what3words;

        beforeEach(function() {
            what3words = new W3W.Geocoder({
                key: W3W_API_KEY
            });
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

        beforeEach(function() {
            what3words = new W3W.Geocoder({
                key: W3W_API_KEY
            });
        });

        it('should return a JSON standardblend for index.home.raft with a focus of 51.4243877,-0.3474524', function(done) {
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

        beforeEach(function() {
            what3words = new W3W.Geocoder({
                key: W3W_API_KEY
            });
        });

        it('should create a grid for bounding box 52.208867,0.117540,52.207988,0.116126 defaulting to JSON', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateHTTPStatus(data);

                    expect(data.lines).toBeDefined();
                    expect(data.lines).toBeArray();
                    expect(data.lines.length).toBeGreaterThan(4);
                    expect(data.lines[0].start).toBeDefined();
                    expect(data.lines[0].start.lat).toBeDefined();
                    expect(data.lines[0].start.lat).toEqual(52.208009918068);
                    expect(data.lines[0].start.lng).toBeDefined();
                    expect(data.lines[0].start.lng).toEqual(0.11612600000001);
                    expect(data.lines[0].end).toBeDefined();
                    expect(data.lines[0].end.lat).toBeDefined();
                    expect(data.lines[0].end.lat).toEqual(52.208009918068);
                    expect(data.lines[0].end.lng).toBeDefined();
                    expect(data.lines[0].end.lng).toEqual(0.11753999999999);
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

        it('should create a grid for bounding box 52.208867,0.117540,52.207988,0.116126 in JSON', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateHTTPStatus(data);

                    expect(data.lines).toBeDefined();
                    expect(data.lines).toBeArray();
                    expect(data.lines.length).toBeGreaterThan(4);
                    expect(data.lines[0].start).toBeDefined();
                    expect(data.lines[0].start.lat).toBeDefined();
                    expect(data.lines[0].start.lat).toEqual(52.208009918068);
                    expect(data.lines[0].start.lng).toBeDefined();
                    expect(data.lines[0].start.lng).toEqual(0.11612600000001);
                    expect(data.lines[0].end).toBeDefined();
                    expect(data.lines[0].end.lat).toBeDefined();
                    expect(data.lines[0].end.lat).toEqual(52.208009918068);
                    expect(data.lines[0].end.lng).toBeDefined();
                    expect(data.lines[0].end.lng).toEqual(0.11753999999999);
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };

            var params = {
                bbox: [52.208867, 0.117540, 52.207988, 0.116126],
                format: 'json'
            };

            what3words.grid(params, callback);
        });

        it('should create a grid for bounding box 52.208867,0.117540,52.207988,0.116126 in GeoJSON', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateHTTPPropertyStatus(data);

                    expect(data.coordinates).toBeDefined();
                    expect(data.coordinates).toBeArray();
                    expect(data.coordinates[0]).toBeArray();
                    expect(data.coordinates[0][0]).toEqual([0.11612600000001, 52.208009918068]);
                    expect(data.coordinates[0][1]).toEqual([0.11753999999999, 52.208009918068]);
                    expect(data.type).toBeDefined();
                    expect(data.type).toEqual('MultiLineString');
                    expect(data.properties).toBeDefined();
                    expect(data.properties.thanks).toBeDefined();
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };

            var params = {
                bbox: [52.208867, 0.117540, 52.207988, 0.116126],
                format: 'geojson'
            };

            what3words.grid(params, callback);
        });

        it ('should catch an Error exception when an invalid format of type "xml" is requested', function(done) {
            var callback = {
                onSuccess: function(data) {
                    throw new Error('onSuccess should never be invoked');
                },
                onFailure: function(data) {
                    throw new Error('onFailure should never be invoked');
                }
            };

            var params = {
                bbox: [52.208867, 0.117540, 52.207988, 0.116126],
                format: 'xml'
            };

            expect(function() {
                what3words.grid(params, callback);
            }).toThrow(new Error('params.format must have a value of "json" or "geojson"'));
            done();
        });
    });

    describe('#languages', function() {
        var what3words;

        beforeEach(function() {
            what3words = new W3W.Geocoder({
                key: W3W_API_KEY
            });
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
