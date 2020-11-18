"use strict";
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
exports.ViewOrder = void 0;
var react_1 = require("react");
var dbclass_1 = require("../dbclass");
var core_1 = require("@material-ui/core");
var pickers_1 = require("@material-ui/pickers");
var moment_1 = require("@date-io/moment");
// interface IGoodsCard extends CatCard  {
//     priceValue?:number;
// }
var BuyerOrder = /** @class */ (function (_super) {
    __extends(BuyerOrder, _super);
    /**
     * The price.
     */
    //aaaa
    function BuyerOrder(uuid) {
        if (uuid === void 0) { uuid = ''; }
        return _super.call(this, 'doc.buyer_order', uuid) || this;
    }
    ;
    return BuyerOrder;
}(dbclass_1.Document));
var seStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        paddingLeft: '10px',
        paddingRight: '10px'
    }
}); });
exports.ViewOrder = function (props) {
    var docObject = props.docObject;
    var _a = react_1.useState(new Date()), selectedDate = _a[0], setDate = _a[1];
    var classes = seStyles();
    var handleChange = function (event) {
        event.preventDefault();
        var id = event.target.id;
        docObject[id] = event.target.value;
    };
    var handleDateChange = function (props) {
    };
    return (react_1["default"].createElement(pickers_1.MuiPickersUtilsProvider, { utils: moment_1["default"] },
        react_1["default"].createElement("div", { className: classes.root },
            react_1["default"].createElement("h1", null,
                "=",
                docObject._id,
                "="),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(core_1.TextField, { style: { width: '25%' }, id: "number_doc", label: "\u041D\u043E\u043C\u0435\u0440", defaultValue: docObject.number_doc, onChange: handleChange }),
                react_1["default"].createElement(pickers_1.KeyboardDateTimePicker, { style: { width: '25%' }, variant: "inline", ampm: false, label: "\u0414\u0430\u0442\u0430", value: selectedDate, onChange: handleDateChange, onError: console.log, disablePast: true, format: "dd/MM/yyyy HH:mm:ss" })))));
};
exports["default"] = BuyerOrder;
