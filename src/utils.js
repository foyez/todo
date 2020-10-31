export const generateId = (todos) => {
  const todoIds = todos.map((todo) => todo.id)
  return todoIds.length > 0 ? Math.max(...todoIds) + 1 : 1
}
