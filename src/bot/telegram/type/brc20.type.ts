import { BrcDeploy, BrcMint, BrcTransfer } from "@services/unisat/inscribes/type/brc20.type";

export const defaultMintValue: BrcMint = {
    receiveAddress: "",
    feeRate: 0,
    outputValue: 546,
    devAddress: "",
    devFee: 0,
    brc20Ticker: "",
    brc20Amount: "0.0",
    count: 1
}

export const defaultDeployValue: BrcDeploy = {
    receiveAddress: "",
    feeRate: 1,
    outputValue: 546,
    devAddress: "",
    devFee: 0,
    brc20Ticker: "",
    brc20Max: "",
    brc20Limit: ""
}

export const defaultTransferValue: BrcTransfer = {
    receiveAddress: "",
    feeRate: 1,
    outputValue: 546,
    devAddress: "",
    devFee: 0,
    brc20Ticker: "",
    brc20Amount: ""
}