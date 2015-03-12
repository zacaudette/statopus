var statopus = new function() {
    var readJSONFile = function(callback) {
        var xml_http = new XMLHttpRequest();
        xml_http.overrideMimeType("application/json");
        xml_http.open('GET', '../libs/test_kits/identifiler.json', true);
        xml_http.onreadystatechange = function () {
            if (xml_http.readyState == 4 && xobj.status == "200") {
                callback(xml_http.responseText);
            }
        };
        xml_http.send(null);
    };

    var getTestKits = function() {
        var callback = function(response) {
        // Do Something with the response e.g.
        //jsonresponse = JSON.parse(response);
        // Assuming json data is wrapped in square brackets as Drew suggests
        //console.log(jsonresponse[0].name);
        };
        getTestKits(callback);
    }
};
