'use server'

import { wait } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export const createTodo = async (formData: FormData) => {
  await wait(1000)
  const { content } = Object.fromEntries(formData)

  try {

  } catch (e) {
    return { error: e as Error }
  } finally {
    revalidatePath('/')

  }

}

export const deleteTodo = async (todoId: string) => {
  try {

  } catch (e) {
    return { error: e as Error }
  } finally {
    revalidatePath('/')

  }

}