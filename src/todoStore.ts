import { observable, computed, action } from 'mobx'
import { Todo } from './types'
import v4 from 'uuid/v4'
import { throttle } from 'lodash'

const localData = JSON.parse(localStorage.getItem('todos') || '[]')
const localFilter = localStorage.getItem('filter') || 'all'

export class todoStore {
  @observable private allTodos : Todo[] = [...localData]

  @observable private filter : string = localFilter

  _saveToLocalStorage () {
    localStorage.setItem('todos', JSON.stringify(this.allTodos))
    localStorage.setItem('filter', this.filter)
  }

  saveToLocalStorage = throttle(this._saveToLocalStorage, 500)

  @action addTodo (text : string) {
    const id = v4()
    this.allTodos.push({
      id, text, completed: false
    })
    this.saveToLocalStorage()
  }

  @action toggleTodo (id : string) {
    const todo = this.allTodos.find(todo => todo.id === id)
    if (todo) todo.completed = !todo.completed
    this.saveToLocalStorage()
  }

  @action removeTodo (id : string) {
    this.allTodos = this.allTodos.filter(todo => todo.id !== id)
    this.saveToLocalStorage()
  }

  @action setFilter (filter : string) {
    this.filter = filter
    this.saveToLocalStorage()
  }

  @computed get activeTodos () {
    return this.allTodos.filter(todo => !todo.completed)
  }

  @computed get completedTodos () {
    return this.allTodos.filter(todo => todo.completed)
  }

  @computed get todos () {
    switch (this.filter) {
      case 'all': return this.allTodos
      case 'active': return this.activeTodos
      case 'completed': return this.completedTodos
      default: return this.allTodos
    }
  }
}

export default new todoStore()
