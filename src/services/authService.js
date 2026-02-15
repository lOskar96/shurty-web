import { useAppStore } from "../zustand";
const URL = import.meta.env.VITE_API_URL;

export async function register(username, email, password) {
  const res = await fetch(`${URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Credenciales inválidas");

  const data = await res.json();

  useAppStore.getState().setUser({
    username: data.username,
    email: data.email,
  });

  return data;
}

export async function login(email, password) {
  const res = await fetch(`${URL}/auth/login`, {
    method: "POST",
    credentials: "include", // cookies!
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");

  const data = await res.json();

  useAppStore.getState().setUser({
    username: data.username,
    email: data.email,
  });

  return data;
}

export async function logout() {
  await fetch(`${URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  useAppStore.getState().setUser(null);
}

export async function refreshUser() {
  const res = await fetch(`${URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("No autenticado");

  const data = await res.json();

  useAppStore.getState().setUser({
    username: data.username,
    email: data.email,
  });

  return data;
}
