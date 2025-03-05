import type {} from 'hono';
import type { Container } from 'inversify';

declare module 'hono' {
  interface Env {
    D1: D1Database;
    Variables: {
      container: Container;
    };
  }
  // interface Variables {
  //   container: Container;
  // }
}
