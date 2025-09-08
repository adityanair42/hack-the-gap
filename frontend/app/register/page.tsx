"use client"

import axios, { AxiosError } from "axios";
import { useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
const BACKEND_URL = "http://192.168.137.1:1234"; 

export default function SignUp() {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function signup(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current || !emailRef.current || !passwordRef.current) {
        alert("An unexpected error occurred. Please try again.");
        return;
    }

    try { 
      const nameValue = nameRef.current.value.trim();
      const emailValue = emailRef.current.value.trim();
      const passwordValue = passwordRef.current.value.trim();
      
      await axios.post(`${BACKEND_URL}/register`, {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      });
      
      alert("Registration successful! Please log in.");
      router.push("/login");

    } catch (err) {
      console.error("Registration failed:", err);
      
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 409) {
          alert("Registration failed: A user with this email already exists.");
        } else {
          alert(`Registration failed: Server responded with status ${error.response.status}.`);
        }
      } else if (error.request) {
        alert("Registration failed: No response from server.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative flex justify-center items-center h-111 w-71 rounded-xl bg-white bg-gradient-to-r from-orange-500 to-red-800">
        <form onSubmit={signup} className="flex flex-col items-center rounded-xl h-110 w-70 bg-black">
          <div className="text-3xl text-neutral-300 mt-13 mb-17 font-medium">
            Sign Up
          </div>
          
          <input 
            ref={nameRef}
            type="text" 
            placeholder="name" 
            className="py-2 border rounded-md px-2 my-2 bg-neutral-800"
            required 
          />
          <input 
            ref={emailRef}
            type="email" 
            placeholder="email" 
            className="py-2 border rounded-md px-2 my-2 bg-neutral-800"
            required 
          />
          <input 
            ref={passwordRef}
            type="password" 
            placeholder="password" 
            className="py-2 border rounded-md px-2 my-2 bg-neutral-800"
            required
          />

          <button type="submit" className="mt-17 px-21 rounded-md py-2 bg-gradient-to-r from-orange-500 to-red-800">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}