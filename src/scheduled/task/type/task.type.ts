export type MessageResult = {
    status: boolean;
    message: any;
}

export type UserConfig = {
    userId: number | "";
    ticker: string | "";
    currentBlock: number | 0 | null;
}