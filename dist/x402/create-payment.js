import { x402Client, x402HTTPClient } from '@x402/core/client';
import { registerExactEvmScheme } from '@x402/evm/exact/client';
import { createWalletClient, http, publicActions } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base, baseSepolia } from 'viem/chains';
import { env } from '../core/env.js';
export async function createX402Payment(params) {
    const { paymentRequirements, sellerNetwork } = params;
    const hasMatchingNetwork = paymentRequirements.accepts.some((accept) => accept.network === sellerNetwork || normalizeNetwork(accept.network) === normalizeNetwork(sellerNetwork));
    if (!hasMatchingNetwork) {
        throw new Error(`No suitable payment option found for network ${sellerNetwork}`);
    }
    const account = privateKeyToAccount(env.BASE_TREASURY_PRIVATE_KEY);
    const chain = normalizeNetwork(sellerNetwork) === 'eip155:8453' ? base : baseSepolia;
    const walletClient = createWalletClient({
        account,
        chain,
        transport: http()
    }).extend(publicActions);
    const signer = Object.assign(walletClient, { address: account.address });
    const client = new x402Client();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerExactEvmScheme(client, { signer: signer });
    const httpClient = new x402HTTPClient(client);
    // Let the official x402 client preserve the seller's original V1 shape.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = await httpClient.createPaymentPayload(paymentRequirements);
    const headers = httpClient.encodePaymentSignatureHeader(payload);
    const paymentSignature = headers['X-PAYMENT'] ?? headers['PAYMENT-SIGNATURE'];
    if (!paymentSignature) {
        throw new Error('Failed to encode payment signature header');
    }
    return { paymentSignature };
}
function normalizeNetwork(network) {
    if (network === 'base')
        return 'eip155:8453';
    if (network === 'base-sepolia')
        return 'eip155:84532';
    return network;
}
//# sourceMappingURL=create-payment.js.map