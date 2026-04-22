import type { PaymentRequirements } from './create-payment.js';
/**
 * Parses and validates the PaymentRequired body sent from the seller's 402 response.
 * The desktop strips the 402 header and forwards the raw JSON to the hub.
 */
export declare function parsePaymentRequirements(raw: unknown): PaymentRequirements;
/**
 * Finds the best supported network from the accepts list.
 * Returns the CAIP-2 network string if supported, or null if none match.
 */
export declare function resolveSellerNetwork(paymentRequirements: PaymentRequirements): string | null;
/**
 * Extracts the seller's payTo address from the matching accept entry.
 */
export declare function getSellerAddress(paymentRequirements: PaymentRequirements, network: string): string;
/**
 * Extracts the required payment amount in atomic units.
 */
export declare function getPaymentAmountAtomic(paymentRequirements: PaymentRequirements, network: string): bigint;
