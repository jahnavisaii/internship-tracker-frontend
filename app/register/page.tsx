"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
 
export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    regNo: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async () => {
    setError("");
 
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword || !form.regNo) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
 
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          password: form.password,
          regNo: form.regNo,
        }),
      });
 
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || data.message || "Registration failed. Please try again.");
      } else {
        router.push("/login");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };
 
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-2/5 bg-blue-700 flex-col justify-between p-10 text-white">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Join thousands of students</h1>
          <p className="text-blue-200 text-sm leading-relaxed">
            Track every application, prep for interviews, and land your dream role — all in one place.
          </p>
          <div className="mt-8 space-y-4">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-semibold">500+</p>
              <p className="text-blue-200 text-xs mt-1">Active students</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-semibold">12k+</p>
              <p className="text-blue-200 text-xs mt-1">Applications tracked</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-semibold">3x</p>
              <p className="text-2xl font-semibold">3x</p>
              <p className="text-blue-200 text-xs mt-1">More offers on average</p>
            </div>
          </div>
        </div>
        <p className="text-blue-300 text-sm">Free to start. No credit card required.</p>
      </div>
 
      <div className="flex flex-1 flex-col justify-center px-8 py-12 bg-white">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Create your account</h2>
          <p className="text-sm text-gray-500 mb-6">Get started in under a minute</p>
 
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
 
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">First name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Jane" className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Last name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Doe" className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
 
          <div className="mb-4">
            <label className="block text-xs text-gray-600 mb-1">Registration number</label>
            <input name="regNo" value={form.regNo} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="e.g. RA2111003010234" className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>
 
          <div className="mb-4">
            <label className="block text-xs text-gray-600 mb-1">Email address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="jane@university.edu" className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>
 
          <div className="mb-4">
            <label className="block text-xs text-gray-600 mb-1">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Min. 8 characters" className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>
 
          <div className="mb-5">
            <label className="block text-xs text-gray-600 mb-1">Confirm password</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Repeat your password" className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>
 
          <button onClick={handleSubmit} disabled={loading} className="w-full h-10 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60">
            {loading ? "Creating account..." : "Create account"}
          </button>
 
          <p className="text-center text-xs text-gray-400 mt-3 leading-relaxed">
            By signing up, you agree to our <a href="/terms" className="underline hover:text-gray-600">Terms of Service</a> and <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>.
          </p>
 
          <div className="my-4 text-center text-xs text-gray-400">— or —</div>
 
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
