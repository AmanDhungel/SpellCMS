import React from "react";
import Button from "./ui/Button";

const Login = () => {
  return (
    <div>
      <form action="">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-sm p-8 bg-white rounded shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
              Login
            </h2>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="username">
                Username
              </label>
              <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit">Login</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
