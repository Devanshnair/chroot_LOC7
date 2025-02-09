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
    id: 10,
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

interface Case {
  id: number;
  location: [number, number];
  address: string;
  case_type: string;
  no_of_cases: number;
  title: string;
  description: string;
  radius: number;
  colour: string;
}

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

const Map: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Case[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = cases
        .filter((item) =>
          item.address.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectLocation = (location: Case) => {
    setSelectedLocation(location.location);
    setSearchTerm(location.address);
    setSuggestions([]);
  };

  return (
    <div className="relative z-10 w-full h-screen">
      <div className="absolute flex items-center top-4 left-4 z-[1000] ">
        <div className="relative  w-72 max-w-xl mx-auto bg-white  rounded-full shadow-lg p-2">
          <div className="flex items-center">
            <Search className="ml-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search places"
              className="w-full p-2 pl-3.5  pr-4 border-none rounded-full text-sm text-gray-800 focus:outline-none  placeholder-gray-500"
            />
          </div>

          {suggestions.length > 0 && (
            <div className="absolute w-full bg-white mt-1 rounded-lg shadow-xl border border-gray-100 max-h-60 overflow-y-auto z-10">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150 first:rounded-t-md last:rounded-b-md"
                  onClick={() => handleSelectLocation(item)}
                >
                  {item.address}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="filter">
          <button className="bg-white ml-4 p-3 rounded-full ">
            <Filter />
          </button>
        </div>
      </div>

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
  );
};

export default Map;
