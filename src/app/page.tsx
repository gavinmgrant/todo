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
  const [newTodo, setNewTodo] = useState<string>("");

  const handleClick = (id: string, checked: boolean) => {
    const newTodos = todos
      .map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked };
        }
        return todo;
      })
      .sort((a, b) => {
        return Number(a.checked) - Number(b.checked);
      });
    setTodos(newTodos);
  };

  const handleAddTodo = (task: string) => {
    if (!task) return;
    const newTodo = {
      id: uuidv4(),
      checked: false,
      task,
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setNewTodo("");
  };

  const handleClearTodos = () => {
    setTodos(initialState);
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
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative space-y-6 w-full sm:w-auto sm:min-w-[400px] mt-32">
        <ul className="space-y-3 w-full absolute bottom-32">
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

        <form
          onSubmit={() => handleAddTodo(newTodo)}
          className="flex items-center gap-4 w-full"
        >
          <input
            className="text-black p-2 rounded w-full"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            type="submit"
            className="shrink-0 p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed active:bg-gray-800"
            onClick={() => handleAddTodo(newTodo)}
            disabled={!newTodo}
          >
            Add todo
          </button>
        </form>
        <button
          className="p-2 border rounded active:bg-gray-800"
          onClick={handleClearTodos}
        >
          Clear list
        </button>
      </div>
    </div>
  );
}
