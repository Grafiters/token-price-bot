import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@services/http/http.service';
import { Header } from '@services/http/type/header.type';

@Injectable()
export class OkxService {
    private readonly logger = new Logger(OkxService.name);
    private tickerOn: string;
    private defaultLimit: number;

    private defaultHeader: Header = {
        'Ok-Access-Key': '1897ad11-6ba4-43b8-b447-978616f07415',
        'OK_ACCESS_SIGN': null,
        'OK_ACCESS_TIMESTAMP': null,
        'OK_ACCESS_PASSPHRASE': null,
        'Authorization': null
    }

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        const mustOkxTokenConfig = this.configService.get('tokenticker')
        const { token } = mustOkxTokenConfig;
        this.defaultLimit = 20;
        this.tickerOn = token;
    }

    public async TokenActivity(){
        const time = Date.now();
        const timestamp = Math.floor(time/1000);
        const path = `nft/brc/detail/activity?tick=${this.tickerOn}&ticker=${this.tickerOn}&pageSize=${this.defaultLimit}&t=${timestamp}`;
        try {
            const response = await this.httpService.get(path, 'okxActivity', this.defaultHeader);

            console.log(response);

            return response.data.data;
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            throw(error);
            
        }
    }
}
