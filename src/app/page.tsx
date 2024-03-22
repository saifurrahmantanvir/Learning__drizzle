import TodoComponent from "@/components/todo-component"

export default async function Home() {
  return (
    <div className="grid grid-cols-2 gap-12 items-start p-10 max-w-screen-xl mx-auto space-y-4">
      <div>
        <h1 className='text-3xl font-medium mb-3'>Saifur rahman Tanvir</h1>
        <div className="mb-32 grid lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          List of Todos
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-2 space-y-2">
          <h1 className="text-3xl font-bold px-1">To-Do List</h1>
          <TodoComponent todos={[]} />
        </header>
      </div>
    </div>
  )
}
