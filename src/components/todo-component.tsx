'use client';

import React, { useOptimistic, useRef } from 'react'
import { createTodo, deleteCompleteTodos, deleteTodo, toggleCompleteTodo } from '@/actions/todo';

import { Icons } from "@/components/icons"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/submit-button';

interface Todo {
  id: number
  content: string
  completed?: boolean | null
}

interface Props {
  todos: Todo[]
}

const TodoComponent = ({ todos }: Props) => {
  const ref = useRef<HTMLFormElement>(null)
  /* const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, (state, newTodo: Todo) => {
    return [...state, newTodo]
  }) */

  const addTodo = async (formData: FormData) => {
    ref.current?.reset()

    /* addOptimisticTodo({
      id: Math.floor(Math.random() * 100),
      content: formData.get('content') as string
    }) */

    try {
      await createTodo(formData)
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <>
      <form ref={ref} action={addTodo} className="flex space-x-2 !mb-8">
        <Input className="max-w-sm flex-1" name="content" placeholder="Add new todo..." type="text" />
        <SubmitButton />
      </form>
      {todos.length ? (
        <>
          <main className="flex-1 grid grid-cols-1 gap-4 mb-3 px-2">
            {todos.map(todo => (
              <form action={deleteTodo.bind(null, todo.id)} key={todo.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={todo?.completed!}
                  id={`todo-${todo.id}`}
                  onClick={() => toggleCompleteTodo(todo.id, !todo.completed)} />
                <label className={`flex-1 cursor-pointer ${todo.completed ? 'line-through' : ''}`} htmlFor={`todo-${todo.id}`}>
                  {todo.content}
                </label>
                <Button size="icon" variant="outline">
                  <Icons.trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </form>
            ))}
          </main>
          <form action={deleteCompleteTodos} className="flex justify-end col-span-2">
            <Button variant="outline">Clear completed</Button>
          </form>
        </>
      ) : (
        <div className="grid px-2 lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          Todo list empty!
        </div>
      )}
    </>
  )
}

export default TodoComponent