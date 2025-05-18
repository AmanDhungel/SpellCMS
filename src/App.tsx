import { Route, Routes, useNavigate } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import NotFound from "./components/404";
import Login from "./components/Login";
import AddAuthor from "./components/AddAuthor";
import AddBlog from "./components/AddBlog";
import Navbar from "./components/layout/Navbar";
import Category from "./components/Category";

import useAuthStore from "./stores/authStore";
import UnAuthorized from "./components/UnAuthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";

function App() {
  console.log("useAuthStore.getState().token", useAuthStore.getState().token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!useAuthStore.getState().token) {
      useAuthStore.getState().logout();
      navigate("/");
    }
  }, []);
  return (
    <>
      {useAuthStore.getState().token ? <Navbar /> : ""}
      <Routes>
        <Route path="/unAuthorized" element={<UnAuthorized />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <BlogPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-blog"
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/author"
          element={
            <ProtectedRoute>
              <AddAuthor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
