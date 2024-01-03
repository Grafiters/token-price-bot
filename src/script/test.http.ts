import { useCore } from './helpers.js';
import { UnisatService } from '../services/unisat/unisat.service.js';


useCore( async function (core) {
    console.log("Try to get Height");
    try {
        const hsv = core.get(UnisatService);
        const file = await hsv.getHeight();
        console.log(file);
        
    } catch (error) {
        console.log(error);
    }

    console.log("Try to get List");
    try {
        const hsv = core.get(UnisatService);
        const file = await hsv.getList();
        console.log(file);
        
    } catch (error) {
        console.log(error);
    }
})