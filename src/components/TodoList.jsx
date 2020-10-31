import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectTodo } from '../slices/selectors'
import {
  addTodo,
  editTodo,
  deleteTodo,
  clearCompletedTodos,
  changeShowTodos,
} from '../slices/todo'

import { Todo } from './Todo'
import { generateId } from '../utils'

export const TodoList = () => {
  const dispatch = useDispatch()
  const { todos, showTodos } = useSelector(selectTodo)

  const [todoText, setTodoText] = useState('')
  const [editedTodoText, setEditedTodoText] = useState('')
  const [editId, setEditId] = useState(null)

  const handleChange = (e) => {
    const { value } = e.target
    !editId ? setTodoText(value) : setEditedTodoText(value)
  }

  const handleTodoSubmit = (e) => {
    e.preventDefault()

    const trimedText = todoText.trim()
    if (trimedText) {
      dispatch(
        addTodo({ id: generateId(todos), body: todoText, completed: false }),
      )
      setTodoText('')
    }
  }

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo(todoId))
  }

  const handleEditTodo = (todoId) => {
    setEditId(todoId)
  }

  const handleEditTodoSubmit = (e, todoId) => {
    e.preventDefault()

    const trimedText = editedTodoText.trim()

    if (trimedText) {
      dispatch(editTodo({ id: todoId, editedTodo: { body: trimedText } }))
      setEditId(null)
    }
  }

  const handleItems = (e) => {
    dispatch(changeShowTodos(e.target.textContent.toLowerCase()))
  }

  const handleTodoCompleted = (e, todoId) => {
    dispatch(
      editTodo({ id: todoId, editedTodo: { completed: e.target.checked } }),
    )
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

  return (
    <div className="todos">
      <h1>todos</h1>

      <div className="todos-body">
        <form onSubmit={handleTodoSubmit}>
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
                handleEditTodoSubmit={handleEditTodoSubmit}
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
                  <button onClick={() => dispatch(clearCompletedTodos())}>
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
