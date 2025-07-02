import React from 'react'
import { useTodo } from '../context/TodoContext';

const TodoItem = ({ todo }) => {
    const [isTodoEditable, setIsTodoEditable] = React.useState(false);
    const [todoText, setTodoText] = React.useState(todo.text);
    

    const{updateTodo,deleteTodo,toggleComplete} = useTodo();

    // now we will write some piece of code to conditionally edit the todo item.
    const editTodo = () => {
        updateTodo(todo.id, todoText);
        setIsTodoEditable(false);
    }

    // this function will be called when the delete button is clicked.
    const toggleCompleted = () => {
        toggleComplete(todo.id);
        todo.completed = !todo.completed
    }

  return (
    <div  className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>

        <input type="checkbox" 
        className='cursor-pointer'
        checked = {todo.completed}
        onChange={toggleCompleted}

        />

        <input type="text" className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"}
        ${todo.completed?"text-decoration-line: line-through":"text-decoration-line: none;"}`}
        value={todoText}
        readOnly = {!isTodoEditable}
        onChange={(e) => setTodoText(e.target.value)}
        
        />


        {/* now we will create save button  */}
        <button
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'

         onClick={() => {
            if (todo.completed) return
            if(isTodoEditable) {
                editTodo();
            }else setIsTodoEditable((prev)=> !prev);
        }}
        disabled = {todo.completed}
         
         >{isTodoEditable ? "📁" : "✏️"}</button>


         <button
         className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0'

         onClick={() => {
            if (todo.completed) return;
            deleteTodo(todo.id);
        }}   
         >❌</button>

    </div>
  )
}

export default TodoItem
