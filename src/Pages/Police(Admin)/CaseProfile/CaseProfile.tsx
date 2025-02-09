import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  MapPin,
  FileText,
  Image,
  Video,
  Folder,
} from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// Mock Data (unchanged)
const caseData = {
  id: 1,
  caseNumber: "CASE-2024-001",
  created_at: "2024-07-27T10:15:00Z",
  incident_type: "Burglary",
  location: "Diamond District Mall, Andheri East",
  coordinates: [19.1292, 72.9131],
  description:
    "Breaking and entering reported at local jewelry store. Multiple items stolen including precious gems and gold jewelry. Security system was disabled prior to entry.",
  estimated_loss: "₹25,00,000",
  accused: {
    name: "Govind Singh",
    age: 35,
    address: "123 Main St, Mumbai",
    status: "At Large",
  },
  officer: {
    name: "Inspector Raj Kumar",
    badge: "MH-1234",
    department: "Criminal Investigation Unit",
  },
  reported_by: {
    id: 2,
    first_name: "New",
    last_name: "User",
    username: "vinayak9769",
    email: "vinayak97696@gmail.com",
    phone_number: null,
    emergency_contact_name: "Jane Doe",
    emergency_contact_phone: "9324889443",
    is_admin: false,
    is_officer: true,
  },
};
const fileSystem = [
  {
    id: "evidence",
    name: "Evidence",
    type: "folder",
    children: [
      {
        id: "physical",
        name: "Physical Evidence",
        type: "folder",
        children: [
          {
            id: "pe001",
            name: "Crime Scene Photos.jpg",
            type: "file",
            fileType: "jpg",
            content: "Base64 encoded image data",
            created: "2024-07-27T14:00:00Z",
            size: "15.2 MB",
            uploadedBy: "Officer Sarah Chen",
            tags: ["crime scene", "photography", "evidence"],
          },
          {
            id: "pe002",
            name: "Forensic Report.pdf",
            type: "file",
            fileType: "pdf",
            content: `FORENSIC ANALYSIS REPORT
Case #1 - Jewelry Store Burglary
Date: July 27, 2024

FINDINGS:
1. Tool marks on security panel indicate professional equipment
2. Partial fingerprints recovered from display case
3. Shoe impressions suggest single perpetrator
4. Hair samples collected for DNA analysis
5. Security system disabled at 02:34 AM

RECOMMENDATIONS:
- Priority analysis of recovered fingerprints
- Cross-reference tool marks with known burglar methods
- Enhanced surveillance of known jewelry fences`,
            created: "2024-07-27T15:30:00Z",
            size: "2.8 MB",
            uploadedBy: "Dr. Emily White",
            tags: ["forensics", "report", "analysis"],
          },
        ],
      },
      {
        id: "digital",
        name: "Digital Evidence",
        type: "folder",
        children: [
          {
            id: "de001",
            name: "CCTV Footage.mp4",
            type: "file",
            fileType: "mp4",
            content: "Base64 encoded video data",
            created: "2024-07-27T13:45:00Z",
            size: "234.6 MB",
            uploadedBy: "Officer David Lee",
            tags: ["video", "surveillance"],
          },
        ],
      },
    ],
  },
  {
    id: "statements",
    name: "Witness Statements",
    type: "folder",
    children: [
      {
        id: "ws001",
        name: "Security Guard Statement.pdf",
        type: "file",
        fileType: "pdf",
        content: `WITNESS STATEMENT
Name: Rajesh Patil
Position: Night Security Guard
Date: July 27, 2024

I was conducting my regular rounds at 02:30 AM when I noticed the security cameras were offline. Upon investigation, I found the control panel had been tampered with. I immediately called the police but the perpetrator had already fled the scene.

I saw a person wearing dark clothes running towards the back alley. Could not identify any distinct features due to poor lighting.`,
        created: "2024-07-27T16:00:00Z",
        size: "1.1 MB",
        uploadedBy: "Officer Sarah Chen",
        tags: ["statement", "witness"],
      },
    ],
  },
  {
    id: "accused",
    name: "Accused Documents",
    type: "folder",
    children: [
      {
        id: "ad001",
        name: "Arrest Memo.pdf",
        type: "file",
        fileType: "pdf",
        content: `ARREST MEMO
Accused Name: John Doe
Arrest Date: July 28, 2024
Officer: Inspector Raj Kumar

Details:
- Arrested at 04:00 PM near Andheri East
- Found in possession of stolen jewelry
- Resisted arrest but was subdued without injury`,
        created: "2024-07-28T16:30:00Z",
        size: "1.5 MB",
        uploadedBy: "Inspector Raj Kumar",
        tags: ["arrest", "memo"],
      },
    ],
  },
];
const timeline = [
  {
    id: 1,
    date: "2024-07-27T02:34:00Z",
    event: "Security System Disabled",
    description: "Security cameras and alarm system were disabled",
  },
  {
    id: 2,
    date: "2024-07-27T02:45:00Z",
    event: "Break-in Detected",
    description: "Security guard discovered tampering during routine patrol",
  },
  {
    id: 3,
    date: "2024-07-27T03:00:00Z",
    event: "Police Arrival",
    description: "First responders arrived at the scene",
  },
  {
    id: 4,
    date: "2024-07-27T10:15:00Z",
    event: "Case Created",
    description: "Case registered in the system",
  },
  {
    id: 5,
    date: "2024-07-27T14:00:00Z",
    event: "Evidence Collection",
    description: "Forensics team collected physical evidence from scene",
  },
  {
    id: 6,
    date: "2024-07-27T15:30:00Z",
    event: "Forensic Analysis",
    description: "Initial forensic analysis completed",
  },
  {
    id: 7,
    date: "2024-07-28T16:00:00Z",
    event: "Suspect Arrested",
    description: "John Doe was arrested near Andheri East",
  },
];

// File Icon Component
const FileIcon = ({ fileType }) => {
  const iconMap = {
    pdf: <FileText className="w-4 h-4 text-red-500" />,
    jpg: <Image className="w-4 h-4 text-green-500" />,
    jpeg: <Image className="w-4 h-4 text-green-500" />,
    png: <Image className="w-4 h-4 text-green-500" />,
    mp4: <Video className="w-4 h-4 text-purple-500" />,
  };

  return iconMap[fileType] || <FileText className="w-4 h-4 text-gray-500" />;
};

// File Tree Item Component
const FileTreeItem = ({ item, level = 0, onSelect, selectedFile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (item.type === "folder") {
      setIsOpen(!isOpen);
    } else {
      onSelect(item);
    }
  };

  const isSelected = selectedFile?.id === item.id;

  return (
    <div className="select-none">
      <div
        className={`flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer ${
          level > 0 ? `ml-${level * 4}` : ""
        } ${isSelected ? "bg-blue-50" : ""}`}
        onClick={handleClick}
      >
        {item.type === "folder" && (
          <span className="mr-2">
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
        {item.type === "file" ? (
          <FileIcon fileType={item.fileType} />
        ) : (
          <Folder className="w-4 h-4 text-yellow-500 mr-2" />
        )}
        <span>{item.name}</span>
      </div>
      {item.type === "folder" && isOpen && item.children && (
        <div>
          {item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              onSelect={onSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// File Viewer Component
const FileViewer = ({ file }) => {
  if (!file) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{file.name}</h3>
      <div className="text-sm text-gray-500 space-y-1">
        <p>Created: {format(new Date(file.created), "PPpp")}</p>
        <p>Size: {file.size}</p>
        <p>Uploaded by: {file.uploadedBy}</p>
        {file.tags && (
          <div className="flex gap-2 flex-wrap">
            {file.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="border-t pt-4">
        {file.fileType === "pdf" ? (
          <div className="whitespace-pre-wrap font-mono text-sm">
            {file.content}
          </div>
        ) : file.fileType === "mp4" ? (
          <video controls className="w-full">
            <source
              src={`data:video/mp4;base64,${file.content}`}
              type="video/mp4"
            />
          </video>
        ) : file.fileType === "jpg" || file.fileType === "png" ? (
          <img
            src={`data:image/jpeg;base64,${file.content}`}
            alt={file.name}
            className="w-full rounded-lg"
          />
        ) : (
          <p>{file.content}</p>
        )}
      </div>
    </div>
  );
};

// Timeline Component
const Timeline = ({ events }) => {
  return (
    <div className="mt-4 space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
            {index < events.length - 1 && (
              <div className="w-px h-full bg-gray-200 my-1" />
            )}
          </div>
          <div className="pb-4">
            <p className="text-sm text-gray-500">
              {format(new Date(event.date), "PPp")}
            </p>
            <p className="font-semibold">{event.event}</p>
            <p className="text-sm text-gray-600">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Component
export default function CaseProfile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("files");
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* Case Header */}
      <div className="bg-slate-50 rounded-lg shadow-sm shadow">
        <div className="p-6">
          {/* Case Title and Metadata */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold">
                Case #{caseData.caseNumber}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Created on {format(new Date(caseData.created_at), "PPp")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {caseData.incident_type}
              </span>
              {/* <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                Estimated Loss: {caseData.estimated_loss}
              </span> */}
            </div>
          </div>

          {/* Divider */}
          <div className="border-b my-4 border-gray-100" />

          {/* Case Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Reported By */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Reported By</p>
              <p className="font-medium">
                {caseData.reported_by.first_name}{" "}
                {caseData.reported_by.last_name}
              </p>
              <p className="text-sm text-gray-600">
                {caseData.reported_by.email}
              </p>
              <p className="text-sm text-gray-600">
                Emergency Contact: {caseData.reported_by.emergency_contact_name}{" "}
                ({caseData.reported_by.emergency_contact_phone})
              </p>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Location</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{caseData.location}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Coordinates: {caseData.coordinates.join(", ")}
              </p>
            </div>

            {/* Accused */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Accused</p>
              <p className="font-medium">{caseData.accused.name}</p>
              <p className="text-sm text-gray-600">
                Age: {caseData.accused.age} | Status:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    caseData.accused.status === "At Large"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {caseData.accused.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Address: {caseData.accused.address}
              </p>
            </div>

            {/* Officer in Charge */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Officer in Charge</p>
              <p className="font-medium">{caseData.officer.name}</p>
              <p className="text-sm text-gray-600">
                Badge: {caseData.officer.badge} | Department:{" "}
                {caseData.officer.department}
              </p>
            </div>

            {/* Incident Description */}
            <div className="md:col-span-2 lg:col-span-3">
              <p className="text-sm text-gray-500 mb-1">Incident Description</p>
              <p className="text-gray-700">{caseData.description}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="rounded bg-indigo-500 text-white p-2 px-3"
        onClick={() => navigate("/sca")}
      >
        Smart Analysis
      </button>
      {/* Tabs */}
      <div>
        <div className="border-b border-gray-300">
          <button
            className={`px-4 py-2 ${
              activeTab === "files"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("files")}
          >
            Files
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "timeline"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("timeline")}
          >
            Timeline
          </button>
        </div>

        {/* Files Tab */}
        {activeTab === "files" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-50 shadow rounded-lg">
              <div className="max-h-[600px] overflow-y-auto">
                {fileSystem.map((item) => (
                  <FileTreeItem
                    key={item.id}
                    item={item}
                    onSelect={setSelectedFile}
                    selectedFile={selectedFile}
                  />
                ))}
              </div>
            </div>
            <div className="md:col-span-2 bg-slate-50 shadow rounded-lg p-4">
              {selectedFile ? (
                <FileViewer file={selectedFile} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a file to view its contents
                </div>
              )}
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === "timeline" && <Timeline events={timeline} />}
      </div>
    </div>
  );
}
