/** @type {import("drizzle-kit").Config} */

import { defineConfig } from "drizzle-kit";


export default defineConfig ({
    dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
    schema: './configs/schema.js',
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL
    }
  })