
mr_validateJSONPayload = function(data) {
    expect(data.words).toBeDefined();
    expect(data.words).toEqual('topping.chop.online');
    expect(data.geometry).toBeDefined();
    expect(data.geometry.lat).toBeDefined();
    expect(data.geometry.lat).toEqual(45.753248);
    expect(data.geometry.lng).toBeDefined();
    expect(data.geometry.lng).toEqual(4.855230);
};

mr_validateGeoJSONPayload = function(data) {
    expect(data.geometry).toBeDefined();
    expect(data.geometry.coordinates).toBeDefined();
    expect(data.geometry.coordinates).toEqual([4.855230, 45.753248]);
    expect(data.geometry.type).toBeDefined();
    expect(data.geometry.type).toEqual('Point');
    expect(data.type).toBeDefined();
    expect(data.type).toEqual('Feature');
    expect(data.properties).toBeDefined();
    expect(data.properties.words).toBeDefined();
    expect(data.properties.words).toEqual('topping.chop.online');
    expect(data.properties.language).toBeDefined();
    expect(data.properties.language).toEqual('en');
    expect(data.properties.map).toBeDefined();
    expect(data.properties.map).toEqual('http://w3w.co/topping.chop.online');
};

describe('what3words', function() {

    describe('#multiple forward', function() {
        var what3words;

        beforeEach(function() {
            what3words = new W3W.Geocoder({
                key: W3W_API_KEY
            });
        });

        it('should reverse geocode "topping.chop.online" 3 times to JSON, GeoJSON and then JSON', function(done) {

            var ended = 0;
            function allDone(idx) {
                ended += idx;
                if(ended === 6) {
                    done();
                }
            }

            var callbackJSON1 = {
                onSuccess: function(data) {
                    mr_validateJSONPayload(data);
                    allDone(1);
                },
                onFailure: function(data) {
                    expect(data.status.status).toEqual(200);
                    done();
                }
            };

            var callbackJSON2 = {
                onSuccess: function(data) {
                    mr_validateJSONPayload(data);
                    allDone(2);
                },
                onFailure: function(data) {
                    expect(data.status.status).toEqual(200);
                    done();
                }
            };

            var callbackGeoJSON = {
                onSuccess: function(data) {
                    mr_validateGeoJSONPayload(data);
                    allDone(3);
                },
                onFailure: function(data) {
                    expect(data.status.status).toEqual(200);
                    done();
                }
            };

            var params = {
                addr: 'topping.chop.online',
            };

            what3words.forward(params, callbackJSON1);

            params = {
                addr: 'topping.chop.online',
                format: 'geojson'
            };

            what3words.forward(params, callbackGeoJSON);

            params = {
                addr: 'topping.chop.online',
            };

            what3words.forward(params, callbackJSON2);

        });

    });

    describe('#multiple reverse', function() {
        var what3words;

        beforeEach(function() {
            what3words = new W3W.Geocoder({
                key: W3W_API_KEY
            });
        });

        it('should reverse geocode [45.753248, 4.855230] 3 times to JSON, GeoJSON and then JSON', function(done) {

            var ended = 0;
            function allDone(idx) {
                ended += idx;
                if(ended === 6) {
                    done();
                } 
            }

            var callbackJSON1 = {
                onSuccess: function(data) {
                    mr_validateJSONPayload(data);
                    allDone(1);
                },
                onFailure: function(data) {
                    expect(data.status.status).toEqual(200);
                    done();
                }
            };

            var callbackJSON2 = {
                onSuccess: function(data) {
                    mr_validateJSONPayload(data);
                    allDone(2);
                },
                onFailure: function(data) {
                    expect(data.status.status).toEqual(200);
                    done();
                }
            };

            var callbackGeoJSON = {
                onSuccess: function(data) {
                    mr_validateGeoJSONPayload(data);
                    allDone(3);
                },
                onFailure: function(data) {
                    expect(data.status.status).toEqual(200);
                    done();
                }
            };

            var params = {
                coords: [45.753248, 4.855230]
            };

            what3words.reverse(params, callbackJSON1);

            params = {
                coords: [45.753248, 4.855230],
                format: 'geojson'
            };

            what3words.reverse(params, callbackGeoJSON);

            params = {
                coords: [45.753248, 4.855230]
            };

            what3words.reverse(params, callbackJSON2);

        });

    });


});
