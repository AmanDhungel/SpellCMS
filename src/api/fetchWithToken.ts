import useAuthStore from "../stores/authStore";

const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  const token = useAuthStore.getState().token;

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { ...options, headers });
  return response.json();
};

export default fetchWithToken;
