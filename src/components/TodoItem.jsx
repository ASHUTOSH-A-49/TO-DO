import React from 'react'
import { useTodo } from '../context/TodoContext';

const TodoItem = ({ todo }) => {
    const [isTodoEditable, setIsTodoEditable] = React.useState(false);
    const [todoText, setTodoText] = React.useState(todo.text);
    const [todoDeadline, setTodoDeadline] = React.useState(formatForInput(todo.deadline));

    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    React.useEffect(() => {
        setTodoDeadline(formatForInput(todo.deadline));
    }, [todo.deadline]);

    const editTodo = () => {
        updateTodo(todo.id, { 
            text: todoText, 
            deadline: todoDeadline 
        });
        setIsTodoEditable(false);
    };

    const now = new Date();
    const hasDeadline = todo.deadline;
    const deadlineDate = hasDeadline ? new Date(todo.deadline) : null;
    const isOverdue = hasDeadline && !todo.completed && deadlineDate < now;
    const isPending = hasDeadline && !todo.completed && deadlineDate >= now;

    let bgColor = todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]";
    if (isOverdue) bgColor = "bg-[#f8d7da]";

    return (
        <div 
  className={`flex flex-col border border-black/10 rounded-lg px-3 py-2 gap-y-2 shadow-sm shadow-white/50 duration-300 text-black ${bgColor}`}
  onClick={() => {
    if (!isTodoEditable) {
      toggleComplete(todo.id);
    }
  }}
>

            <div className='flex gap-x-3 items-center'>
                <div className="w-5 h-5 flex items-center justify-center border border-black/10 rounded cursor-pointer"
                    style={{ backgroundColor: todo.completed ? '#4caf50' : 'transparent' }}
                >
                    {todo.completed && "✔️"}
                </div>

                <input
                    type="text"
                    className={`border outline-none w-full bg-transparent rounded-lg 
                    ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"}
                    ${todo.completed ? "line-through" : ""}`}
                    value={todoText}
                    readOnly={!isTodoEditable}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setTodoText(e.target.value)}
                />

                <button
                    className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center 
                    bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
                    onClick={(e) => {
                        e.stopPropagation();
                        if (todo.completed) return;
                        if (isTodoEditable) {
                            editTodo();
                        } else setIsTodoEditable(prev => !prev);
                    }}
                    disabled={todo.completed}
                >
                    {isTodoEditable ? "📁" : "✏️"}
                </button>

                <button
                    className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center 
                    bg-gray-50 hover:bg-gray-100 shrink-0'
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteTodo(todo.id);
                    }}
                >
                    ❌
                </button>
            </div>

            {isTodoEditable ? (
                <input
                    type="datetime-local"
                    className="border border-black/10 rounded-lg px-2 py-1 w-fit ml-8 bg-transparent"
                    value={todoDeadline}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setTodoDeadline(e.target.value)}
                />
            ) : (
                todo.deadline && (
                    <div className='text-sm text-gray-700 ml-8'>
                        📅 Due: {new Date(todo.deadline).toLocaleString()}
                    </div>
                )
            )}

            {isOverdue && (
                <div className='text-sm text-red-600 ml-8'>
                    ⚠️ Deadline exceeded
                </div>
            )}
            {isPending && (
                <div className='text-sm text-orange-600 ml-8'>
                    ⏳ Pending
                </div>
            )}
        </div>
    )
}

export default TodoItem

function formatForInput(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
}
