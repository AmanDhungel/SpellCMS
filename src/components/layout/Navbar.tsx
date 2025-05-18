import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="bg-slate-500">
      <nav className="flex justify-between items-center p-4">
        <div className="text-white text-2xl font-bold">SpellCMS</div>
        <ul className="flex space-x-4 items-center">
          <a href="/blog" className="text-white hover:text-gray-300">
            Blog
          </a>
          <Link to="/author" className="text-white hover:text-gray-300">
            Author
          </Link>
          <Link to="/category" className="text-white hover:text-gray-300">
            Category
          </Link>
          <button
            onClick={handleLogout}
            className="cursor-pointer text-white hover:text-gray-300">
            Logout
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
