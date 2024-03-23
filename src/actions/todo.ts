'use server'

import { dzlClient } from '@/lib/drizzle';
import { todos } from '@/lib/schema';
import { wait } from '@/lib/utils';
import { insertTodo, updateTodoById, deleteTodoById } from '@/queries/todo';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const createTodo = async (formData: FormData) => {
  await wait(1000)
  const { content } = Object.fromEntries(formData)

  try {
    await insertTodo({ content: content as string })

  } catch (e) {
    return { error: e as Error }
  } finally {
    revalidatePath('/')

  }

}

export const deleteTodo = async (todoId: number) => {
  try {
    await deleteTodoById(todoId)

  } catch (e) {
    return { error: e as Error }
  } finally {
    revalidatePath('/')

  }

}

export const toggleCompleteTodo = async (todoId: number, completed: boolean) => {
  try {
    await updateTodoById(todoId, { completed })

  } catch (e) {
    return { error: e as Error }
  } finally {
    revalidatePath('/')

  }

}

export const deleteCompleteTodos = async () => {
  try {
    const count = await dzlClient.delete(todos).where(eq(todos.completed, true)).returning({ id: todos.id })
    console.log(`DELETED ${count.length} completed todos!`);

  } catch (e) {
    return { error: e as Error }
  } finally {
    revalidatePath('/')

  }

}