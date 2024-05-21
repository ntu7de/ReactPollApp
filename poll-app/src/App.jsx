import { useState } from 'react'
import Poll from './components/Poll'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Poll />
    </>
  )
}

export default App
