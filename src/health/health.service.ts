import { Inject, Injectable, Logger } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { DRIZZLE } from '../database/database.constants';
import type { DrizzleDatabase } from '../database/database.provider';

function messageOf(value: unknown): string | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined;
  }

  const { message } = value as { message?: unknown };

  return typeof message === 'string' && message !== '' ? message : undefined;
}

/**
 * O Drizzle embrulha falhas do driver ("Failed query: ..."), então a causa real
 * — `ECONNREFUSED`, senha inválida, banco inexistente — fica em `cause`.
 */
function describeError(error: unknown): string {
  const cause = (error as { cause?: unknown } | null)?.cause;

  return (
    messageOf(cause) ??
    messageOf(error) ??
    'Erro desconhecido ao consultar o banco'
  );
}

export interface DatabaseHealth {
  status: 'up' | 'down';
  latencyMs: number;
  error?: string;
}

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDatabase) {}

  /**
   * Executa a query mais barata possível contra o Postgres para provar que a
   * conexão pelo ORM está de pé.
   */
  async checkDatabase(): Promise<DatabaseHealth> {
    const startedAt = Date.now();

    try {
      await this.db.execute(sql`select 1`);

      return { status: 'up', latencyMs: Date.now() - startedAt };
    } catch (error) {
      const message = describeError(error);

      this.logger.error(`Healthcheck do banco falhou: ${message}`);

      return {
        status: 'down',
        latencyMs: Date.now() - startedAt,
        error: message,
      };
    }
  }
}
