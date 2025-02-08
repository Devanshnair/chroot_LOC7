import { Phone, ShieldAlert, Heart } from 'lucide-react';
import styles from './SOS.module.css'
import { useEffect, useState } from 'react';
import { baseUrl } from '../../../App';

interface EmergencyContact {
  name: string;
  number: string;
  icon: React.ReactNode;
  bgColor: string;
}

const SOS = () => {
  const emergencyContacts: EmergencyContact[] = [
    {
      name: 'Police',
      number: '100',
      icon: <ShieldAlert className="h-6 w-6" />,
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Women Helpline',
      number: '1091',
      icon: <Heart className="h-6 w-6" />,
      bgColor: 'bg-pink-100'
    },
    {
      name: 'Ambulance',
      number: '102',
      icon: <Phone className="h-6 w-6" />,
      bgColor: 'bg-green-100'
    }
  ];

  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const handleSOS = async () => {
    try {
      if (!userLocation) {
        console.error("Location not available");
        return;
      }
  
      // Convert coordinates to location string using reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation[0]}&lon=${userLocation[1]}`
      );
      const data = await response.json();
      const locationString = data.display_name || "Unknown Location";
  
      // Send SOS incident
      const incidentResponse = await fetch(`${baseUrl}/api/cases/incidents/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          title: "SOS Emergency",
          description: "Emergency assistance required",
          incident_type: "sos",
          coordinates: userLocation,
          location: locationString
        })
      });
  
      if (!incidentResponse.ok) {
        throw new Error('Failed to send SOS');
      }
  
      // Show notification
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('SOS Alert', {
              body: 'SOS sent successfully!',
              icon: '/path-to-your-icon.png' // Add your icon path
            });
          }
        });
      }
  
      // Fallback alert if notifications not supported
      alert('SOS sent successfully!');
  
    } catch (error) {
      console.error('Error sending SOS:', error);
      alert('Failed to send SOS. Please try again.');
    }
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto space-y-8">
      <div className={styles.buttonContainer}>
          <div className={`${styles.pingCircle} ${styles.ping1}`}></div>
          
          <button 
            onClick={handleSOS}
            className={styles.sosButton}
            aria-label="Emergency SOS"
          >
            <span className={styles.sosText}>SOS</span>
          </button>
        </div>

        {/* Emergency Numbers */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Emergency Numbers
            </h2>
            
            <div className="">
              {emergencyContacts.map((contact) => (
                <button
                  key={contact.number}
                  onClick={() => handleEmergencyCall(contact.number)}
                  className="w-full flex items-center justify-between p-4
                    hover:shadow-md transition-shadow duration-200 cursor-pointer border-gray-300 border-t-2"
                  style={{ backgroundColor: contact.bgColor }}
                >
                  <div className="flex items-center">
                    <span className="text-gray-900 font-medium">
                      {contact.name}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-indigo-600 ">
                    {contact.number}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Instructions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            In Case of Emergency
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Stay calm and find a safe location if possible</li>
            <li>• Click any number above to instantly dial</li>
            <li>• Share your location with emergency services</li>
            <li>• Follow instructions from emergency personnel</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SOS;