const UnAuthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500 mb-4 select-none">
        401
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
        You Are Unauthorized to this page. Login to continue
      </h1>

      <a
        href="/"
        className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-lg shadow-lg hover:from-pink-500 hover:to-blue-500 transition-all font-semibold">
        Login
      </a>
    </div>
  );
};

export default UnAuthorized;
