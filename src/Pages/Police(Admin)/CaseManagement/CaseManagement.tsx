// CaseManagement.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Case {
  id: string;
  caseNumber: string;
  dateTime: string;
  stationName: string;
  address: string;
  policeInCharge: string;
  typeOfCase: string;
  nameOfAccused: string;
  description: string;
  status: "Open" | "Closed" | "Under Investigation";
}

export default function CaseManagement() {
  // Initialize cases state with dummy data
  const [cases, setCases] = useState<Case[]>([
    {
      id: "1",
      caseNumber: "CR2024-1234",
      dateTime: "2024-03-16T14:30",
      stationName: "Police Station A",
      address: "Main Market, City Center",
      policeInCharge: "Inspector Sharma",
      typeOfCase: "theft",
      nameOfAccused: "Unknown",
      description:
        "Theft of a mobile phone from a shop. CCTV footage available.",
      status: "Open",
    },
    {
      id: "2",
      caseNumber: "TR2024-5678",
      dateTime: "2024-03-15T09:00",
      stationName: "Traffic Police Station",
      address: "Highway Junction, Outskirts",
      policeInCharge: "Officer Verma",
      typeOfCase: "trafficViolation",
      nameOfAccused: "John Doe",
      description: "Traffic violation - speeding and reckless driving.",
      status: "Under Investigation",
    },
    {
      id: "3",
      caseNumber: "PD2024-9012",
      dateTime: "2024-03-10T21:00",
      stationName: "Police Station B",
      address: "Residential Area, Suburb",
      policeInCharge: "Officer Kapoor",
      typeOfCase: "publicDisturbance",
      nameOfAccused: "Group of Individuals",
      description: "Public disturbance due to loud music and noise complaint.",
      status: "Closed",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Function to handle case creation and update cases state
  // const handleCaseCreated = (newCase: Case) => {
  //   setCases([...cases, newCase]);
  // };

  // Filter cases based on searchQuery
  const filteredCases = cases.filter((case_) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      case_.caseNumber.toLowerCase().includes(searchLower) ||
      case_.stationName.toLowerCase().includes(searchLower) ||
      case_.address.toLowerCase().includes(searchLower) ||
      case_.policeInCharge.toLowerCase().includes(searchLower) ||
      case_.typeOfCase.toLowerCase().includes(searchLower) ||
      case_.description.toLowerCase().includes(searchLower)
    );
  });

  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-4 md:p-6 ">
      {/* Button to navigate to Create Case page */}

      <button
        onClick={() => navigate("/cases/new")}
        className="bg-indigo-500 hover:bg-indigo-700 block md:hidden text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
      >
        Create New Case
      </button>

      {/* Card Component for Previous Cases (Tailwind Equivalent) */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Card Header (Tailwind Equivalent) */}
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200 grid gap-4">
          {/* Card Title (Tailwind Equivalent) */}
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Previous Cases
            </h2>
            <button
              onClick={() => navigate("/cases/new")}
              className="bg-indigo-500 hover:bg-indigo-700 md:block hidden text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              Create New Case
            </button>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search cases..."
            className="px-3 py-2 border max-w-lg border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Card Content (Tailwind Equivalent) */}
        <div className="p-6 space-y-4">
          {filteredCases.map((case_) => (
            // Card Component (Tailwind Equivalent) for individual case
            <div
              key={case_.id}
              className="bg-gray-50 rounded-md border border-gray-200"
            >
              {/* Card Content (Tailwind Equivalent) for individual case */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{case_.caseNumber}</h3>
                <p className="text-gray-700">Date & Time: {case_.dateTime}</p>
                <p className="text-gray-700">Station: {case_.stationName}</p>
                <p className="text-gray-700">Type: {case_.typeOfCase}</p>
                <p className="text-gray-700">Status: {case_.status}</p>
                {/* Button Component (Tailwind Equivalent) - Outline variant */}
                <button
                  className="mt-2 px-4 py-2 border border-gray-500 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  onClick={() => {
                    //navigate
                    navigate(`/cases/${case_.caseNumber}`);
                  }}
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
          {cases.length > 0 && filteredCases.length === 0 && !searchQuery && (
            <p className="text-gray-500 text-center">
              No previous cases recorded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
