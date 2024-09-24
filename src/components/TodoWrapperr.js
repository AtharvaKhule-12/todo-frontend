import React, {useState, useEffect} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import axios from 'axios';
uuidv4();

export const TodoWrapperr = ({onLogout}) => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const fetchTodos = async () => {
            let response;
            try {
             response = await axios.get('http://localhost:3000/todos', {
                    withCredentials: true // This allows cookies to be sent with the request
                });
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
            const fetchedTodos = response.data.map(todo => ({
                id: todo.id,
                task: todo.title,
                completed: todo.completed,
                isEditing: false
            }));
            setTodos(fetchedTodos);
        };
    
        fetchTodos();
    }, []);

    const addTodo = async todo => {
        try {
            const response = await axios.post('http://localhost:3000/todos', {title: todo}, {
                withCredentials: true // This allows cookies to be sent with the request
            });
            const newTodos = [...todos, {id: response.data.id, task: response.data.title, completed: response.data.completed, isEditing: false}];
            setTodos(newTodos);
        } catch (error) {
            console.error(error);
        }
    }

    const toggleComplete = async id => {
        const todoToUpdate = todos.find(todo => todo.id === id);
        if (!todoToUpdate) return;

        try {
            const response = await axios.put(`http://localhost:3000/todos/${id}`, {
                completed: !todoToUpdate.completed
            }, {
                withCredentials: true // Include credentials (cookies) with the request
            });
            setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? {...todo, completed: response.data.completed} : todo));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    const deleteTodo = async id => {
        try {
            await axios.delete(`http://localhost:3000/todos/${id}`, {
                withCredentials: true // Include credentials (cookies) with the request
            });
            const newTodos = todos.filter(todo => todo.id !== id);
            setTodos(newTodos);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = async(task, id) => {
        try {
            await axios.put(`http://localhost:3000/todos/${id}`, {
                title: task,
            }, {
                withCredentials: true // Include credentials (cookies) with the request
            });
            const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
            setTodos(newTodos);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }
  return (
    <div className='TodoWrapper'>
        <h1>Get Things Done!</h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
                <Todo task={todo} key={todo.id} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
            )
        ))}
        <button className="todo-btn" onClick={onLogout}>Logout</button>
    </div>
  )
}
