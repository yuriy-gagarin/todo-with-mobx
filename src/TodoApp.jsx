import React from 'react'
import { observer, inject } from 'mobx-react'

@inject('todoStore') @observer
class TodoApp extends React.Component {
  submit (event) {
    if (event.key !== 'Enter') return
    const text = event.target.value
    this.props.todoStore.addTodo(text)
    event.target.value = ''
  }

  toggle (id) {
    this.props.todoStore.toggleTodo(id)
  }

  remove (id) {
    this.props.todoStore.removeTodo(id)
  }

  setFilter (filter) {
    this.props.todoStore.setFilter(filter)
  }

  render () {
    const store = this.props.todoStore

    const filters = (
      <div className='Filters'>
        <button 
          onClick={(e) => this.setFilter('all')} 
          className={store.filter === 'all' ? 'active' : undefined}>All</button>
        <button 
          onClick={(e) => this.setFilter('active')}
          className={store.filter === 'active' ? 'active' : undefined}>Active</button>
        <button 
          onClick={(e) => this.setFilter('completed')}
          className={store.filter === 'completed' ? 'active' : undefined}>Completed</button>
      </div>
    )

    const todoForm = (
      <input className='Form' type='text' onKeyPress={(e) => this.submit(e)} />
    )

    const todoElements = store.todos.map(todo => (
      <div key={todo.id} 
        className={todo.completed ? 'Todo completed' : 'Todo'} 
        onClick={(e) => e.shiftKey ? this.remove(todo.id) : this.toggle(todo.id)}>
        <span>{todo.text}</span>
      </div>
    ))

    const noTodos = (
      <div className='Todo no-todos'>
        <span>There are no{store.filter !== 'all' ? ' ' + store.filter : ''} todos...</span>
      </div>
    )

    return (
      <div className='TodoApp'>
        {filters}
        {todoForm}
        {todoElements.length ? todoElements : noTodos}
      </div>
    )
  }
}

export default TodoApp
