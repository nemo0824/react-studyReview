
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {

  return (
    <>
    
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route></Route>
    </Routes>
  </BrowserRouter>
    
    </>
  )
}

export default App;
