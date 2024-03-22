import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

declare global {
  var client: PostgresJsDatabase<typeof schema> | undefined;
}

let client: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === 'production') {
  client = drizzle(
    postgres(process.env.DATABASE_URL!, { prepare: false }), {
    schema
  });

} else {
  if (!global.client) {
    global.client = drizzle(
      postgres(process.env.DATABASE_URL!, { prepare: false }), {
      schema
    })

  }

  client = global.client;
}

export { client }
