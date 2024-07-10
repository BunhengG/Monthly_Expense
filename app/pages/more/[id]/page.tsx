"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { FaCircleChevronLeft } from "react-icons/fa6";
import Link from "next/link";

export default function ViewPage({ params }: { params: { id: string } }) {
  const [viewData, setViewData] = useState({ term: "", interpretation: "" });
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
        setViewData({
          term: data.interpretation.term,
          interpretation: data.interpretation.Interpretations,
        });
      } catch (error) {
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, [params.id]);

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
          View Page
        </h2>
      </div>

      <div className="flex gap-3 flex-col p-4">
        <div>
          <h2 className="md:text-lg text-base font-bold">{viewData.term}</h2>
        </div>
        <hr />
        <div className="mb-4">
          <p className="md:text-lg text-sm">{viewData.interpretation}</p>
        </div>
      </div>
      {error && (
        <p className="text-red-500 mb-4 bg-red-200 rounded-md p-2">{error}</p>
      )}
    </div>
  );
}
