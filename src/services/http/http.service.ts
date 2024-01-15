import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { env } from 'node:process';

import * as yaml from 'js-yaml';
import { YmlContent } from './type/path.type';
import { Header } from './type/header.type';
import axios, { AxiosRequestConfig } from 'axios';

const filePath = './platform.yml';

@Injectable()
export class HttpService {
    private readonly logger = new Logger(HttpService.name);
    private platformName: string;
    private ymlContent: YmlContent;
    private customHeader: Header;
    private useProxy = env.USE_PROXY;

    private defaultHeader: Record<string, string> = {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer 539a15a6705b98a6a5295acceb15d336b218e897362591805bf632276fbaaa49', 
    }

    constructor(){}

    public async get<T>(path: string, platform: string | '', customHeader: Header): Promise<any> {
        try {
            this.platformName = platform;
            const buildUrlPath = await this.buildPathUrl(path);
            this.customHeader = customHeader;

            const headers = await this.buildHeader();

            const config: AxiosRequestConfig = { 
                headers
            };

            this.logger.debug(buildUrlPath)
            const response = await axios.get(buildUrlPath, config);
            
            return response;
        } catch (error) {
            this.logger.error(`error when try to request on url ${this.buildPathUrl}`, error)
            throw error;
        }
    }

    public async post<T>(path: string, platform: string | '', customHeader: Header, body: any): Promise<any>{
        try {
            this.platformName = platform;
            const buildUrlPath = await this.buildPathUrl(path);
            this.customHeader = customHeader;

            const headers = this.defaultHeader;

            const config: AxiosRequestConfig = { 
                headers 
            };
            this.logger.debug(headers)
            this.logger.debug(JSON.stringify(body))
            this.logger.debug(buildUrlPath)
            const response = await axios.post(buildUrlPath, JSON.stringify(body), config);
            
            return response;
        } catch (error) {
            this.logger.error(`error when try to request on url ${this.buildPathUrl}`, error)
            throw error;
        }
    }
    
    private async buildHeader() {
        return {
            ...this.defaultHeader,
            ...this.customHeader
        };
    }

    private async buildPathUrl<T>(path: string): Promise<string> {
        const readFileContect = await readFile(filePath, 'utf8');
        const readContent = yaml.load(readFileContect);

        this.ymlContent = readContent[this.platformName];
        
        const pathUrl = `${this.ymlContent.url}${this.ymlContent.service}/${path}`;

        return pathUrl;
    }
}