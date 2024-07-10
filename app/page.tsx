//!=====================
// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import ConfirmationDialog from "./components/ConfirmationDialog"; // Adjust path as per your structure

// interface IInterpretations {
//   $id: string;
//   term: string;
//   Interpretations: string;
// }

// export default function Home() {
//   // create states
//   const [interpretation, setInterpretation] = useState<IInterpretations[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [dataFetched, setDataFetched] = useState(false); // New state to track if data has been fetched
//   const [deleteId, setDeleteId] = useState<string | null>(null); // State to track which interpretation to delete

//   useEffect(() => {
//     const fetchInterpretations = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch("/api/Interpretations/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch interpretations");
//         }
//         const data: IInterpretations[] = await response.json();
//         setInterpretation(data);
//         setDataFetched(true); // Set dataFetched to true after fetching
//       } catch (error: any) {
//         console.error("Failed to fetch interpretations:", error.message);
//         setError(
//           "Failed to load interpretations. Please try to reload the page."
//         );
//         setDataFetched(true); // Set dataFetched to true even if there's an error
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchInterpretations();
//   }, []);

//   //! Delete Data
//   const handleDelete = async (id: string) => {
//     try {
//       await fetch(`/api/Interpretations/${id}`, { method: "DELETE" });
//       setInterpretation((prevInterpretation) =>
//         prevInterpretation?.filter((i) => i.$id !== id)
//       );
//     } catch (error) {
//       setError("Failed to delete interpretation. Please try again.");
//     } finally {
//       setDeleteId(null); // Close confirmation dialog after deletion
//     }
//   };

//   const openConfirmationDialog = (id: string) => {
//     setDeleteId(id);
//   };

//   const closeConfirmationDialog = () => {
//     setDeleteId(null);
//   };

//   return (
//     <div>
//       {error && <p className="py-4 text-red-500">{error}</p>}

//       {isLoading ? (
//         // Spinner
//         <div className="flex justify-center items-center">
//           <svg
//             className="animate-spin h-10 w-10 text-blue-500"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8v8z"
//             ></path>
//           </svg>
//         </div>
//       ) : dataFetched && interpretation.length === 0 ? (
//         <p>No interpretations found!</p>
//       ) : (
//         <div>
//           {interpretation.map((item) => (
//             <div
//               key={item.$id}
//               className="p-4 rounded-md border-t leading-8 bg-slate-50"
//             >
//               <h1 className="font-bold text-base lg:text-lg md:text-lg">
//                 {item.term}
//               </h1>
//               <div>
//                 <p className="text-sm lg:text-lg md:text-lg">
//                   {item.Interpretations}
//                 </p>
//               </div>
//               <div className="mt-2 flex gap-2 justify-end items-center md:mt-4 md:gap-4">
//                 <Link
//                   href={`/pages/edit/${item.$id}`}
//                   className="text-sm text-slate-500 bg-slate-300 px-2 py-1 rounded-md uppercase font-bold tracking-widest md:px-4 md:py-2"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => openConfirmationDialog(item.$id)}
//                   className="text-sm text-red-500 bg-red-300 px-2 py-1 rounded-md uppercase font-bold tracking-widest md:px-4 md:py-2"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <ConfirmationDialog
//         isOpen={deleteId !== null}
//         title="Confirm Deletion"
//         message="Are you sure you want to delete this interpretation?"
//         onConfirm={() => handleDelete(deleteId as string)}
//         onCancel={closeConfirmationDialog}
//       />
//     </div>
//   );
// }

//! =================
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "./components/ConfirmationDialog";
import { FaEye, FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";

interface IInterpretations {
  $id: string;
  term: string;
  Interpretations: string;
}

export default function Home() {
  const [interpretation, setInterpretation] = useState<IInterpretations[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const router = useRouter();

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
        setDataFetched(true);
      } catch (error: any) {
        console.error("Failed to fetch interpretations:", error.message);
        setError(
          "Failed to load interpretations. Please try to reload the page."
        );
        setDataFetched(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterpretations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/Interpretations/${id}`, { method: "DELETE" });
      setInterpretation((prevInterpretation) =>
        prevInterpretation.filter((i) => i.$id !== id)
      );
    } catch (error) {
      setError("Failed to delete interpretation. Please try again.");
    } finally {
      setDeleteId(null);
    }
  };

  const openConfirmationDialog = (id: string) => {
    setDeleteId(id);
  };

  const closeConfirmationDialog = () => {
    setDeleteId(null);
  };

  return (
    <div>
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
              className="flex justify-between p-4 rounded-md border-t leading-8 bg-slate-50"
            >
              {/* data  */}
              <div>
                <div>
                  <h1 className="font-bold text-base lg:text-lg md:text-lg">
                    {item.term}
                  </h1>
                </div>
                <div>
                  <p className="text-sm lg:text-lg md:text-lg">
                    {item.Interpretations.length > 100
                      ? `${item.Interpretations.substring(0, 80)}...`
                      : item.Interpretations}
                  </p>
                </div>
              </div>
              {/* icons action  */}
              <div className="mt-2 flex gap-2 justify-end items-center md:mt-4 md:gap-2">
                <button
                  onClick={() => router.push(`/pages/more/${item.$id}`)}
                  className="text-sm md:text-lg text-green-500 bg-green-200 p-2 rounded-md md:p-4"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => router.push(`/pages/edit/${item.$id}`)}
                  className="text-sm md:text-lg text-slate-500 bg-slate-200 p-2 rounded-md md:p-4"
                >
                  <FaPenToSquare />
                </button>
                <button
                  onClick={() => openConfirmationDialog(item.$id)}
                  className="text-sm md:text-lg text-red-500 bg-red-200 p-2 rounded-md md:p-4"
                >
                  <FaRegTrashCan />
                </button>
              </div>
            </div>
          ))}
           <hr />
        </div>
      )}

      <ConfirmationDialog
        isOpen={deleteId !== null}
        title="Confirm Deletion"
        message="Are you sure you want to delete this interpretation?"
        onConfirm={() => handleDelete(deleteId as string)}
        onCancel={closeConfirmationDialog}
      />
    </div>
  );
}
