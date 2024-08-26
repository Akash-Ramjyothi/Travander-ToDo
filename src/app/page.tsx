"use client";

import Image from "next/image";
import axios from 'axios';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useState } from "react";
import { todo } from "node:test";

interface OwnerType{
  acatar_url: string;
}

interface ItemType{
  name: string;
  full_name: string;
  owner: OwnerType;
}

interface DataType {
  totalCount: number;
  items:ItemType[];
}

interface TodoItem {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');

  const addTodo = () => {
    if(!name.trim()){
      setError('Name is required');
      return;
    }

    if(name.length > 255){
      setError('Name must not exceed 255 characters');
      return;
    }

    if(todos.some(todo => todo.name === name.trim())){
      setError('Name must be unique');
      return;
    }

    if(description.length > 255){
      setError('Description must not exceed 255 characters');
      return;
    }

    // Add new todo
    const newTodo: TodoItem = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
    };

    setTodos([...todos, newTodo]);
    setName('')
    setDescription('');
    setError('');
  };

  const deleteTodo = (id: number) => {
    alert('Do you want to Delete?')
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1> Todo List</h1>
      <div>
        <label>
          Name: <br />
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          ></input>
        </label>
      </div>
      <div>
        <label>
          DescriptionL <br />
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            maxLength={255}
          ></textarea>
        </label>
      </div>
      <div>
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {error && <p>{error}</p>}

      <h2>Todo Items</h2>
      {todos.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id} >
              <strong>{todo.name}</strong><br />
              {todo.description && <small>{todo.description}</small>}
              <br />
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
