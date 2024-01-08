"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _okxservice = require("../services/okx/okx.service.js");
const _helpers = require("./helpers.js");
(0, _helpers.useCore)(async function(core) {
    console.log("===================");
    console.log("TRY TO GET ACTIVITY");
    console.log("===================");
    const hsv = core.get(_okxservice.OkxService);
    const bodyObject = {
        receiveAddress: 'bc1p7vyu96tvgnqj5erysf9vt2vuf3rwv83t7s5clcgp5m7dw232uyasc52jjw',
        feeRate: 1,
        outputValue: 546,
        devAddress: "",
        devFee: 0,
        brc20Ticker: "ryud",
        brc20Max: "2",
        brc20Limit: ""
    };
    const file = await hsv.TokenActivity();
    console.log(file);
    console.log("===================");
    console.log("DONE GET ACTIVITY");
    console.log("===================");
});
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
