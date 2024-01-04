import { OkxService } from '@services/okx/okx.service.js';
import { useCore } from './helpers.js';


useCore( async function (core) {
    console.log("===================");
    console.log("TRY TO GET ACTIVITY");
    console.log("===================");
    try {
        const hsv = core.get(OkxService);
        const file = await hsv.TokenActivity();

        console.log(file);
    } catch (error) {
        console.log(error);
    }

    console.log("===================");
    console.log("DONE GET ACTIVITY");
    console.log("===================");
})