import { env } from 'hono/adapter';
import { createMiddleware } from 'hono/factory';

import { createContainer } from '../src/container';
import type { DbContext } from '../src/types/DbContext';
import { initSql, sql } from './db';

export const dbInitializeMiddleware = createMiddleware(async (c, next) => {
  if (!sql) {
    // 本番環境と開発環境に対応
    const databaseUrl =
      // 本番環境の場合
      env<{ DATABASE_URL: string }>(c).DATABASE_URL ??
      // 開発環境の場合
      `postgresql://${import.meta.env.VITE_POSTGRES_USER}:${import.meta.env.VITE_POSTGRES_PASSWORD}@localhost:5432/${import.meta.env.VITE_POSTGRES_DB}?sslmode=disable` ??
      '';

    const result = initSql(databaseUrl);
    if (result.isErr()) {
      return c.render(<div>DBに接続できませんでした。管理者にお問い合わせください。</div>);
    }
  }

  // 毎回リクエストごとにDIコンテナを初期化して設定する
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const dbContext: DbContext = { sql: sql! };
  const container = createContainer(dbContext);
  c.set('container', container);

  await next();
});
