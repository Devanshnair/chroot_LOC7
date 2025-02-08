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

interface CreateCaseProps {
  onCaseCreated: (newCase: Case) => void;
}

export default function CreateCase({ onCaseCreated }: CreateCaseProps) {
  const navigate = useNavigate();

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
    onCaseCreated(newCase);
    navigate("/cases"); // Navigate back to case management page after creation
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Card Component for Create New Case (Tailwind Equivalent) */}
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
    </div>
  );
}
