import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const fornecedores = pgTable('suppliers', {
  id: uuid('id').primaryKey().defaultRandom(),
  nomeEmpresa: varchar('company_name', { length: 255 }).notNull(),
  cnpjCpf: varchar('cnpj_cpf', { length: 20 }).notNull().unique(),
  telefone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }).unique(),
  categoria: varchar('category', { length: 100 }),
  dataCriacao: timestamp('created_at').defaultNow().notNull(),
  dataModificacao: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});
