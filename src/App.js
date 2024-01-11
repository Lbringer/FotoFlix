import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Photos from "./components/Photos/Photos";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  const handleSearch = (e, searchQuery) => {
    e.preventDefault();
    setQuery(searchQuery);
  };
  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Photos searchQuery={query} />} />
        <Route path="/fav" element={<Photos searchQuery={query} />} />
      </Routes>
    </>
  );
}

export default App;
