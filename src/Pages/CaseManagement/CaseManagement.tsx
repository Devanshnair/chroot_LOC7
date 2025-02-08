import { Link } from "react-router-dom";

function CaseManagementPage() {
  // Sample case data (replace with actual data fetching later)
  const cases = [
    {
      caseId: "C2024-001",
      incidentType: "Theft",
      location: "Market Area, Delhi",
      status: "Open",
      lastUpdated: "2024-03-15 10:00 AM",
    },
    {
      caseId: "C2024-002",
      incidentType: "Traffic Violation",
      location: "Ring Road, Bangalore",
      status: "Under Investigation",
      lastUpdated: "2024-03-14 03:30 PM",
    },
    {
      caseId: "C2024-003",
      incidentType: "Public Disturbance",
      location: "Beach Road, Chennai",
      status: "Closed",
      lastUpdated: "2024-03-10 11:45 AM",
    },
    // ... more cases
  ];

  return (
    <div className="font-sans antialiased text-gray-700">
      {/* Page Header */}
      <header className="bg-indigo-700 py-6 text-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Case Management System</h1>
          {/* You could add navigation or user info here later */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Case Filing Section (Form - Placeholder for now) */}
        <section className="mb-8 p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            File a New Case
          </h2>
          <p className="text-gray-600 mb-4">
            Quickly create a new case record with essential details.
          </p>
          {/* Placeholder form - replace with actual form elements */}
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-gray-500 italic text-sm">
              [Form elements for filing a new case will go here in a later step]
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Create Case
            </button>
          </div>
        </section>

        {/* Case List Section */}
        <section className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Current Cases
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Case ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Incident Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Updated
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cases.map((caseItem) => (
                  <tr key={caseItem.caseId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {caseItem.caseId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {caseItem.incidentType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {caseItem.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          caseItem.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : caseItem.status === "Under Investigation"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800" // Closed or other statuses
                        }`}
                      >
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {caseItem.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                      <Link
                        to={`/cases/${caseItem.caseId}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
            {/* Pagination or "View More" could go here */}
            <p className="text-gray-500 text-sm">
              Showing {cases.length} cases
            </p>
          </div>
        </section>
      </main>

      {/* Footer (You can reuse the same footer component from the homepage later) */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Digital Transformation of Police
            Work - Culture. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default CaseManagementPage;
