"use client"

import axios, { AxiosError } from "axios";
import { useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  // const router = useRouter();
  // const usernameRef = useRef<HTMLInputElement | null>(null);
  // const passwordRef = useRef<HTMLInputElement | null>(null);

  // async function login(event: FormEvent) {
  //   event.preventDefault();

  //   if (!usernameRef.current || !passwordRef.current) {
  //   	  alert("An unexpected error occurred. Please try again.");
  //   	  return;
  //   }

  //   try { 
  //   	localStorage.removeItem("token");
  //   	localStorage.removeItem("name");

  //   	const nameValue = usernameRef.current.value.trim();
  //   	const passwordValue = passwordRef.current.value.trim();

  //   	const response = await axios.post(`${BACKEND_URL}/signin`, {
  //   	  name: nameValue,
  //   	  password: passwordValue,
  //   	});

  //   	if (response.data.token) {
  //   	  localStorage.setItem("token", response.data.token);
  //   	  localStorage.setItem("name", nameValue); 
  //   	  router.push("/");
  //   	} else {
  //   	  alert("Login failed: No token received.");
  //   	}

  //   } catch (err) {
  //   	console.error("Login failed:", err);

  //   	const error = err as AxiosError;
  //   	if (error.response) {
  //   	  if (error.response.status === 403) {
  //   	    alert("Login failed: Invalid username or password.");
  //   	  } else {
  //   	    alert(`Login failed: Server responded with status ${error.response.status}.`);
  //   	  }
  //   	} else if (error.request) {
  //   	  alert("Login failed: No response from server.");
  //   	} else {
  //   	  alert("An unexpected error occurred.");
  //   	}
  //   }
  // }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100"> {/* Added a light background to the body */}
      <div className="relative flex justify-center items-center h-111 w-71 rounded-xl bg-white shadow-lg"> {/* Changed outer div to white with shadow */}
        <form 
        // onSubmit={login} 
        className="flex flex-col items-center rounded-xl h-110 w-70 bg-white p-6"> {/* Changed form to white */}
          <div className="text-3xl text-black mt-13 mb-17 font-medium"> {/* Text is black */}
            Log In
          </div>

          <input 
            // ref={usernameRef}
            type="text" 
            placeholder="name" 
            className="py-2 border rounded-md px-2 my-2 bg-gray-200 text-black placeholder-gray-500" // Light input background, black text, grey placeholder
            required 
          />
          <input 
            // ref={passwordRef}
            type="password" 
            placeholder="password" 
            className="py-2 border rounded-md px-2 my-2 bg-gray-200 text-black placeholder-gray-500" // Light input background, black text, grey placeholder
            required
          />

          <button type="submit" className="mt-17 px-21 rounded-md py-2 bg-[#004AAD] text-white"> {/* Blue button with white text */}
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}