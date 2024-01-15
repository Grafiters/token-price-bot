import { OkxService } from '@services/okx/okx.service.js';
import { useCore } from './helpers.js';
import { UnisatService } from '@services/unisat/unisat.service.js';
import { Brc20Service } from '@services/unisat/inscribes/brc20/brc20.service.js';
import { OrderService } from '@services/unisat/inscribes/order/order.service.js';
const axios = require('axios');


useCore( async function (core) {
    let data = JSON.stringify({"receiveAddress":"bc1pcwksjmzxv8k0nugjhxl60pkrmgtdjwu26wf2wuqf8q6495x0njkqw8kqc2","feeRate":1,"outputValue":546,"devAddress":"","devFee":0,"brc20Ticker":"ssss","brc20Amount":"21","count":1});

    let config = {
        headers: { 
            'Authorization': 'Bearer 539a15a6705b98a6a5295acceb15d336b218e897362591805bf632276fbaaa49', 
            'Content-Type': 'application/json'
        },
    };

    const request = await axios.post('https://open-api.unisat.io/v2/inscribe/order/create/brc20-mint', data, config)
    console.log(request.data);
    

})

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}