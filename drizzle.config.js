/** @type {import("drizzle-kit").Config} */

export default {
    dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
    schema: './configs/schema.js',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_pvnai3gzbPJ9@ep-raspy-credit-a88vl7pa.eastus2.azure.neon.tech/neondb?sslmode=req',
    }
  }