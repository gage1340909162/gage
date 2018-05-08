function Ajax(opt) {
    var defaults = {
        type: "get",
        async: true,
        data: null,
        success: null,
        error: null
    };
    var settings = extend({}, defaults, opt);
    if (Object.prototype.toString.call(settings.data) === "[object Object]") {
        var obj = settings.data;
        var str = "";
        for (var i in obj) {
            str += k + "=" + obj[k] + "&";
        }
        settings.data = str.slice(0, -1);
    }
    var xml = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
    var getData = "";
    if (settings.data && settings.data === "get") {
        getData = "?" + encodeURI(settings.data);
    }

    xml.open(settings.type, settings.url + getData, settings.async);
    xml.onreadystatechange = function() {
        if (xml.readyState === 4) {
            if (xml.status === 200) {
                settings.success(JSON.parse(xml.reponseText));
            }
        }
    }
    var postData = null;
    if (settings.data && settings.type === 'post') {
        postData = encodeURI(settings.data);
        xml.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
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