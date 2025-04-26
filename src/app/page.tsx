"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ListItem from "@/components/ListItem";

export interface TodoItem {
  id: string;
  checked: boolean;
  task: string;
}

export default function TodoList() {
  const initialState = [
    {
      id: uuidv4(),
      checked: false,
      task: "Write my todos",
    },
  ];
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoTask, setNewTodoTask] = useState<string>("");

  const handleClick = (id: string, checked: boolean) => {
    const newTodos = todos
      .map((todo) => (todo.id === id ? { ...todo, checked } : todo))
      .sort((a, b) => Number(a.checked) - Number(b.checked));
    setTodos(newTodos);
  };

  const handleAddTodo = (task: string) => {
    if (!task) return;
    const newTodo = {
      id: uuidv4(),
      checked: false,
      task,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setNewTodoTask("");
  };

  const handleClearTodos = () => {
    setTodos(initialState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo(newTodoTask);
  };

  useEffect(() => {
    const localStorageTodos = localStorage.getItem("todos");
    if (localStorageTodos) {
      setTodos(JSON.parse(localStorageTodos));
    } else {
      setTodos(initialState);
    }
  }, []);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <div className="min-h-screen flex items-start justify-center p-4">
      <div className="space-y-6 w-full sm:w-auto sm:min-w-[400px] sm:mt-6">
        <h1 className="text-2xl font-semibold">Todo List</h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 w-full"
        >
          <input
            className="text-black p-2 rounded w-full bg-gray-50 border"
            type="text"
            placeholder="Walk the dog"
            value={newTodoTask}
            onChange={(e) => setNewTodoTask(e.target.value)}
          />
          <button
            type="submit"
            className="shrink-0 p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed active:bg-gray-100"
            disabled={!newTodoTask}
          >
            Add todo
          </button>
        </form>
        <button
          className="p-2 border rounded active:bg-gray-100"
          onClick={handleClearTodos}
        >
          Clear list
        </button>

        <ul className="space-y-3 w-full">
          {todos.map((todo) => {
            return (
              <ListItem
                key={todo.id}
                todoItem={todo}
                onClick={() => handleClick(todo.id, !todo.checked)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
