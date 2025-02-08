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
import { Filter, Search } from "lucide-react";


const cases = [
  {
    id: 1,
    location: [19.076, 72.8777],
    address: "Nariman Point, Mumbai",
    case_type: "Theft",
    no_of_cases: 23,
    title: "Theft Incidents",
    description: "Frequent incidents of theft reported in this area.",
    radius: 500,
    colour: "red",
  },
  {
    id: 2,
    location: [19.2183, 72.9781],
    address: "Mulund West, Mumbai",
    case_type: "Burglary",
    no_of_cases: 15,
    title: "Burglary Cases",
    description: "Multiple burglary cases have been reported.",
    radius: 400,
    colour: "orange",
  },
  {
    id: 3,
    location: [19.1136, 72.8697],
    address: "Bandra West, Mumbai",
    case_type: "Fraud",
    no_of_cases: 30,
    title: "Fraud Reports",
    description: "Several reports of fraud and scams.",
    radius: 600,
    colour: "yellow",
  },
  {
    id: 4,
    location: [19.0313, 72.8484],
    address: "Chembur, Mumbai",
    case_type: "Vandalism",
    no_of_cases: 18,
    title: "Vandalism Incidents",
    description: "Instances of vandalism and property damage.",
    radius: 450,
    colour: "blue",
  },
  {
    id: 5,
    location: [19.1629, 72.8494],
    address: "Goregaon, Mumbai",
    case_type: "Assault",
    no_of_cases: 12,
    title: "Assault Cases",
    description: "Reports of physical assault incidents.",
    radius: 350,
    colour: "purple",
  },
  {
    id: 6,
    location: [18.9388, 72.8354],
    address: "Colaba, Mumbai",
    case_type: "Drug Abuse",
    no_of_cases: 20,
    title: "Drug-Related Incidents",
    description: "Reports of drug-related activities.",
    radius: 500,
    colour: "brown",
  },
  {
    id: 7,
    location: [19.0886, 72.8656],
    address: "Andheri East, Mumbai",
    case_type: "Robbery",
    no_of_cases: 25,
    title: "Robbery Incidents",
    description: "High number of robbery cases reported.",
    radius: 550,
    colour: "pink",
  },
  {
    id: 8,
    location: [19.1459, 72.8479],
    address: "Malad West, Mumbai",
    case_type: "Cyber Crime",
    no_of_cases: 22,
    title: "Cyber Crime Cases",
    description: "Online frauds and cybercrime incidents reported.",
    radius: 400,
    colour: "cyan",
  },
  {
    id: 9,
    location: [19.2042, 72.9707],
    address: "Thane, Mumbai",
    case_type: "Hit and Run",
    no_of_cases: 10,
    title: "Traffic Offenses",
    description: "Cases of hit and run accidents reported.",
    radius: 300,
    colour: "grey",
  },
  {
    id: 10,
    location: [18.9941, 72.8414],
    address: "Dadar, Mumbai",
    case_type: "Public Disturbance",
    no_of_cases: 28,
    title: "Disturbance Reports",
    description: "Reports of public disturbances and protests.",
    radius: 500,
    colour: "green",
  },
  {
    id: 11,
    location: [18.998, 72.8414],
    address: "Dadar, Mumbai",
    case_type: "Public Disturbance",
    no_of_cases: 30,
    title: "Disturbance Reports",
    description: "Reports of public disturbances and protests.",
    radius: 600,
    colour: "red",
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
        map.setView(center, 15);
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

  return (
    <>
      <div className="mapWrapper h-[40vh]">
        <div style={{ height: "100%", width: "100%" }}>
          {userLocation && (
            <MapContainer
              center={userLocation}
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

              {cases.map((item) => (
                <Circle
                  key={item.id}
                  center={item.location}
                  radius={item.radius}
                  color="transparent"
                  fillColor={item.colour}
                  fillOpacity={0.5}
                  weight={0}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-medium text-gray-900">
                        Case Type: {item.case_type}
                      </h3>
                      <h3 className="font-medium text-gray-900">
                        Number of cases: {item.no_of_cases}
                      </h3>
                      <h3 className="font-medium text-gray-900">
                        Location: {item.address}
                      </h3>
                    </div>
                  </Popup>
                </Circle>
              ))}
            </MapContainer>
          )}
        </div>
      </div>

      <div className="layout">
        
      </div>
    </>
  );
};

export default IncidentReport;
