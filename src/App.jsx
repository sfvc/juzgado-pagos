import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Error from './pages/404'
import Layout from './assets/layout/Layout'

function App () {
  return (

    <Routes>
      {/* Rutas envueltas por el Layout */}
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
      </Route>

      {/* Rutas fuera del Layout */}
      <Route path='*' element={<Navigate to='/404' />} />
      <Route path='/404' element={<Error />} />
    </Routes>
  )
}

export default App
