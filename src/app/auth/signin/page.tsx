"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< Updated upstream
    console.log("Sign in submitted:", formData);
    // Handle sign-in logic here
=======
    setError(null);
    setLoading(true);

    try {
      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/login";
      const payload = isSignUp
        ? { email: formData.email, password: formData.password, name: formData.name, phone: formData.phone, role: "patient" }
        : { email: formData.email, password: formData.password };

      const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Save token and user info
      localStorage.setItem("auth_token", data.token);
      const detectedRole = data.data?.role || "patient";
      localStorage.setItem("user_role", detectedRole);
      localStorage.setItem("user_data", JSON.stringify(data.data));

      // Redirect to specified URL or based on detected role
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (detectedRole === "admin") {
        router.push("/adminstration/admin");
      } else if (detectedRole === "doctor") {
        router.push("/adminstration/doctor");
      } else {
        router.push("/get-started");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
>>>>>>> Stashed changes
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="">
        <img
          src="/doctor.jpg"
          alt="a doctor "
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-xl mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-(--color-text-primary) mb-4">
              Welcome to Virtuwell!
            </h1>
            <div className="text-base text-(--color-text-secondary) space-y-1">
              <p>
                New here?{" "}
                <Link
                  href="/registration/signup"
                  className="text-(--color-purple-primary) hover:text-(--color-purple-hover) font-semibold hover:underline"
                >
                  Create an account
                </Link>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <Link
                  href="/forgot-username"
                  className="text-(--color-purple-primary) hover:text-(--color-purple-hover) font-semibold hover:underline"
                >
                  Forgot username?
                </Link>
                <Link
                  href="/forgot-password"
                  className="text-(--color-purple-primary) hover:text-(--color-purple-hover) font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="sr-only">
                User Name
              </label>
              <input
                type="text"
                id="username"
                placeholder="User Name"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-4 border border-(--color-gray-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-purple-primary) focus:border-transparent transition-all placeholder:text-(--color-gray-text)"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-4 pr-12 border border-(--color-gray-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-purple-primary) focus:border-transparent transition-all placeholder:text-(--color-gray-text)"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-(--color-gray-text) hover:text-(--color-text-primary) transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-(--color-purple-primary) hover:bg-(--color-purple-hover) text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Sign in
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-(--color-gray-text)">
            Sign in with your Virtuwell or HealthPartners information.
          </div>
        </div>
      </div>
    </div>
  );
}
