import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FileUploadPage } from "./routes/Routes.js";


function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<FileUploadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
