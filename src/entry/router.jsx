import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Index'

const RouterConfig = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </HashRouter>
  )
}

export default RouterConfig
