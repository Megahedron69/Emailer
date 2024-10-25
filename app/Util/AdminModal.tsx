"use client";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminKeyModal = ({ onSuccess }: { onSuccess: () => void }) => {
  const [adminKey, setAdminKey] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/verifyKey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminKey }),
    });

    // const data = await res.json();
    if (res.ok) {
      onSuccess();
      toast.success("Key matched");
    } else {
      setError("Invalid key, please try again.");
      toast.error("error");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg drop-shadow-lg font-medium">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="block text-white text-3xl mb-2 ">Enter Admin Key</h2>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Enter your admin key"
            className="w-full p-3 bg-gray-700 rounded-lg text-white"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-400 to-[#ff6f61] rounded-lg shadow-lg hover:from-red-500 hover:to-pink-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminKeyModal;
