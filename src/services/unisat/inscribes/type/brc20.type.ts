export type BrcDeploy = {
    receiveAddress: string | "",
    feeRate: number | 0,
    outputValue: number | "",
    devAddress: string | "",
    devFee: number | 0,
    brc20Ticker: string | "",
    brc20Max: string | "",
    brc20Limit: string | ""
}

export type BrcMint = {
    receiveAddress: string,
    feeRate: number,
    outputValue: number | 546,
    devAddress: string | "",
    devFee: number | 0,
    brc20Ticker: string,
    brc20Amount: string,
    count: number | 1
}

export type BrcTransfer = {
    receiveAddress: string,
    feeRate: number | 1,
    outputValue: number | 546,
    devAddress: string,
    devFee: number | 0,
    brc20Ticker: string,
    brc20Amount: string
}

export type InscribeData = {
    orderId: string,
    status: string,
    payAddress: string,
    receiveAddress: string,
    amount: number,
    paidAmount: number | 0,
    outputValue: number | 0,
    feeRate: number | 0,
    minerFee: number | 0,
    serviceFee: number | 0,
    devFee: number | 0,
    files: InscribeDataFile[],
    count: number | 1,
    pendingCount: number | 1,
    unconfirmedCount: number | 0,
    confirmedCount: number | 0,
    createTime: number,
    refundTxid: string,
    refundAmount: number | 0,
    refundFeeRate: number | 0
}

export type InscribeDataFile = {
    filename: string,
    inscriptionId: string,
    status: string
}

