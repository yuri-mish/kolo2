"use strict";
// import React from 'react'
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PartnerList = exports.Partner = void 0;
var dbclass_1 = require("../dbclass");
var Partner = /** @class */ (function (_super) {
    __extends(Partner, _super);
    function Partner(uuid) {
        if (uuid === void 0) { uuid = ''; }
        var _this = _super.call(this, 'cat.partners', 'Контрагент', uuid) || this;
        /**
         * The price.
         */
        _this.price = 0; //aaa    
        Object.defineProperties(_this, {
            partnerRef: {
                value: '=Ref=',
                writable: true
            },
            partnerObj: {
                value: '=Obj=',
                writable: true
            }
        });
        return _this;
    }
    return Partner;
}(dbclass_1.cCatalog));
exports.Partner = Partner;
var PartnerList = /** @class */ (function () {
    function PartnerList() {
        this.list = [];
        this.load = function (source) {
        };
    }
    return PartnerList;
}());
exports.PartnerList = PartnerList;
