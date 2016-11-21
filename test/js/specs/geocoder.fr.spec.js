validateJSONPayloadFR = function(data) {
    validateHTTPStatus(data);
    expect(data.crs).toBeDefined();
    expect(data.words).toBeDefined();
    expect(data.words).toEqual('bassin.casanier.onction');
    expect(data.bounds).toBeDefined();
    expect(data.bounds.southwest).toBeDefined();
    expect(data.bounds.southwest.lng).toBeDefined();
    expect(data.bounds.southwest.lat).toBeDefined();
    expect(data.bounds.southwest.lng).toEqual(5.724518);
    expect(data.bounds.southwest.lat).toEqual(45.188524);
    expect(data.bounds.northeast).toBeDefined();
    expect(data.bounds.northeast.lng).toBeDefined();
    expect(data.bounds.northeast.lat).toBeDefined();
    expect(data.bounds.northeast.lng).toEqual(5.724556);
    expect(data.bounds.northeast.lat).toEqual(45.188551);
    expect(data.geometry).toBeDefined();
    expect(data.geometry.lng).toBeDefined();
    expect(data.geometry.lat).toBeDefined();
    expect(data.geometry.lng).toEqual(5.724537);
    expect(data.geometry.lat).toEqual(45.188538);
    expect(data.language).toBeDefined();
    expect(data.language).toEqual('fr');
    expect(data.map).toBeDefined();
    expect(data.map).toEqual('http://w3w.co/bassin.casanier.onction');
};

describe('what3words in french', function() {
    describe('#forward', function() {
        var what3words;
        var options = {
            key: W3W_API_KEY
        };

        beforeEach(function() {
            what3words = new W3W.Geocoder(options);
        });

        it('should forward geocode bassin.casanier.onction', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateJSONPayloadFR(data);
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };
            var params = {
                addr: 'bassin.casanier.onction',
                lang: 'fr'
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

        it('should reverse geocode 45.188538, 5.724537', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateJSONPayloadFR(data);
                    done();
                },
                onFailure: function(data) {
                    expect(data.status.status).toEqual(200);
                    done();
                }
            };
            var params = {
                coords: [45.188538, 5.724537],
                lang: 'fr'
            };
            what3words.reverse(params, callback);
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

        it('should return a standardblend for bassin.casanier.onction with a focus of 45.188538, 5.724537', function(done) {
            var callback = {
                onSuccess: function(data) {
                    validateHTTPStatus(data);

                    expect(data.blends).toBeDefined();
                    expect(data.blends).toBeArray();
                    expect(data.blends.length).toEqual(3);
                    expect(data.blends[0].words).toEqual('bassin.casanier.onction');
                    expect(data.blends[1].words).toEqual('bassin.casanier.oncle');
                    expect(data.blends[2].words).toEqual('bassin.casanier.noce');
                    done();
                },
                onFailure: function(data) {
                    validateHTTPStatus(data);
                    done();
                }
            };
            var params = {
                addr: 'bassin.casanier.oncti',
                lang: 'fr',
                focus: [45.188538, 5.724537]
            };
            what3words.standardblend(params, callback);
        });
    });


});
