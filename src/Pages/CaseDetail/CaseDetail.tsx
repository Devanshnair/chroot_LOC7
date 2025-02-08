function CaseDetailPage() {
  const caseDetails = {
    caseId: "C2024-001",
    incidentType: "Theft",
    location: "Market Area, Delhi",
    status: "Open",
    reportedDate: "2024-03-15 09:30 AM",
    officerAssigned: "Officer Sharma",
    description:
      "Report of theft of a mobile phone from a shop in the market area. Witness statements collected. Evidence: CCTV footage.",
    evidence: [
      { type: "Document", name: "Witness Statement 1", url: "#" }, // Replace '#' with actual URL
      { type: "Video", name: "CCTV Footage - Market Entrance", url: "#" },
      { type: "Photo", name: "Stolen Phone Box", url: "#" },
    ],
    updates: [
      {
        timestamp: "2024-03-15 10:00 AM",
        note: "Case filed and assigned to Officer Sharma.",
      },
      {
        timestamp: "2024-03-15 11:30 AM",
        note: "Initial investigation started. Witness statements recorded.",
      },
      // ... more updates
    ],
  };

  return (
    <div className="font-sans antialiased text-gray-700">
      {/* Page Header */}
      <header className="bg-indigo-700 py-6 text-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Case Details</h1>
          {/* Back button or navigation can be added here */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Case ID: {caseDetails.caseId}
          </h2>

          {/* Case Summary Section */}
          <section className="mb-6 border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Case Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <span className="font-semibold">Incident Type:</span>{" "}
                  {caseDetails.incidentType}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {caseDetails.location}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`inline-flex ml-1 rounded-full px-2 text-xs font-semibold leading-5 ${
                      caseDetails.status === "Open"
                        ? "bg-green-100 text-green-800"
                        : caseDetails.status === "Under Investigation"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {caseDetails.status}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Reported Date:</span>{" "}
                  {caseDetails.reportedDate}
                </p>
                <p>
                  <span className="font-semibold">Officer Assigned:</span>{" "}
                  {caseDetails.officerAssigned}
                </p>
              </div>
            </div>
            <p className="mt-4">
              <span className="font-semibold">Description:</span>{" "}
              {caseDetails.description}
            </p>
          </section>

          {/* Evidence Section */}
          <section className="mb-6 border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Evidence
            </h3>
            {caseDetails.evidence.length > 0 ? (
              <ul className="list-disc pl-5">
                {caseDetails.evidence.map((evidenceItem, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={evidenceItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 underline"
                    >
                      {evidenceItem.name} ({evidenceItem.type})
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No evidence recorded yet.</p>
            )}
          </section>

          {/* Updates Section */}
          <section>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Case Updates
            </h3>
            {caseDetails.updates.length > 0 ? (
              <ul className="space-y-3">
                {caseDetails.updates.map((update, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-3 rounded-md border border-gray-200"
                  >
                    <p className="text-sm text-gray-500">{update.timestamp}</p>
                    <p>{update.note}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No updates yet.</p>
            )}
            {/* Add "Add Update" form/button here later */}
            <div className="mt-4 flex justify-end">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Add Update
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer (Reuse footer component later) */}
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

export default CaseDetailPage;
