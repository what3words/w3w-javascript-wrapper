function What3Words(a){if(this.base_url="https://api.what3words.com/",this.urls={wordsToPosition:this.base_url+"w3w",positionToWords:this.base_url+"position",getLanguages:this.base_url+"get-languages"},a&&!a.hasOwnProperty("key"))throw new Error("Missing what3words API key");this.options={lang:"en"},this.options=What3WordsUtils.mergeOptions(this.options,a)}!window.XMLHttpRequest&&window.ActiveXObject&&(window.XMLHttpRequest=function(){try{return new ActiveXObject("MSxml2.XMLHTTP")}catch(a){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(b){return!1}}}),What3WordsUtils={mergeOptions:function(a){var b,c,d,e;for(b=1,d=arguments.length;d>b;b++){e=arguments[b];for(c in e)a[c]=e[c]}return a},assembleQuery:function(a){var b=Array();for(var c in a)b.push(c+"="+encodeURIComponent(a[c]));return b.join("&")},handleRequest:function(a,b,c,d){var e=new XMLHttpRequest;c=c?c:"GET",e.open(c,a,!0),e.onreadystatechange=function(a){var c;4==e.readyState&&(200==e.status?(c=JSON.parse(e.responseText),c.hasOwnProperty("error")&&b.onFailure?b.onFailure(c):b.onSuccess&&b.onSuccess(c)):b.onFailure&&(c=JSON.parse(e.responseText),b.OnFailure(c)))},d?(e.setRequestHeader("Content-Length",d.length),e.send(d)):e.send()}},What3Words.prototype.setLanguage=function(a){a&&(this.options.lang=a)},What3Words.prototype.wordsToPosition=function(a,b,c){if("undefined"==typeof a)throw new Error("Missing 3 word address parameter");if("object"==typeof a)a=a.join(".");else if("string"!=typeof a)throw new Error("Invalid 3 word address parameter");if("undefined"==typeof b)throw new Error("Missing corners parameter");if("boolean"!=typeof b)throw new Error("Invalid corners parameter");if("undefined"==typeof c)throw new Error("Missing callback parameter");if("object"!=typeof c)throw new Error("Missing or invalid callback parameter");var d={},e={string:a};b&&(e.corners=b),d=What3WordsUtils.mergeOptions(d,this.options,e);var f=this.urls.wordsToPosition+"?"+What3WordsUtils.assembleQuery(d);What3WordsUtils.handleRequest(f,c)},What3Words.prototype.positionToWords=function(a,b,c){if("undefined"==typeof a)throw new Error("Missing position parameter");if("object"==typeof a)a=a.join(",");else if("string"!=typeof a)throw new Error("Invalid position parameter");if("undefined"==typeof b)throw new Error("Missing corners parameter");if("boolean"!=typeof b)throw new Error("Invalid corners parameter");if("undefined"==typeof c)throw new Error("Missing callback parameter");if("object"!=typeof c)throw new Error("Missing or invalid callback parameter");var d={},e={position:a};b&&(e.corners=b),d=What3WordsUtils.mergeOptions(d,this.options,e);var f=this.urls.positionToWords+"?"+What3WordsUtils.assembleQuery(d);What3WordsUtils.handleRequest(f,c)},What3Words.prototype.getLanguages=function(a){if("undefined"==typeof a)throw new Error("Missing callback parameter");if("object"!=typeof a)throw new Error("Missing or invalid callback parameter");var b={key:this.options.key},c=this.urls.getLanguages+"?"+What3WordsUtils.assembleQuery(b);What3WordsUtils.handleRequest(c,a)};