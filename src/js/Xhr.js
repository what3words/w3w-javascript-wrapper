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
