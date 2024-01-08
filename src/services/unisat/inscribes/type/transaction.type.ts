export type Transaction = {
    valid: boolean,
    type: string,
    from: string,
    to: string,
    amount: string,
    overallBalance: string,
    availableBalance: string,
    transferBalance: string,
    inscriptionId: string,
    inscriptionNumber: number,
    height: number,
    blockhash: string,
    blocktime: number,
    txIdx: number,
    txid: string,
    satoshi: number
}

export type TransactionResponse = {
    detail: Transaction[],
    start: number,
    total: number
}