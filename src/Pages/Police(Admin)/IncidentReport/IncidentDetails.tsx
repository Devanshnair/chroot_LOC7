import type React from "react";
import { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  Camera,
  Video,
} from "lucide-react";

interface IncidentDetailsProps {
  id: string;
  date: string;
  time: string;
  location: string;
  type?: string;
  description: string;
  reportedBy: string;
  status: string;
  media: {
    type: "photo" | "video";
    url: string;
  }[];
}

const IncidentDetailsData = {
  id: "12345",
  date: "2023-05-15",
  time: "14:30",
  location: "123 Main St, City",
  type: "Theft",
  description: "A bicycle was stolen from the front yard.",
  reportedBy: "John Doe",
  status: "Under Investigation",
  media: [
    { type: "photo" as const, url: "/placeholder.svg?height=300&width=300" },
    { type: "video" as const, url: "/placeholder.svg?height=300&width=300" },
  ],
};

const IncidentDetails: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const {
    id,
    date,
    time,
    location,
    type,
    description,
    reportedBy,
    status,
    media,
  } = IncidentDetailsData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Incident Report #{id}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Incident Details</h2>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{location}</span>
              </div>
              {type && (
                <div className="flex items-center text-gray-600">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>{type}</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Additional Information
            </h2>
            <div className="space-y-3">
              <p>
                <strong>Reported By:</strong> {reportedBy}
              </p>
              <p>
                <strong>Status:</strong> {status}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Media</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => setSelectedMedia(item.url)}
            >
              {item.type === "photo" ? (
                <div className="relative aspect-w-1 aspect-h-1">
                  <img
                    src={item.url || "/placeholder.svg"}
                    alt={`Evidence ${index + 1}`}
                    className="object-cover rounded-lg"
                  />
                  <Camera className="absolute top-2 left-2 w-6 h-6 text-white" />
                </div>
              ) : (
                <div className="relative aspect-w-16 aspect-h-9">
                  <video src={item.url} className="object-cover rounded-lg" />
                  <Video className="absolute top-2 left-2 w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-3xl max-h-full p-4">
            {selectedMedia.endsWith(".mp4") ? (
              <video
                src={selectedMedia}
                controls
                className="max-w-full max-h-full"
              />
            ) : (
              <img
                src={selectedMedia || "/placeholder.svg"}
                alt="Selected media"
                className="max-w-full max-h-full"
              />
            )}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentDetails;