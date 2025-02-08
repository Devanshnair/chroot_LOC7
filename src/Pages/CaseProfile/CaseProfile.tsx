import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
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
  );
  const [notes, setNotes] = useState<string>(
    "Initial case notes. You can add more notes here."
  );
  useEffect(() => {
    const initialFiles: File[] = [
      {
        id: "1",
        name: "Evidence_Report.pdf",
        type: "application/pdf",
        uploadedBy: "Officer John Doe",
        uploadDate: new Date(
          new Date().setDate(new Date().getDate() - 2)
        ).toISOString(),
      },
      {
        id: "2",
        name: "Witness_Statement.docx",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        uploadedBy: "Officer Jane Smith",
        uploadDate: new Date(
          new Date().setDate(new Date().getDate() - 1)
        ).toISOString(),
      },
      {
        id: "3",
        name: "CCTV_Footage.mp4",
        type: "video/mp4",
        uploadedBy: "Current User",
        uploadDate: new Date().toISOString(),
      },
    ];
    setFiles(initialFiles);
  }, []);
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
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800"></h2>
        </div>
        <div className="p-6">
          <p className="mb-2">Case Number: CASE-{id}</p>
          <p className="mb-2">Status: Open</p>
          <p className="mb-2">Type: Theft</p>
          <p className="mb-2">Date & Time: 2023-06-10 14:30</p>
          <p>Station: Central Police Station</p>
          <p>Police in Charge: Officer John Doe</p>
        </div>
      </div>
      <div>
        <ul className="flex border-b border-gray-200 pb-px">
          <li className="-mb-px mr-2 last:mr-0">
            <button
              onClick={() => handleTabChange("files")}
              className={twMerge(
                "bg-white py-2 px-4 font-semibold text-gray-800 border-l border-t border-r rounded-t hover:text-indigo-600 focus:outline-none",
                activeTab === "files"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent"
              )}
            >
              Files
            </button>
          </li>
          <li className="-mb-px mr-2 last:mr-0">
            <button
              onClick={() => handleTabChange("notes")}
              className={twMerge(
                "bg-white py-2 px-4 font-semibold text-gray-800 border-l border-t border-r rounded-t hover:text-indigo-600 focus:outline-none",
                activeTab === "notes"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent"
              )}
            >
              Notes
            </button>
          </li>
          <li className="-mb-px mr-2 last:mr-0">
            <button
              onClick={() => handleTabChange("timeline")}
              className={twMerge(
                "bg-white py-2 px-4 font-semibold text-gray-800 border-l border-t border-r rounded-t hover:text-indigo-600 focus:outline-none",
                activeTab === "timeline"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent"
              )}
            >
              Timeline
            </button>
          </li>
        </ul>
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
                <textarea
                  value={notes}
                  onChange={handleNotesChange}
                  className="w-full h-48 p-2 border rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
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
                <ul className="space-y-4">
                  <li>
                    <strong className="block font-semibold">
                      2023-06-10 14:30
                    </strong>
                    <span className="text-gray-700">
                      Case reported by victim.
                    </span>
                  </li>
                  <li>
                    <strong className="block font-semibold">
                      2023-06-11 09:00
                    </strong>
                    <span className="text-gray-700">
                      Initial investigation started. Witness statements
                      collected.
                    </span>
                  </li>
                  <li>
                    <strong className="block font-semibold">
                      2023-06-12 16:00
                    </strong>
                    <span className="text-gray-700">
                      Evidence report submitted. CCTV footage analyzed.
                    </span>
                  </li>
                  <li>
                    <strong className="block font-semibold">
                      2023-06-15 10:00
                    </strong>
                    <span className="text-gray-700">
                      Suspect identified and being pursued.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
