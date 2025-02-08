import React, { useState, useEffect } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Calendar, Clock, Filter, MapPin, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";



const incidents = [
  {
    id: "12346",
    date: "2023-07-22",
    time: "10:15",
    location: "Andheri West, Mumbai",
    coordinates: [19.1331, 72.8347],
    type: "Robbery",
    description: "A purse was snatched from a pedestrian near Andheri Station.",
    reportedBy: "Amit Patel",
    status: "Under Investigation",
    media: [
      { type: "photo", url: "/placeholder.svg?height=300&width=300" },
      { type: "video", url: "/placeholder.svg?height=300&width=300" },
    ],
  },
  {
    id: "12347",
    date: "2023-08-10",
    time: "18:00",
    location: "Colaba, Mumbai",
    coordinates: [18.929, 72.834],
    type: "Vandalism",
    description: "Graffiti was found on a public wall in Colaba area.",
    reportedBy: "Rita Desai",
    status: "Closed",
    media: [{ type: "photo", url: "/placeholder.svg?height=300&width=300" }],
  },
  {
    id: "12348",
    date: "2023-09-03",
    time: "02:45",
    location: "Bandra, Mumbai",
    coordinates: [19.0633, 72.8278],
    type: "Theft",
    description: "A car was stolen from a residential parking lot in Bandra.",
    reportedBy: "Nikhil Sharma",
    status: "Under Investigation",
    media: [
      { type: "photo", url: "/placeholder.svg?height=300&width=300" },
      { type: "video", url: "/placeholder.svg?height=300&width=300" },
    ],
  },
  {
    id: "12349",
    date: "2023-10-01",
    time: "11:30",
    location: "Dadar, Mumbai",
    coordinates: [19.0212, 72.835],
    type: "Hit-and-Run",
    description: "A pedestrian was hit by a speeding vehicle in Dadar.",
    reportedBy: "Sunil Kumar",
    status: "Under Investigation",
    media: [{ type: "photo", url: "/placeholder.svg?height=300&width=300" }],
  },
  {
    id: "12350",
    date: "2023-09-20",
    time: "14:00",
    location: "Churchgate, Mumbai",
    coordinates: [18.9351, 72.8263],
    type: "Burglary",
    description: "Jewelry was stolen from an apartment in Churchgate.",
    reportedBy: "Meera Rao",
    status: "Under Investigation",
    media: [{ type: "photo", url: "/placeholder.svg?height=300&width=300" }],
  },
  {
    id: "12351",
    date: "2023-11-05",
    time: "16:30",
    location: "Lower Parel, Mumbai",
    coordinates: [18.9982, 72.8266],
    type: "Assault",
    description:
      "A fight broke out in a restaurant in Lower Parel, leaving one person injured.",
    reportedBy: "Pratik Singh",
    status: "Closed",
    media: [{ type: "photo", url: "/placeholder.svg?height=300&width=300" }],
  },
  {
    id: "12352",
    date: "2023-12-10",
    time: "08:15",
    location: "Boregaon, Mumbai",
    coordinates: [19.1548, 72.9043],
    type: "Fraud",
    description:
      "An online scam involving fake job offers targeting local residents.",
    reportedBy: "Snehal Joshi",
    status: "Under Investigation",
    media: [
      { type: "photo", url: "/placeholder.svg?height=300&width=300" },
      { type: "video", url: "/placeholder.svg?height=300&width=300" },
    ],
  },
  {
    id: "12353",
    date: "2023-11-22",
    time: "21:00",
    location: "Powai, Mumbai",
    coordinates: [19.1292, 72.9131],
    type: "Traffic Incident",
    description:
      "A major car accident occurred near the Powai lake, causing a traffic jam.",
    reportedBy: "Vishal Mehta",
    status: "Closed",
    media: [{ type: "photo", url: "/placeholder.svg?height=300&width=300" }],
  },
  {
    id: "12354",
    date: "2023-12-03",
    time: "13:45",
    location: "Malad, Mumbai",
    coordinates: [19.186, 72.8497],
    type: "Arson",
    description:
      "A small fire broke out in a shop in Malad, causing significant damage.",
    reportedBy: "Ayesha Khan",
    status: "Under Investigation",
    media: [{ type: "photo", url: "/placeholder.svg?height=300&width=300" }],
  },
  {
    id: "12355",
    date: "2023-12-15",
    time: "20:00",
    location: "Juhu, Mumbai",
    coordinates: [19.0974, 72.8267],
    type: "Drunk Driving",
    description:
      "A vehicle was stopped after a drunk driver was seen swerving on the road near Juhu Beach.",
    reportedBy: "Simran Verma",
    status: "Under Investigation",
    media: [{ type: "photo", url: "/placeholder.svg?height=300&width=300" }],
  },
];


const IncidentReport: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);

  const MapController: React.FC<{ center: [number, number] | null }> = ({
    center,
  }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, 13); // Fixed zoom level
      }
    }, [center, map]);
    return null;
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setUserLocation([19.076, 72.8777]); // Default to Mumbai coordinates
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUserLocation([19.076, 72.8777]);
    }
  }, []);

  const handleViewMapClick = (coordinates: [number, number]) => {
    setSelectedLocation(coordinates); 
  };

  return (
    <>
      <main className="flex flex-col">
        <div className="fixed top-16 left-0 w-full h-[40vh] z-10">
          <MapContainer
            center={userLocation || [19.076, 72.8777]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <MapController center={selectedLocation} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
            />
            {incidents.map((incident) => (
              <Marker key={incident.id} position={incident.coordinates}>
                <Popup>
                  <div>
                    <h3>{incident.type}</h3>
                    <p>{incident.description}</p>
                    <p>Status: {incident.status}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="mt-[40vh] flex-grow overflow-y-auto">
          <div className="mt-14 fixed bg-white/95  w-full">
            <h3 className="font-bold text-3xl pl-4 py-3">Reported Incidents</h3>
          </div>
          <div className="card grid md:grid-cols-2 gap-6 mt-28 px-4">
            {incidents.map((incident) => (
              <div
                className="bg-white shadow-md rounded-lg p-6 mb-4"
                key={incident.id}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Incident # {incident.id}
                  </h2>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{incident.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{incident.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{incident.location}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleViewMapClick(incident.coordinates)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    View on Map
                  </button>
                  <Link to={`/incident/details/${incident.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default IncidentReport;