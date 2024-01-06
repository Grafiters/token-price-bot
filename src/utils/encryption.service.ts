import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {
    constructor() {

    }

    public async parseAddress<T>(address: string): Promise<string>{
        console.log(address);
        
        const prefix = address.substring(0, 6);
        const suffix = address.substring(address.length - 6);
        const ellipsis = '...';

        return `${prefix}${ellipsis}${suffix}`;
        return '';
    }
}
