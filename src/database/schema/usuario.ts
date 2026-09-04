import { pgTable, uuid, varchar, timestamp, date } from 'drizzle-orm/pg-core';
export const usuarios = pgTable('usuarios', {
  id: uuid('UUID_user').defaultRandom().primaryKey(),
  primeiroNome: varchar('Primeiro_nome', { length: 100 }).notNull(),
  sobrenome: varchar('Sobrenome', { length: 100 }).notNull(),
  email: varchar('E-Mail', { length: 255 }).notNull().unique(),
  telefone: varchar('Telefone', { length: 20 }),
  senha: varchar('Senha', { length: 255 }).notNull(),
  cpf: varchar('CPF', { length: 11 }).notNull().unique(),
  dataNascimento: date('Data_de_nascimento').notNull(),
  tipoPerfil: varchar('Tipo_de_perfil', { length: 50 }).notNull(),
  dataCriacao: timestamp('Data_de_criacao').defaultNow().notNull(),
  dataModificacao: timestamp('Data_de_modificacao').defaultNow().notNull(),
  status: varchar('Status', { length: 20 }).default('ATIVO').notNull(),
  deletedAt: timestamp('Deleted_at'),
});