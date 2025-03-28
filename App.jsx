import './App.css'
import { Route, Routes } from 'react-router';
import SignUp from './component/SignUp';
import Login from './component/Login';
import Page from './component/Page';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/page' element={<Page />} />
      </Routes>

    </>
  )
}

export default App
