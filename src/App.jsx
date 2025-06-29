
import { useEffect, useState } from 'react'
// import { useTodo } from './context'
import { TodoProvider } from './context/TodoContext.js'
import './App.css'
import { TodoForm, TodoItem } from './components/index.js';

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev)=>[{id:Date.now(),...todo},...prev]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) => 
      prev.map((prevTodo) => (prevTodo.id === updatedTodo.id ? updatedTodo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, Completed: !prevTodo.Completed } : prevTodo
      )
    );
  };

  // ... means spreading the object 


  // now we will use useEffect for localStorage
  useEffect(() => {
    // first we will bring data from localStorage
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    // next we need to set the state with the stored todos
    if(storedTodos.length > 0) {
      setTodos(storedTodos);
    }
    
  }, []);

  // we will use another useEffect hook to update localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
    
  )
}

export default App
