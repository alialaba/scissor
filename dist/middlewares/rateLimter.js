import rateLimit from 'express-rate-limit';
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
//# sourceMappingURL=rateLimter.js.map