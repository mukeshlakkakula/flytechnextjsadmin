"use client";

import { useState, useEffect } from "react";
import { account } from "./appwriteLoginConfig";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import logo from "../Images/flyyourtechlogo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await account.get();
        console.log("Already logged in:", response);
        Cookies.set("loginStatus", "loggedIn", { expires: 1 });
        setStatus("Already logged in");
        router.push("/ProductManagement");
      } catch (error) {
        console.log("Not logged in", error);
        setStatus("Not logged in. Please login.");
      }
    };

    checkLoginStatus();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      console.log("Admin logged in successfully");
      setStatus("Admin logged in successfully");
      Cookies.set("loginStatus", "loggedIn", { expires: 1 });
      router.push("/ProductManagement");
    } catch (err) {
      setError(`Login failed: ${err.message}`);
      setStatus(`Login failed: ${err.message}`);
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      console.log("Logged out successfully");
      Cookies.remove("loginStatus");
      setStatus("Logged out successfully");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
      setStatus(`Logout failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-400">
      <div className="w-1/2 bg-white shadow-lg rounded-lg px-6 py-10 space-y-6">
        <div className="flex flex-col items-center">
          <Image src={logo} alt="Logo" width={60} height={60} />
          <h1 className="text-2xl font-semibold text-blue-700 mt-3">
            FLY Your Tech
          </h1>
        </div>

        <p className="text-center text-gray-600">{status}</p>

        <form onSubmit={handleLogin} className="space-y-4 px-4 py-4">
          <div className="flex flex-col space-y-1">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Log in
          </button>
        </form>

        <div className="text-center text-gray-600">
          Want to logout?{" "}
          <span
            onClick={handleLogout}
            className="text-blue-500 hover:underline cursor-pointer font-medium"
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
