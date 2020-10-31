import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  todos: [],
  showTodos: 'all',
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos = [...state.todos, payload]
    },
    editTodo: (state, { payload }) => {
      state.todos = state.todos.map((todo) =>
        todo.id === payload.id ? { ...todo, ...payload.editedTodo } : todo,
      )
    },
    deleteTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload)
    },
    clearCompletedTodos: (state) => {
      state.todos = state.todos.filter((item) => !item.completed)
    },
    changeShowTodos: (state, { payload }) => {
      state.showTodos = payload
    },
  },
})

export const {
  addTodo,
  editTodo,
  deleteTodo,
  clearCompletedTodos,
  changeShowTodos,
} = todoSlice.actions
export const todoReducer = todoSlice.reducer
