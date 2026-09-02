import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import { DRIZZLE, PG_POOL } from './database.constants';
import { drizzleProvider, pgPoolProvider } from './database.provider';

/**
 * Módulo global de acesso a dados. Expõe o client Drizzle pelo token `DRIZZLE`
 * e fecha o pool no shutdown da aplicação.
 */
@Global()
@Module({
  providers: [pgPoolProvider, drizzleProvider],
  exports: [DRIZZLE, PG_POOL],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
