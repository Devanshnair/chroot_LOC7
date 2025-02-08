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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCase: Case = {
      id: Date.now().toString(),
      caseNumber: formData.get("caseNumber") as string,
      dateTime: formData.get("dateTime") as string,
      stationName: formData.get("stationName") as string,
      address: formData.get("address") as string,
      policeInCharge: formData.get("policeInCharge") as string,
      typeOfCase: formData.get("typeOfCase") as string,
      nameOfAccused: formData.get("nameOfAccused") as string,
      description: formData.get("description") as string,
      status: "Open",
    };
    setCases([...cases, newCase]);
    e.currentTarget.reset();
  };

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
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Card Component for Create New Case (Tailwind Equivalent) - No changes here */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Create New Case
          </h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="caseNumber"
                placeholder="Case Number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <input
                type="datetime-local"
                name="dateTime"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="stationName"
                placeholder="Station Name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="policeInCharge"
                placeholder="Police in Charge"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <div className="relative">
                <select
                  name="typeOfCase"
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-3 py-2 pr-8 rounded-md shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Type of Case</option>
                  <option value="theft">Theft</option>
                  <option value="assault">Assault</option>
                  <option value="homicide">Homicide</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <input
                type="text"
                name="nameOfAccused"
                placeholder="Name of Accused"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <textarea
                name="description"
                placeholder="Brief Description"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none resize-none"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
              >
                Create Case
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Card Component for Previous Cases (Tailwind Equivalent) */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Card Header (Tailwind Equivalent) */}
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200 grid gap-4">
          {/* Card Title (Tailwind Equivalent) */}
          <h2 className="text-xl font-semibold text-gray-800">
            Previous Cases
          </h2>
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
          {filteredCases.map(
            (
              case_ // Use filteredCases instead of cases
            ) => (
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
            )
          )}
          {filteredCases.length === 0 &&
            searchQuery && ( // Display "No cases found" message when search active
              <p className="text-gray-500 text-center">
                No cases found matching your search.
              </p>
            )}
          {cases.length > 0 &&
            filteredCases.length === 0 &&
            !searchQuery && ( // Display "No previous cases" initially if no dummy data/no search
              <p className="text-gray-500 text-center">
                No previous cases recorded yet.
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
