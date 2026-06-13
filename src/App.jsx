import { useState } from 'react'
import Login from './pages/login'
import './App.css'
import Cadastro from './pages/cadastro/index.jsx'
import { Rotas } from './routes.jsx'


function App() {
  const [count, setCount] = useState(0)
  return (
    <Rotas></Rotas>
  )
}
export default App
