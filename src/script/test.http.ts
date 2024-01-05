import { OkxService } from '@services/okx/okx.service.js';
import { useCore } from './helpers.js';
import { UnisatService } from '@services/unisat/unisat.service.js';
import { Brc20Service } from '@services/unisat/inscribes/brc20/brc20.service.js';
import { OrderService } from '@services/unisat/inscribes/order/order.service.js';


useCore( async function (core) {
    console.log("===================");
    console.log("TRY TO GET ACTIVITY");
    console.log("===================");
    const hsv = core.get(OkxService);
    const bodyObject = {
        receiveAddress: 'bc1p7vyu96tvgnqj5erysf9vt2vuf3rwv83t7s5clcgp5m7dw232uyasc52jjw',
        feeRate: 1,
        outputValue: 546,
        devAddress: "",
        devFee: 0,
        brc20Ticker: "ryud",
        brc20Max: "2",
        brc20Limit: ""
    }
    const file = await hsv.tokenDetailCall();
    console.log(file);
    
    console.log("===================");
    console.log("DONE GET ACTIVITY");
    console.log("===================");
})

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}