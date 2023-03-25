import "./styles/style.css";
import "./styles/media.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/create" element={<CreatePost />}></Route>
            <Route path="/post/:postId" element={<PostPage />}></Route>
            <Route path="/edit/:postId" element={<EditPost />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
