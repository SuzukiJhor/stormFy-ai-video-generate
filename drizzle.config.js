/** @type {import("drizzle-kit").Config} */

import { defineConfig } from "drizzle-kit";


export default defineConfig ({
    dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
    schema: './configs/schema.js',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_pvnai3gzbPJ9@ep-raspy-credit-a88vl7pa-pooler.eastus2.azure.neon.tech/stormfy-ai-video-generator?sslmode=require',
    }
  })