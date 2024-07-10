"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FaCircleChevronLeft } from "react-icons/fa6";

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
        Interpretations: formData.interpretation,
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
    <div className="bg-slate-100 p-3 rounded-lg">
       <div className="flex items-center justify-between mb-4">
        <Link
          className="text-blue-500 bg-blue-200 py-2 px-4 rounded-md"
          href={"/"}
        >
          <FaCircleChevronLeft size={24} />
        </Link>
        <h2 className="text-lg md:text-2xl font-bold md:my-8 my-4">
          Update Page
        </h2>
      </div>
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
          className="py-1 md:px-4 px-2 border rounded-md text-base md:text-lg"
        />
        <textarea
          name="interpretation"
          placeholder="Interpretation"
          value={formData.interpretation}
          onChange={handleInputChange}
          className="md:py-4 py-2 px-4 border rounded-md resize-none text-base md:text-lg"
          rows={4}
        />
        <button
          className="py-2 px-4 bg-green-600 text-white rounded-md text-base md:text-lg"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Now"}
        </button>
      </form>
    </div>
  );
}
