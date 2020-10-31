import React from 'react'

export const Todo = ({
  todo,
  editId,
  handleChange,
  handleEditTodo,
  handleTodoCompleted,
  handleDeleteTodo,
  handleSubmitEditTodo,
}) => (
  <div className="todo">
    {editId && editId === todo.id ? (
      <>
        <form onSubmit={(e) => handleSubmitEditTodo(e, todo.id)}>
          <input
            className="todo-edit-input"
            type="text"
            defaultValue={todo.body}
            onChange={handleChange}
          />
        </form>
      </>
    ) : (
      <div className="todo-box flex flex-jc-sb">
        <div>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => handleTodoCompleted(e, todo.id)}
            />
            <span className="checkmark"></span>
          </label>
          <span
            style={todo.completed ? { textDecoration: 'line-through' } : null}
            onClick={() => handleEditTodo(todo.id)}
          >
            {todo.body}
          </span>
        </div>
        <button
          className="todo-delete"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          x
        </button>
      </div>
    )}
  </div>
)
