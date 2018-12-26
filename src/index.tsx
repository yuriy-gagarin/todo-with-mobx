import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import DevTools from 'mobx-react-devtools'

import todoStore from './todoStore'
import TodoApp from './TodoApp'

import './index.scss'

(window as any).todoStore = todoStore

const Root = () => (
  <Provider todoStore={todoStore}>
    <TodoApp />
  </Provider>
)

ReactDOM.render(
  <Root />, 
  document.getElementById('root')
);
