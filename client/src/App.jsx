import './App.css'
import Home from '../components/Home/Home';
import { Routes, Route } from "react-router-dom";
import PostDetail from '../components/PostDetail/PostDetail';
import Create from '../components/Create/Create';
import CreateCategory from '../components/Create/CreateCategory';
import Login from '../components/Login/Register/Login';
import Register from '../components/Login/Register/Register';
import Profile from '../components/Profile/Profile';

function App() {
  return (

    <div className="App">
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path='/post/:id' element={<PostDetail/>} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/create" element={<Create />} />
      <Route path="/createcategory" element={<CreateCategory />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />



    </Routes>
    </div>

  )
}

export default App
