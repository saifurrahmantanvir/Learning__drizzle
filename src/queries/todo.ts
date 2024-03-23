import { asc, eq } from "drizzle-orm";

import { dzlClient } from "@/lib/drizzle";
import { Todo, todos } from "@/lib/schema";

export async function getAllTodos() {
  /* const allTodos = await dzlClient.query.todos.findMany({
    orderBy: [asc(todos.id)]
  }) */
  return dzlClient.select().from(todos).orderBy(asc(todos.id))
}

export async function insertTodo({ content }: Pick<Todo, 'content'>) {
  return dzlClient.insert(todos).values({ content })
}

export async function updateTodoById(todoId: number, data: Partial<Todo>) {
  return dzlClient.update(todos)
    .set({ ...data }).where(eq(todos.id, todoId))
}

export async function deleteTodoById(todoId: number) {
  return dzlClient.delete(todos).where(eq(todos.id, todoId))
}