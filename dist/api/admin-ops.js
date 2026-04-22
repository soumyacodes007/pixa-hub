import { pool } from '../db/client.js';
import { env } from '../core/env.js';
import { privateKeyToAccount } from 'viem/accounts';
export async function adminOpsHandler(c) {
    const client = await pool.connect();
    try {
        // Treasury wallet address
        const account = privateKeyToAccount(env.BASE_TREASURY_PRIVATE_KEY);
        // Recent payments
        const recentPayments = await client.query(`SELECT correlation_id, seller_network, seller_address, amount_atomic, status, created_at
       FROM payment_attempts
       ORDER BY created_at DESC
       LIMIT 20`);
        // Stuck payments (paying > 5 minutes — needs reconciliation)
        const stuckPayments = await client.query(`SELECT correlation_id, created_at FROM payment_attempts
       WHERE status = 'paying' AND created_at < now() - interval '5 minutes'`);
        // Total treasury outflow
        const treasuryStats = await client.query(`SELECT COALESCE(SUM(amount_atomic), 0)::text AS total_out, COUNT(*)::text AS count
       FROM treasury_records WHERE direction = 'payment_out'`);
        // Total user balances
        const balanceStats = await client.query(`SELECT COALESCE(SUM(balance_atomic), 0)::text AS total, COUNT(*)::text AS users FROM balances`);
        return c.json({
            treasuryAddress: account.address,
            network: env.NETWORK,
            totalUserBalanceAtomic: balanceStats.rows[0]?.total ?? '0',
            totalUserBalanceUsdc: (Number(balanceStats.rows[0]?.total ?? 0) / 1_000_000).toFixed(6),
            totalUsersWithBalance: balanceStats.rows[0]?.users ?? '0',
            treasuryOutflowAtomic: treasuryStats.rows[0]?.total_out ?? '0',
            treasuryOutflowUsdc: (Number(treasuryStats.rows[0]?.total_out ?? 0) / 1_000_000).toFixed(6),
            paymentCount: treasuryStats.rows[0]?.count ?? '0',
            stuckPayments: stuckPayments.rows,
            recentPayments: recentPayments.rows.map((r) => ({
                ...r,
                amountUsdc: (Number(r.amount_atomic) / 1_000_000).toFixed(6),
            })),
        });
    }
    finally {
        client.release();
    }
}
//# sourceMappingURL=admin-ops.js.map