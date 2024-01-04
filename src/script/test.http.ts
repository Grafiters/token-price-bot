import { useCore } from './helpers.js';
import { UnisatService } from '@services/unisat/unisat.service.js';


useCore( async function (core) {
    console.log("===================");
    console.log("TRY TO GET ACTIVITY");
    console.log("===================");
    for (let index = 0; index < 5; index++) {
        try {
            const hsv = core.get(UnisatService);
            const file = await hsv.getHeight();
    
            console.log(file);
        } catch (error) {
            console.log(error);
        }

        await sleep(100000);
    }    

    console.log("===================");
    console.log("DONE GET ACTIVITY");
    console.log("===================");
})

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}