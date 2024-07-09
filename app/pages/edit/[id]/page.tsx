"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function EditPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({ term: "", interpretation: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/Interpretations/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Interpretations");
        }

        const data = await response.json();
        setFormData({
          term: data.interpretation.term,
          interpretation: data.interpretation.Interpretations,
        });
      } catch (error) {
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, [params.id]);

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

      const response = await fetch(`/api/Interpretations/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update interpretation");
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
      <h2 className="text-2xl font-bold my-8">Edit Note</h2>
      {error && (
        <p className="text-red-500 mb-4 bg-red-200 rounded-md p-2">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input
          type="text"
          name="term"
          placeholder="Term"
          value={formData.term}
          onChange={handleInputChange}
          className="py-1 px-4 border rounded-md"
        />
        <textarea
          name="interpretation"
          placeholder="Interpretation"
          value={formData.interpretation}
          onChange={handleInputChange}
          className="py-4 px-4 border rounded-md resize-none"
          rows={4}
        />
        <button
          className="py-2 px-4 bg-green-600 text-white rounded-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Now"}
        </button>
      </form>
    </div>
  );
}
