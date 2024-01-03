import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@services/http/http.service';
import { Header } from '@services/http/type/header.type';

@Injectable()
export class OkxService {
    private readonly logger = new Logger(OkxService.name);

    private defaultHeader: Header = {
        'OK_ACCESS_KEY': null,
        'OK_ACCESS_SIGN': null,
        'OK_ACCESS_TIMESTAMP': null,
        'OK_ACCESS_PASSPHRASE': null,
        'Authorization': `Bearer 539a15a6705b98a6a5295acceb15d336b218e897362591805bf632276fbaaa49`
    }

    constructor(private readonly httpService: HttpService) {}

    
}
