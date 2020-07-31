function _instanceof(b, a) {
    if (a != null && typeof Symbol !== "undefined" && a[Symbol.hasInstance]) {
        return !!a[Symbol.hasInstance](b)
    } else {
        return b instanceof a
    }
}
function _classCallCheck(a, b) {
    if (!_instanceof(a, b)) {
        throw new TypeError("Cannot call a class as a function")
    }
}
function _defineProperties(d, b) {
    for (var a = 0; a < b.length; a++) {
        var c = b[a];
        c.enumerable = c.enumerable || false;
        c.configurable = true;
        if ("value"in c) {
            c.writable = true
        }
        Object.defineProperty(d, c.key, c)
    }
}
function _createClass(c, a, b) {
    if (a) {
        _defineProperties(c.prototype, a)
    }
    if (b) {
        _defineProperties(c, b)
    }
    return c
}
var GachaJsSDK = (function() {
    function b() {
        _classCallCheck(this, b);
        this.callbacks = {}
    }
    _createClass(b, [{
        key: "sendRequest",
        value: function c(i) {
            var h = i.url
              , m = i.params
              , l = i.success
              , g = i.error;
            var k = "gacha-js://" + h;
            if (m) {
                k = k + "?" + this.encodeSearchParams(m)
            }
            this.callbacks[k] = {
                success: l,
                error: g
            };
            var j = document.createElement("iframe");
            j.style.width = "1px";
            j.style.height = "1px";
            j.style.display = "none";
            j.src = k;
            document.body.appendChild(j);
            setTimeout(function() {
                j.remove()
            }, 100)
        }
    }, {
        key: "handleRequest",
        value: function e(i) {
            var h = i.url
              , j = i.data
              , g = i.error;
            var k = this.callbacks[h];
            if (k != null) {
                if (j != null && k.success != null) {
                    k.success(j)
                } else {
                    if (g != null && k.error != null) {
                        k.error(g)
                    }
                }
                delete this.callbacks[h]
            }
        }
    }, {
        key: "getToken",
        value: function f(h) {
            var j = h.id
              , i = h.success
              , g = h.error;
            this.sendRequest({
                url: "getToken",
                params: {
                    app_id: j
                },
                success: i,
                error: g
            })
        }
    }, {
        key: "getUserInfo",
        value: function d(h) {
            var j = h.id
              , i = h.success
              , g = h.error;
            this.sendRequest({
                url: "getUserInfo",
                params: {
                    app_id: j
                },
                success: i,
                error: g
            })
        }
    }, {
        key: "encodeSearchParams",
        value: function a(g) {
            var h = [];
            Object.keys(g).forEach(function(i) {
                var j = g[i];
                if (typeof j === "undefined") {
                    j = ""
                }
                h.push([i, encodeURIComponent(j)].join("="))
            });
            return h.join("&")
        }
    }]);
    return b
}
)();
var GachaSDK = new GachaJsSDK();
