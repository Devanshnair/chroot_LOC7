// CaseManagement.tsx
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../App";
import { format, parseISO } from "date-fns"; // Import date-fns functions

interface CaseFromApi {
  accused: null; // or specify type if it's not always null
  coordinates: [number, number]; // [latitude, longitude]
  created_at: string; // ISO date string
  description: string;
  id: number; // API 'id' is a number
  location: string;
  officer: null; // or specify type
  reported_by: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    // ... other properties if needed
  };
  status: "open" | "closed" | "under_investigation"; // API uses underscore
  title: string;
  updated_at: string; // ISO date string
}

// Updated Case interface to match API and for UI display
interface Case {
  id: number; // Using number to match API 'id'
  caseNumber: string; // Generate case number from id if needed, or use API if available
  title: string;
  dateTime: string; // Formatted date and time from created_at
  reportedBy: string; // Display name of who reported
  typeOfCase: string; //  Can derive from title or description for now, or add to API Case if needed
  description: string;
  status: "open" | "closed" | "under_investigation"; // Keeping enum consistent with API status values
}

export default function CaseManagement() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/cases/cases`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "ngrok-skip-browser-warning": "69420",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json() as Promise<CaseFromApi[]>; // Type assertion here
    },
  });

  const [cases, setCases] = useState<Case[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Effect to transform API data to UI Case format
  useEffect(() => {
    if (data) {
      const formattedCases: Case[] = data.map((apiCase) => ({
        id: apiCase.id,
        caseNumber: `CASE-${apiCase.id}`, // Generate case number from ID
        title: apiCase.title,
        dateTime: format(parseISO(apiCase.created_at), "MMM d, yyyy, h:mm a"), // Format date
        reportedBy: `${apiCase.reported_by.first_name} ${apiCase.reported_by.last_name}`,
        typeOfCase: apiCase.title.split(" ")[1] || "Incident", // Example: Derive type from title (e.g., "great murder" -> "murder") - adjust logic as needed
        description: apiCase.description,
        status: apiCase.status,
      }));
      setCases(formattedCases);
    }
  }, [data]);

  const filteredCases = cases.filter((case_) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      case_.caseNumber.toLowerCase().includes(searchLower) ||
      case_.title.toLowerCase().includes(searchLower) ||
      case_.reportedBy.toLowerCase().includes(searchLower) ||
      case_.typeOfCase.toLowerCase().includes(searchLower) ||
      case_.description.toLowerCase().includes(searchLower) ||
      case_.status.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading cases...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">Error loading cases. Please try again.</div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 ">
      <button
        onClick={() => navigate("/cases/new")}
        className="bg-indigo-500 hover:bg-indigo-700 block md:hidden text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
      >
        Create New Case
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200 grid gap-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Cases List</h2>
            <button
              onClick={() => navigate("/cases/new")}
              className="bg-indigo-500 hover:bg-indigo-700 md:block hidden text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              Create New Case
            </button>
          </div>
          <input
            type="text"
            placeholder="Search cases..."
            className="px-3 py-2 border max-w-lg border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="p-6 space-y-4">
          {filteredCases.map((case_) => (
            <div
              key={case_.id.toString()} // Use API 'id' which is now a number
              className="bg-gray-50 rounded-md border border-gray-200  transition-shadow duration-200 ease-in-out" // Added hover effect
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {case_.title}
                </h3>{" "}
                {/* Title in Indigo */}
                <p className="text-gray-700 mt-1">
                  Case Number:{" "}
                  <span className="font-medium">{case_.caseNumber}</span>
                </p>
                <p className="text-gray-700 mt-1">
                  Reported By:{" "}
                  <span className="font-medium">{case_.reportedBy}</span>
                </p>
                <p className="text-gray-700 mt-1">
                  Date & Time:{" "}
                  <span className="font-medium">{case_.dateTime}</span>
                </p>
                <p className="text-gray-700 mt-1">
                  Type: <span className="font-medium">{case_.typeOfCase}</span>
                </p>
                <p className="text-gray-700 mt-1">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      case_.status === "open"
                        ? "text-green-500"
                        : case_.status === "closed"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {case_.status.replace("_", " ").toUpperCase()}
                  </span>
                </p>{" "}
                {/* Status with color coding */}
                <p className="text-gray-600 mt-2 truncate">
                  {case_.description}
                </p>{" "}
                {/* Truncate description */}
                <button
                  className="mt-4 px-4 py-2 border border-indigo-500 text-indigo-700 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  onClick={() => navigate(`/cases/${case_.caseNumber}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
          {filteredCases.length === 0 && searchQuery && (
            <p className="text-gray-500 text-center">
              No cases found matching your search.
            </p>
          )}
          {cases.length === 0 &&
            filteredCases.length === 0 &&
            !searchQuery &&
            !isLoading &&
            !isError && (
              <p className="text-gray-500 text-center">
                No cases recorded yet.
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
