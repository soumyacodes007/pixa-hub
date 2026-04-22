import { HTTPException } from 'hono/http-exception';
import { DesktopAuthError } from './auth.js';
export class InsufficientBalanceError extends Error {
    constructor(available, required) {
        super(`Insufficient balance: have ${available} atomic units, need ${required}`);
        this.name = 'InsufficientBalanceError';
    }
}
export class UserNotFoundError extends Error {
    constructor(algorandAddr) {
        super(`User not found for Algorand address: ${algorandAddr}`);
        this.name = 'UserNotFoundError';
    }
}
export class DuplicateDepositError extends Error {
    constructor(algoTxId) {
        super(`Deposit already credited for Algorand tx: ${algoTxId}`);
        this.name = 'DuplicateDepositError';
    }
}
export class UnsupportedNetworkError extends Error {
    constructor(network) {
        super(`Unsupported seller network: ${network}`);
        this.name = 'UnsupportedNetworkError';
    }
}
export function toHttpException(err) {
    if (err instanceof InsufficientBalanceError) {
        return new HTTPException(402, { message: err.message });
    }
    if (err instanceof UserNotFoundError) {
        return new HTTPException(404, { message: err.message });
    }
    if (err instanceof DuplicateDepositError) {
        return new HTTPException(409, { message: err.message });
    }
    if (err instanceof UnsupportedNetworkError) {
        return new HTTPException(400, { message: err.message });
    }
    if (err instanceof DesktopAuthError) {
        return new HTTPException(401, { message: err.message });
    }
    const message = err instanceof Error ? err.message : 'Internal server error';
    return new HTTPException(500, { message });
}
//# sourceMappingURL=errors.js.map