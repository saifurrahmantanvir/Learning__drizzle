import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core'

/**
 * @brief after making necessary changes run
 * $ npx drizzle-kit push:pg
 * Before running the command update tsconfig target to ESNext
 * 
 * 
 */
export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  completed: boolean('completed').default(false),
  content: text('content').notNull(),
})

export type Todo = typeof todos.$inferSelect;
