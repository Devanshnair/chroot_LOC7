import { useState } from "react";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge"; // Optional, for merging Tailwind classes

interface File {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  uploadDate: string;
}

export default function CaseProfile() {
  const { id } = useParams<{ id: string }>();
  const [files, setFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<"files" | "notes" | "timeline">(
    "files"
  ); // State for tabs

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile: File = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        uploadedBy: "Current User",
        uploadDate: new Date().toISOString(),
      };
      setFiles([...files, newFile]);
    }
  };

  const handleTabChange = (tabValue: "files" | "notes" | "timeline") => {
    setActiveTab(tabValue);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Card Component (Tailwind Equivalent) */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Card Header (Tailwind Equivalent) */}
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
          {/* Card Title (Tailwind Equivalent) */}
          <h2 className="text-xl font-semibold text-gray-800">
            Case Profile: {id}
          </h2>
        </div>
        {/* Card Content (Tailwind Equivalent) */}
        <div className="p-6">
          <p className="mb-2">Case Number: CASE-{id}</p>
          <p className="mb-2">Status: Open</p>
          <p className="mb-2">Type: Theft</p>
          <p className="mb-2">Date & Time: 2023-06-10 14:30</p>
          <p>Station: Central Police Station</p>
          <p>Police in Charge: Officer John Doe</p>
        </div>
      </div>

      {/* Tabs Component (Tailwind Equivalent) */}
      <div>
        {/* Tabs List (Tailwind Equivalent - using ul and li) */}
        <ul className="flex border-b border-gray-200 pb-px">
          {/* Tab Trigger (Tailwind Equivalent - Button inside li) */}
          <li className="-mb-px mr-2 last:mr-0">
            <button
              onClick={() => handleTabChange("files")}
              className={twMerge(
                "bg-white py-2 px-4 font-semibold text-gray-800 border-l border-t border-r  rounded-t hover:text-indigo-600 focus:outline-none",
                activeTab === "files"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent"
              )}
            >
              Files
            </button>
          </li>
          {/* Tab Trigger (Tailwind Equivalent - Button inside li) */}
          <li className="-mb-px mr-2 last:mr-0">
            <button
              onClick={() => handleTabChange("notes")}
              className={twMerge(
                "bg-white py-2 px-4 font-semibold text-gray-800 border-l border-t border-r  rounded-t hover:text-indigo-600 focus:outline-none",
                activeTab === "notes"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent"
              )}
            >
              Notes
            </button>
          </li>
          {/* Tab Trigger (Tailwind Equivalent - Button inside li) */}
          <li className="-mb-px mr-2 last:mr-0">
            <button
              onClick={() => handleTabChange("timeline")}
              className={twMerge(
                "bg-white py-2 px-4 font-semibold text-gray-800 border-l border-t border-r  rounded-t hover:text-indigo-600 focus:outline-none",
                activeTab === "timeline"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent"
              )}
            >
              Timeline
            </button>
          </li>
        </ul>

        {/* Tab Content (Tailwind Equivalent) */}
        <div>
          {activeTab === "files" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
              <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  File Management
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    {/* Button Component (Tailwind Equivalent) */}
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
                      Upload File
                    </button>
                  </label>
                </div>
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-md border border-gray-200"
                    >
                      <span>{file.name}</span>
                      <span className="text-gray-500 text-sm">
                        {file.uploadDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
              <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Case Notes
                </h2>
              </div>
              <div className="p-6">
                {/* Add case notes component here */}
                <p className="text-gray-700">
                  Case notes will be displayed here.
                </p>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
              <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Case Timeline
                </h2>
              </div>
              <div className="p-6">
                {/* Add case timeline component here */}
                <p className="text-gray-700">
                  Case timeline will be displayed here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
