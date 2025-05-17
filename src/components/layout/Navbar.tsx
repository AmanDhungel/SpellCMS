const Navbar = () => {
  return (
    <div className="bg-slate-500">
      <nav className="flex justify-between items-center p-4">
        <div className="text-white text-2xl font-bold">SpellCMS</div>
        <ul className="flex space-x-4">
          <li className="text-white hover:text-gray-300">Home</li>
          <li className="text-white hover:text-gray-300">About</li>
          <li className="text-white hover:text-gray-300">Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
