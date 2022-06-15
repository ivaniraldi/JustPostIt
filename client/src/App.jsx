import './App.css'
import Home from '../components/Home/Home';
PostDetail
import { Routes, Route, Router } from "react-router-dom";
import PostDetail from '../components/PostDetail/PostDetail';
import Create from '../components/Create/Create';

function App() {
  return (

    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/post/:id' element={<PostDetail/>} />
      <Route path="*" element={<Home />} />
      <Route path="/create" element={<Create />} />


    </Routes>
    </div>

  )
}

export default App
