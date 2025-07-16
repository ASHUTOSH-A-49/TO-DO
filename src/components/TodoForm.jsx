import React from 'react'
import { useTodo } from '../context/TodoContext'

const TodoForm = () => {
    const [todo, setTodo] = React.useState("")
    const [deadline, setDeadline] = React.useState("") // NEW STATE

    const { addTodo } = useTodo();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo) return;
        addTodo({ text: todo, completed: false, deadline });

        setTodo("");
        setDeadline(""); // reset
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form flex flex-col gap-2 md:flex-row">
            <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder='Write todo...'
                className='w-full md:w-3/4 mx-7 border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
            />
            <label htmlFor="deadline" className="text-sm mb-1">Date</label>
  <input
    id="deadline"
    type="datetime-local"
    value={deadline}
    onChange={(e) => setDeadline(e.target.value)}
    className="w-full md:w-auto border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
  />
            <button
                type='submit'
                className='rounded-lg px-3 py-1 bg-green-600 text-white shrink-0'
            >
                Add
            </button>
        </form>
    )
}

export default TodoForm

