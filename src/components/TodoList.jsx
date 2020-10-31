import React, { useState } from 'react'
import { Todo } from './Todo'

import { generateId } from '../utils'

export const TodoList = () => {
  const [todoText, setTodoText] = useState('')
  const [editedTodoText, setEditedTodoText] = useState('')
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(null)
  const [showTodos, setShowTodos] = useState('all')

  const handleChange = (e) => {
    const { value } = e.target
    !editId ? setTodoText(value) : setEditedTodoText(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimedText = todoText.trim()
    if (trimedText) {
      setTodos([
        ...todos,
        { id: generateId(todos), body: todoText, completed: false },
      ])
      setTodoText('')
    }
  }

  const completedItems = todos.reduce((total, item) => {
    if (item.completed) {
      total += 1
    }

    return total
  }, 0)

  const filteredTodos =
    showTodos === 'active'
      ? todos.filter((item) => !item.completed)
      : showTodos === 'completed'
      ? todos.filter((item) => item.completed)
      : todos

  const leftItems = todos.length - completedItems
  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((todo) => todo.id !== index)
    setTodos(newTodos)
  }

  const handleEditTodo = (index) => {
    setEditId(index)
  }

  const handleSubmitEditTodo = (e, index) => {
    e.preventDefault()

    const trimedText = editedTodoText.trim()

    const newTodos = todos.map((todo) =>
      todo.id === index ? { ...todo, body: trimedText } : todo,
    )

    if (trimedText) {
      setTodos(newTodos)
      setEditId(null)
    }
  }

  const handleItems = (e) => {
    setShowTodos(e.target.textContent.toLowerCase())
  }

  const handleClearCompletedTodos = () => {
    setTodos(todos.filter((item) => !item.completed))
  }

  const handleTodoCompleted = (e, todoId) => {
    setTodos(
      todos.map((item) =>
        item.id === todoId ? { ...item, completed: e.target.checked } : item,
      ),
    )
  }

  return (
    <div className="todos">
      <h1>todos</h1>

      <div className="todos-body">
        <form onSubmit={handleSubmit}>
          <input
            className="todo-input"
            onChange={handleChange}
            type="text"
            value={todoText}
            placeholder="What needs to be done?"
          />
        </form>
        {todos.length ? (
          <div>
            <hr />
            {filteredTodos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                editId={editId}
                handleChange={handleChange}
                handleEditTodo={handleEditTodo}
                handleTodoCompleted={handleTodoCompleted}
                handleDeleteTodo={handleDeleteTodo}
                handleSubmitEditTodo={handleSubmitEditTodo}
              />
            ))}
          </div>
        ) : null}
        {todos.length > 0 && (
          <>
            <hr />
            <div className="actions">
              <div className="action1">
                {leftItems} {leftItems <= 1 ? 'item' : 'items'} left
              </div>
              <div className="action2">
                <button
                  className={showTodos === 'all' ? 'active-btn' : null}
                  onClick={handleItems}
                >
                  All
                </button>
                <button
                  className={showTodos === 'active' ? 'active-btn' : null}
                  onClick={handleItems}
                >
                  Active
                </button>
                <button
                  className={showTodos === 'completed' ? 'active-btn' : null}
                  onClick={handleItems}
                >
                  Completed
                </button>
              </div>
              <div className="action3">
                {completedItems > 0 && (
                  <button onClick={handleClearCompletedTodos}>
                    Clear completed
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
