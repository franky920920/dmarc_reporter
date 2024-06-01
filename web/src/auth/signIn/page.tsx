"use client";
// Translate: not required
import { useCredentials } from "@/hooks/useCredentials";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const router = useRouter();
  const { credentials } = useCredentials();

  useEffect(() => {
    if (credentials) router.push("/dashboard");
    else router.push("/");
  }, [credentials, router]);

  return <></>;
}
