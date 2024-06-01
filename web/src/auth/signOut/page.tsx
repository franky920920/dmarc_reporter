"use client";
// Translate: not required
import { signOut } from "@/common/cognito";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    signOut();
    window.location.href = "/"; // Force client side to reload to clear session cache
  }, []);

  return <></>;
}
