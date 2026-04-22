export async function healthHandler(c) {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() });
}
//# sourceMappingURL=health.js.map