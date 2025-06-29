import { createContext,useContext } from "react";

const TodoContext = createContext({
    todos:[
       { id:1,
        todo:"Learn React",
        Completed:false
       }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    togglecomplete: (id) => {}
});

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;