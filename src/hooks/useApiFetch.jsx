import { useAppStore } from "@/zustand";

const useApiFetch = () => {
  const { logout } = useAppStore();
  const URL_BASE = import.meta.env.VITE_API_URL;

  const fetchData = async ({ url, options = {} }) => {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    const res = await fetch(URL_BASE + url, {
      ...options,
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers,
      credentials: "include",
    });

    if (res.status === 401) logout();

    const data = await res.json();
    if (!res.ok) throw data;

    return data;
  };

  return { fetchData };
};

export default useApiFetch;
