(function () {
    'use strict';
    if (!Object.create) {
        Object.create = function (obj) {
            function Fun() {
            }
            Fun.prototype = obj;
            return new Fun();
        };
    }
}());