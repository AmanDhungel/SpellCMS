// components/Login.tsx
import { useForm } from "react-hook-form";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const onSubmit = async (formData: LoginFormInputs) => {
    try {
      const res = await axios.get<LoginFormInputs[]>(
        "http://localhost:3000/users",
        {
          params: {
            username: formData.username,
            password: formData.password,
          },
        }
      );

      const user = res.data[0];

      if (user) {
        const token = btoa(`${user.username}:${user.password}`);
        setToken(token);
        navigate("/blog");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Login
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            {...register("username", { required: true })}
            type="text"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.username && <span className="text-red-500">Required</span>}
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && <span className="text-red-500">Required</span>}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
