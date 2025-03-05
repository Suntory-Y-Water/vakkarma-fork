import { type Result, err, ok } from 'neverthrow';
import postgres from 'postgres';
import type { Sql } from 'postgres';
import { DatabaseError } from '../src/types/Error';

export let sql: Sql | null = null;

export const initSql = (databaseUrl: string): Result<Sql, DatabaseError> => {
  try {
    if (!sql) {
      sql = postgres(databaseUrl);
    }
    return ok(sql);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return err(new DatabaseError(message));
  }
};
