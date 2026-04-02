import { Outlet } from 'react-router'
import './assets/css/App.css'

function App() {
  

  return (
    <>
        <Outlet />
        <div className='InvisPlaceHolder'></div>
    </>
  )
}

export default App
