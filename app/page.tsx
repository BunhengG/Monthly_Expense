"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface IInterpretations {
  $id: string;
  term: string;
  Interpretations: string;
}

export default function Home() {
  // create states
  const [interpretation, setInterpretation] = useState<IInterpretations[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataFetched, setDataFetched] = useState(false); // New state to track if data has been fetched

  useEffect(() => {
    const fetchInterpretations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/Interpretations/");
        if (!response.ok) {
          throw new Error("Failed to fetch interpretations");
        }
        const data: IInterpretations[] = await response.json();
        setInterpretation(data);
        setDataFetched(true); // Set dataFetched to true after fetching
      } catch (error: any) {
        console.error("Failed to fetch interpretations:", error.message);
        setError("Failed to load interpretations. Please try to reload the page.");
        setDataFetched(true); // Set dataFetched to true even if there's an error
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterpretations();
  }, []);

  //! Delete Data
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/Interpretations/${id}`, { method: "DELETE" });
      setInterpretation((prevInterpretation) =>
        prevInterpretation?.filter((i) => i.$id !== id)
      );
    } catch (error) {
      setError("Failed to delete interpretation. Please try again.");
    }
  };

  return (
    <div className="h-screen">
      {error && <p className="py-4 text-red-500">{error}</p>}

      {isLoading ? (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      ) : dataFetched && interpretation.length === 0 ? (
        <p>No interpretations found!</p>
      ) : (
        <div>
          {interpretation.map((item) => (
            <div
              key={item.$id}
              className="p-4 rounded-md border-t leading-8 bg-slate-50"
            >
              <h1 className="font-bold">{item.term}</h1>
              <div>
                <p>{item.Interpretations}</p>
              </div>
              <div className="mt-4 flex gap-4 justify-end items-center">
                <Link
                  href={`/pages/edit/${item.$id}`}
                  className="text-sm text-slate-500 bg-slate-300 px-4 py-2 rounded-md uppercase font-bold tracking-widest"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.$id)}
                  className="text-sm text-red-500 bg-red-300 px-4 py-2 rounded-md uppercase font-bold tracking-widest"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
