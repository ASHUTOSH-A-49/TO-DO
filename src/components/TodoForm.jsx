import React from 'react'
import { useTodo } from '../context/TodoContext'

const TodoForm = () => {
    const [todo,setTodo] = React.useState("")
    const { addTodo } = useTodo();

    // we have to designa handleSubmit function that will be called when the form is submitted.
    // This function will prevent the default form submission behavior, check if the todo is not empty,
    // and then call the addTodo function from the context to add the new todo item.
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo) return;
        addTodo({ text: todo, completed: false });
        setTodo("");
    };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder='write todo...'  className='w-3/4 mx-7 border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5'/>
      <button type='submit ' className='rounded-lg px-3 py-1 bg-green-600 text-white shrink-0'>Add</button>
    </form>
  )
}

export default TodoForm
