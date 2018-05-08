function Ajax(opt) {
    var defaults = {
        type: "get",
        async: true,
        data: null,
        success: null,
        error: null
    };
    var settings = extend({}, defaults, opt);
    var xml = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
    var getData = "";
    if (settings.data && settings.data === "get") {
        getData = "?" + encodeURL(settings.data);
    }
    xml.open(settings.type, settings.url + getData, settings.async);
    xml.onreadystatechange = function() {
        if (xml.readyState === 4) {
            if (xml.status === 200) {
                settings.success(JSON.parse(xml.reponseText));
            }
        }
    }
    xml.send(settings.data);
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        for (var k in arguments[i]) {
            arguments[0][k] = arguments[i][k];
        }
    }
    return arguments[0];
}