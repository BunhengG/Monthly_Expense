"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function CreatePage() {
  const [formData, setFormData] = useState({ term: "", interpretation: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };


  //! Function to submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.term || !formData.interpretation) {
      setError("Please fill in all the fields");
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      const data = {
        term: formData.term,
        Interpretations: formData.interpretation, // Adjust to match backend expectations
      };
  
      const response = await fetch("/api/Interpretations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create interpretation");
      }
  
      router.push("/");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Add New Note</h2>
      {error && (
        <p className="text-red-500 mb-4 bg-red-200 rounded-md p-2">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input
          type="text"
          name="term"
          placeholder="Term"
          value={formData.term}
          className="py-1 px-4 border rounded-md"
          onChange={handleInputChange}
        />
        <textarea
          name="interpretation"
          placeholder="Interpretation"
          value={formData.interpretation}
          className="py-4 px-4 border rounded-md resize-none"
          rows={4}
          onChange={handleInputChange}
        />
        <button
          className="py-2 px-4 bg-green-600 text-white rounded-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Now"}
        </button>
      </form>
    </div>
  );
}
