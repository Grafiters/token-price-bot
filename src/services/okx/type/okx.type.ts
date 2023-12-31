export type Token = {
    txId: string,
    blockHeight: string,
    state: string,
    tokenType: string,
    actionType: string,
    fromAddress: string,
    toAddress: string,
    amount: string,
    token: string,
    inscriptionId: string,
    inscriptionNumber: string,
    index: string,
    location: string,
    msg: string,
    time: string
}

export type TokenDetail = {
    token: string,
    precision: number,
    totalSupply: number,
    mintAmount: number,
    limitPerMint: number,
    holder: number,
    deployAddress: string,
    logoUrl: string,
    txId: string,
    inscriptionId: string,
    deployHeight: number,
    deployTime: number,
    inscriptionNumber: number,
    state: string,
    tokenType: string,
    msg: string
}

export type SummaryToken = {
    lastPrice: string,
    totalSupply: string,
    maxSupply: string,
    circulatingSupply: string,
    volume24h: string,
    marketCap: string,
    high24h: string,
    low24h: string,
    priceAbnormal: []
}