'use server'

import { dzlClient } from '@/lib/drizzle';
import { todos } from '@/lib/schema';
import { wait } from '@/lib/utils';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const createTodo = async (formData: FormData) => {
  await wait(1000)
  const { content } = Object.fromEntries(formData)

  try {
    await dzlClient.insert(todos).values({ content: content as string })

  } catch (e) {
    return { error: e as Error }
  } finally {
    revalidatePath('/')

  }

}

export const deleteTodo = async (todoId: number) => {
  try {
    await dzlClient.delete(todos).where(eq(todos.id, todoId))

  } catch (e) {
    return { error: e as Error }
  } finally {
    revalidatePath('/')

  }

}

export const toggleCompleteTodo = async (todoId: number, completed: boolean) => {
  try {
    await dzlClient.update(todos)
      .set({ completed }).where(eq(todos.id, todoId))

  } catch (e) {
    return { error: e as Error }
  } finally {
    revalidatePath('/')

  }

}
