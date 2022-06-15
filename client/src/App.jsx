import './App.css'
import Home from '../components/Home/Home';
PostDetail
import { Routes, Route, Router } from "react-router-dom";
import PostDetail from '../components/PostDetail/PostDetail';
import Create from '../components/Create/Create';
import CreateCategory from '../components/Create/CreateCategory';

function App() {
  return (

    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/post/:id' element={<PostDetail/>} />
      <Route path="*" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/createcategory" element={<CreateCategory />} />



    </Routes>
    </div>

  )
}

export default App
