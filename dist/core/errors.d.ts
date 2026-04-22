import { HTTPException } from 'hono/http-exception';
export declare class InsufficientBalanceError extends Error {
    constructor(available: bigint, required: bigint);
}
export declare class UserNotFoundError extends Error {
    constructor(algorandAddr: string);
}
export declare class DuplicateDepositError extends Error {
    constructor(algoTxId: string);
}
export declare class UnsupportedNetworkError extends Error {
    constructor(network: string);
}
export declare function toHttpException(err: unknown): HTTPException;
