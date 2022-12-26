import TopBar from "./Components/TopBar/TopBar";
import Header from "./Components/Header/Header"
import Home from "./Pages/Home/Home";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write";
import Setting from "./Pages/Setting/Setting";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "./Context/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <>
      <BrowserRouter>
      <TopBar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={user ? <Home/>:<Login/>}/>
          <Route path="/register" element={user ? <Home/>:<Register/>}/>
          <Route path="/write" element={user ? <Write/>:<Register/>}/>
          <Route path="/setting" element={user ? <Setting/>:<Register/>}/>
          <Route path="/post/:postId" element={<Single/>}/>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
