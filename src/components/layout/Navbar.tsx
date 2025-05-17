import React from "react";

const Navbar = () => {
  return (
    <div className="bg-slate-300 dark:bg-slate-800">
      <nav className="flex justify-between items-center p-4">
        <div className="text-white text-2xl font-bold">SpellCMS</div>
        <ul className="flex space-x-4">
          <li className="text-white hover:text-gray-300">Home</li>
          <li className="text-white hover:text-gray-300">About</li>
          <li className="text-white hover:text-gray-300">Contact</li>
        </ul>
        <button className="bg-white text-black px-4 py-2 rounded">
          Toggle Dark Mode
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
