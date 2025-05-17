import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/layout/Navbar";
// import BlogCard from "./components/ui/BlogCard";
import BlogPage from "./pages/BlogPage";
import NotFound from "./components/404";
import Login from "./components/Login";
import AddAuthor from "./components/AddAuthor";
import AddBlog from "./components/AddBlog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/author" element={<AddAuthor />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
