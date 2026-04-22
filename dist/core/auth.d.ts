export declare class DesktopAuthError extends Error {
    constructor(message: string);
}
export interface VerifiedDesktopAuth {
    address: string;
    timestamp: string;
    nonce: string;
}
export declare function verifyDesktopPayRequest(params: {
    headers: {
        authVersion?: string;
        address?: string;
        timestamp?: string;
        nonce?: string;
        bodySha256?: string;
        signature?: string;
    };
    rawBody: string;
    requestBody: {
        correlationId: string;
        sellerNetwork?: string;
        userContext?: {
            algorandAddress?: string;
            maxDebitAtomic?: string;
        };
    };
}): VerifiedDesktopAuth;
