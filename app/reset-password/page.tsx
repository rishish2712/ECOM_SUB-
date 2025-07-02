"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Autofill email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail");
    if (storedEmail) setEmail(storedEmail);

    // Check if user came back from verification
    if (searchParams.get("verified") === "true") {
      setIsVerified(true);
      toast.success("Email verified. You can now reset your password.");
    }
  }, [searchParams]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Password reset successfully!");
        router.push("/sign-in");
      } else {
        toast.error(data.message || "Failed to reset password.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyRedirect = () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    // Save email for verification page
    localStorage.setItem("signupEmail", email);
    router.push("/verify"); // redirect to /verify page
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-md">
      <h2 className="text-center text-2xl font-semibold mb-6">Reset Your Password</h2>

      <form onSubmit={handleResetPassword} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* New Password */}
        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />

        {/* Confirm Password */}
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />

        {/* Verify Button */}
        {!isVerified && (
          <button
            type="button"
            onClick={handleVerifyRedirect}
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
          >
            Verify Email
          </button>
        )}

        {/* Reset Password Button */}
        <button
          type="submit"
          disabled={!isVerified || isSubmitting}
          className={`w-full py-2 px-4 rounded-md transition ${isVerified
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
            }`}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
