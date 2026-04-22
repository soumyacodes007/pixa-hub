import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    PIXA_ADMIN_SECRET: z.ZodString;
    BASE_TREASURY_PRIVATE_KEY: z.ZodString;
    BASE_USDC_CONTRACT_MAINNET: z.ZodDefault<z.ZodString>;
    BASE_USDC_CONTRACT_TESTNET: z.ZodDefault<z.ZodString>;
    NETWORK: z.ZodDefault<z.ZodEnum<["testnet", "mainnet"]>>;
    PORT: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    DATABASE_URL: string;
    PIXA_ADMIN_SECRET: string;
    BASE_TREASURY_PRIVATE_KEY: string;
    BASE_USDC_CONTRACT_MAINNET: string;
    BASE_USDC_CONTRACT_TESTNET: string;
    NETWORK: "testnet" | "mainnet";
    PORT: number;
}, {
    DATABASE_URL: string;
    PIXA_ADMIN_SECRET: string;
    BASE_TREASURY_PRIVATE_KEY: string;
    BASE_USDC_CONTRACT_MAINNET?: string | undefined;
    BASE_USDC_CONTRACT_TESTNET?: string | undefined;
    NETWORK?: "testnet" | "mainnet" | undefined;
    PORT?: number | undefined;
}>;
export type Env = z.infer<typeof envSchema>;
export declare const env: {
    DATABASE_URL: string;
    PIXA_ADMIN_SECRET: string;
    BASE_TREASURY_PRIVATE_KEY: string;
    BASE_USDC_CONTRACT_MAINNET: string;
    BASE_USDC_CONTRACT_TESTNET: string;
    NETWORK: "testnet" | "mainnet";
    PORT: number;
};
export declare function getUsdcContract(): `0x${string}`;
export {};
