import { Phone, ShieldAlert, Heart } from 'lucide-react';
import styles from './SOS.module.css'

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

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto space-y-8">
      <div className={styles.buttonContainer}>
          <div className={`${styles.pingCircle} ${styles.ping1}`}></div>
          
          <button 
            onClick={() => handleEmergencyCall('112')}
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