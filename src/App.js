import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Photos from "./components/Photos/Photos";
import Fav from "./components/Fav/Fav";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Photos />} />
        <Route path="/fav" element={<Fav />} />
      </Routes>
    </>
  );
}

export default App;
