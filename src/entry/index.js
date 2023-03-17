import React from 'react'
import ReactDOM from 'react-dom'

import RouterConfig from './router'

const Root = () => {
  return (
    <RouterConfig />
  )
}
ReactDOM.render(<Root />, document.getElementById('root'))
