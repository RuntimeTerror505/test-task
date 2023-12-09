/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    env: {
        // @ts-ignore
        TRADIER_API_KEY: process.env.TRADIER_API_KEY
    }
};

export default config;
