import type { Context } from 'hono';
export declare function healthHandler(c: Context): Promise<Response & import("hono").TypedResponse<{
    status: string;
    timestamp: string;
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
