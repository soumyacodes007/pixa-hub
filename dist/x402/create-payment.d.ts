export interface PaymentRequirements {
    x402Version: number;
    accepts: Array<{
        scheme: string;
        network: string;
        payTo: string;
        amount?: string;
        maxAmountRequired?: string;
        asset: string;
        maxTimeoutSeconds?: number;
        extra?: Record<string, unknown>;
    }>;
    resource?: {
        url?: string;
        description?: string;
        mimeType?: string;
    };
    extensions?: Record<string, unknown>;
}
export declare function createX402Payment(params: {
    paymentRequirements: PaymentRequirements;
    sellerNetwork: string;
}): Promise<{
    paymentSignature: string;
}>;
