import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: `tsx prisma/seed.ts`,
    },
    datasource: {
        // Force direct connection for migrations/dev to avoid pooler issues
        url: process.env.DIRECT_URL,
        // directUrl: process.env.DIRECT_URL,
    },
});
