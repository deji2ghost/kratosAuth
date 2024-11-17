"use client"

import Button from "@/components/ui/Button/button";
import Input from "@/components/ui/input2/input";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {

  // Example login API request in Next.js
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("form event:", payload);
  };
  return (
    <>
    <h1>you are loggd in</h1>
    </>
  );
}
