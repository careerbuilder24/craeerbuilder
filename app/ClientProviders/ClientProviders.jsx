// app/ClientProviders.jsx
"use client";

import { AuthContextProvider } from "../context/AuthContext";

// import { AuthContextProvider } from ".";

export default function ClientProviders({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
