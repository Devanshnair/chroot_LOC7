// CaseProfile.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface FileStructure {
  id: string;
  name: string;
  type: "folder" | "file";
  fileType?: string;
  items?: FileStructure[];
  details?: string[];
  path: string[];
}

const exampleFileStructure: FileStructure[] = [
  {
    id: "1",
    name: "Evidence",
    type: "folder",
    path: [],
    items: [
      {
        id: "2",
        name: "Physical Evidence",
        type: "folder",
        path: ["Evidence"],
        items: [
          {
            id: "3",
            name: "Broken Window Pane",
            type: "file",
            fileType: "txt",
            path: ["Evidence", "Physical Evidence"],
            details: [
              "Item ID: PE-001",
              "Description: Broken window pane from the crime scene",
              "Seizure Date: 2024-07-27 10:15 AM",
              "Officer: Officer Sarah Chen",
            ],
          },
          {
            id: "4",
            name: "Fingerprint Report",
            type: "file",
            fileType: "pdf",
            path: ["Evidence", "Physical Evidence"],
            details: [
              "Item ID: FR-001",
              "Description: Fingerprint analysis report",
              "Generated Date: 2024-07-28 02:00 PM",
              "Forensic Officer: Dr. Emily White",
            ],
          },
        ],
      },
      {
        id: "5",
        name: "Digital Evidence",
        type: "folder",
        path: ["Evidence"],
        items: [
          {
            id: "6",
            name: "CCTV Footage",
            type: "folder",
            path: ["Evidence", "Digital Evidence"],
            items: [
              {
                id: "7",
                name: "Front Door CCTV.mp4",
                type: "file",
                fileType: "mp4",
                path: ["Evidence", "Digital Evidence", "CCTV Footage"],
                details: [
                  "Description: CCTV footage of the front door",
                  "Seizure Date: 2024-07-27 11:00 AM",
                  "Officer: Officer David Lee",
                ],
              },
              {
                id: "8",
                name: "Backyard CCTV.mp4",
                type: "file",
                fileType: "mp4",
                path: ["Evidence", "Digital Evidence", "CCTV Footage"],
                details: [
                  "Description: CCTV footage of the backyard",
                  "Seizure Date: 2024-07-27 11:30 AM",
                  "Officer: Officer David Lee",
                ],
              },
            ],
          },
          {
            id: "9",
            name: "Phone Records",
            type: "file",
            fileType: "pdf",
            path: ["Evidence", "Digital Evidence"],
            details: [
              "Description: Call and SMS records of the accused",
              "Seizure Date: 2024-07-28 09:00 AM",
              "Officer: Officer Jane Smith",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "10",
    name: "Witness Statements",
    type: "folder",
    path: [],
    items: [
      {
        id: "11",
        name: "Victim Statement.docx",
        type: "file",
        fileType: "docx",
        path: ["Witness Statements"],
        details: [
          "Witness Name: John Smith (Victim)",
          "Statement Date: 2024-07-27 09:00 AM",
          "Officer: Officer Sarah Chen",
        ],
      },
      {
        id: "12",
        name: "Neighbor Statement.docx",
        type: "file",
        fileType: "docx",
        path: ["Witness Statements"],
        details: [
          "Witness Name: Jane Doe (Neighbor)",
          "Statement Date: 2024-07-27 10:00 AM",
          "Officer: Officer David Lee",
        ],
      },
    ],
  },
  {
    id: "13",
    name: "Accused Documents",
    type: "folder",
    path: [],
    items: [
      {
        id: "14",
        name: "Arrest Memo.pdf",
        type: "file",
        fileType: "pdf",
        path: ["Accused Documents"],
        details: [
          "Accused Name: Peter Brown",
          "Arrest Date: 2024-07-28 04:00 PM",
          "Officer: Officer Sarah Chen",
        ],
      },
      {
        id: "15",
        name: "Charge Sheet.pdf",
        type: "file",
        fileType: "pdf",
        path: ["Accused Documents"],
        details: [
          "Accused Name: Peter Brown",
          "Charge: Theft & Breaking",
          "Filed Date: 2024-07-29 10:00 AM",
        ],
      },
    ],
  },
  {
    id: "16",
    name: "Court Documents",
    type: "folder",
    path: [],
    items: [
      {
        id: "17",
        name: "Warrants",
        type: "folder",
        path: ["Court Documents"],
        items: [
          {
            id: "18",
            name: "Search Warrant.pdf",
            type: "file",
            fileType: "pdf",
            path: ["Court Documents", "Warrants"],
            details: [
              "Warrant ID: SW-2024-001",
              "Issued Date: 2024-07-28 11:00 AM",
              "Judge: Hon. Michael Johnson",
            ],
          },
        ],
      },
      {
        id: "19",
        name: "Court Proceedings.docx",
        type: "file",
        fileType: "docx",
        path: ["Court Documents"],
        details: [
          "Case Number: CASE-2024-001",
          "Hearing Date: 2024-08-15 10:00 AM",
          "Courtroom: 5B",
        ],
      },
    ],
  },
];

export default function CaseProfile() {
  const { id } = useParams<{ id: string }>();
  // const [files, setFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<"files" | "notes" | "timeline">(
    "files"
  );
  const [notes, setNotes] = useState<string>(
    "Initial case notes. You can add more notes here."
  );
  const [folderStructure, setFolderStructure] = useState<FileStructure[]>([]);
  const [selectedFolderPath, setSelectedFolderPath] = useState<string[]>([]);

  // Initialize folder structure
  useEffect(() => {
    const initialStructure = createFolderStructure(exampleFileStructure);
    setFolderStructure(initialStructure);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile: FileStructure = {
        id: Date.now().toString(),
        name: file.name,
        type: "file",
        fileType: file.type.split("/")[1],
        details: [
          `Uploaded: ${new Date().toLocaleString()}`,
          `Officer: Current User`,
          `Size: ${(file.size / 1024).toFixed(1)}KB`,
        ],
        path: [...selectedFolderPath],
      };

      setFolderStructure((prev) =>
        addItemToFolderStructure(prev, newFile, selectedFolderPath)
      );
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
          <h2 className="text-xl font-semibold text-gray-800">
            Case Profile: {id}
          </h2>
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
                <div className="mt-2 text-sm">
                  Current Folder: {selectedFolderPath.join(" / ") || "Root"}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-4">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md">
                      Upload File
                    </button>
                  </label>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={() => setSelectedFolderPath([])}
                  >
                    Back to Root
                  </button>
                </div>
                <div className="mt-4 border rounded-lg p-4">
                  <FileStructureTree
                    structure={folderStructure}
                    currentPath={selectedFolderPath}
                    onFolderSelect={setSelectedFolderPath}
                  />
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

const createFolderStructure = (
  items: FileStructure[],
  path: string[] = []
): FileStructure[] => {
  return items.map((item) => ({
    ...item,
    id: Date.now().toString(),
    path,
    items: item.items?.length
      ? createFolderStructure(item.items, [...path, item.name])
      : [],
  }));
};

const addItemToFolderStructure = (
  structure: FileStructure[],
  newItem: FileStructure,
  targetPath: string[]
): FileStructure[] => {
  return structure.map((item) => {
    if (
      item.path.join("/") === targetPath.join("/") &&
      item.type === "folder"
    ) {
      return {
        ...item,
        items: [...(item.items || []), newItem],
      };
    }
    if (item.items) {
      return {
        ...item,
        items: addItemToFolderStructure(item.items, newItem, targetPath),
      };
    }
    return item;
  });
};

// Updated FileStructureTree component
const FileStructureTree: React.FC<{
  structure: FileStructure[];
  currentPath: string[];
  onFolderSelect: (path: string[]) => void;
}> = ({ structure, currentPath, onFolderSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleFolderClick = (item: FileStructure, e) => {
    setIsOpen(!isOpen);
    if (item.type === "folder") {
      onFolderSelect([...item.path, item.name]);
    }
    console.log(e.target.closest("li").querySelector(".collapsable"));
    e.target.closest("li").querySelector(".collapsable").style.display = !isOpen
      ? "none"
      : "block";
  };
  // document.querySelector(".collapsable").style.display = "none";

  return (
    <ul className="list-none pl-0">
      {structure.map((item) => (
        <li key={item.id} className="mb-1">
          <div
            className={`flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded ${
              currentPath.join("/") === [...item.path, item.name].join("/")
                ? "bg-blue-50"
                : ""
            }`}
            onClick={(e) => handleFolderClick(item, e)}
          >
            {item.type === "folder" ? (
              <FolderIcon />
            ) : (
              <FileIcon fileType={item.fileType} />
            )}
            <span className="ml-2">{item.name}</span>
          </div>
          {item.items && item.items.length > 0 && (
            <div className="ml-4 collapsable">
              <FileStructureTree
                structure={item.items}
                currentPath={currentPath}
                onFolderSelect={onFolderSelect}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

// Updated icon components with styles
const FileIcon = ({ fileType }: { fileType?: string }) => {
  const iconMap: Record<string, string> = {
    pdf: "📄 text-red-500",
    docx: "📄 text-blue-500",
    jpg: "🖼️ text-green-500",
    png: "🖼️ text-green-500",
    mp4: "🎥 text-purple-500",
    txt: "📝 text-gray-500",
  };

  return (
    <span className={`mr-2  text-gray-500"}`}>
      {iconMap[fileType || "txt"]}
    </span>
  );
};

const FolderIcon = () => <span className="mr-2 text-yellow-500">📂</span>;
