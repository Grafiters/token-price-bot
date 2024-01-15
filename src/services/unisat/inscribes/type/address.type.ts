export type Address = {
    address: string,
    satoshi: number,
    pendingSatoshi: number | 0,
    utxoCount: number | 0,
    btcSatoshi: number | 0,
    btcPendingSatoshi: number | 0,
    btcUtxoCount: number | 0,
    inscriptionSatoshi: number | 0,
    inscriptionPendingSatoshi: number | 0,
    inscriptionUtxoCount: number | 0
}