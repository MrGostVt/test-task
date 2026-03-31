import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [pageId, setPage] = useState(0);

  const page = useMemo(() => {
    switch(pageId){
      default: 
        return 
    }
  }, [pageId])

  return (
    <>

    </>
  )
}

export default App
