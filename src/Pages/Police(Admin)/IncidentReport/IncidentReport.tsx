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
import { baseUrl } from "../../App";

const IncidentReport: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  const [incidents, setIncidents] = useState([]);

  const fetchData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${baseUrl}/api/cases/incidents/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    const data = await response.json();
    const transformedData = data.map((incident) => ({
      id: incident.id.toString(),
      date: incident.created_at,
      time: new Date(incident.created_at).toLocaleTimeString(),
      location: incident.location,
      coordinates: incident.coordinates,
      type: incident.incident_type,
      description: incident.description,
      reportedBy: `${incident.reported_by.first_name} ${incident.reported_by.last_name}`,
      status: incident.status,
      media: [], // Assuming no media in the API response
    }));
    console.log(transformedData);
    
    setIncidents(transformedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const MapController: React.FC<{ center: [number, number] | null }> = ({
    center,
  }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, 13);
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
          setUserLocation([19.076, 72.8777]);
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
                    <span>{incident.date.split("T")[0]}</span>
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
                  <Link
                    to={`/incident/details/${incident.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
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
