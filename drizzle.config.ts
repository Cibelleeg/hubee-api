import { defineConfig } from 'drizzle-kit';

function required(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(
      `Variável de ambiente "${key}" é obrigatória para rodar o drizzle-kit. Confira o seu .env.`,
    );
  }

  return value;
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema/index.ts',
  out: './src/database/migrations',
  dbCredentials: {
    host: required('DB_HOST'),
    port: Number(process.env.DB_PORT ?? 5432),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
    database: required('DB_NAME'),
    ssl: process.env.DB_SSL === 'true' ? 'require' : false,
  },
  verbose: true,
  strict: true,
});
