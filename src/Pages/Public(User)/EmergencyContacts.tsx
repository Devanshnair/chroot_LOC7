import { useState, useEffect } from 'react';
import { Phone, Plus, Trash2, X } from 'lucide-react';
import { baseUrl } from '../../App';
import { jwtDecode } from 'jwt-decode';

interface EmergencyContact {
  emergency_contact_name: string;
  emergency_contact_phone: string;
}

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState<EmergencyContact>({
    emergency_contact_name: '',
    emergency_contact_phone: ''
  });
  const token = localStorage.getItem("accessToken")
  const decoded = token ? jwtDecode(token) : null;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/me`, {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': '444',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch contacts');
      
      const data = await response.json();
      const emergency_contacts = [{"emergency_contact_name": data.emergency_contact_name, "emergency_contact_phone":data.emergency_contact_phone}]
      setContacts(emergency_contacts || []);
    } catch (err) {
      setError('Failed to load emergency contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decoded) {
      setError('Invalid token');
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/users/${(decoded as any).id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(newContact)
      });

      if (!response.ok) throw new Error('Failed to add contact');

      await fetchContacts();
      setNewContact({ emergency_contact_name: '', emergency_contact_phone: '' });
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to add emergency contact');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Emergency Contacts</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
            flex items-center gap-2"
        >
          <Plus size={20} />
          Add Contact
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 mx-12 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Contact</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={newContact.emergency_contact_name}
                  onChange={(e) => setNewContact({
                    ...newContact,
                    emergency_contact_name: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={newContact.emergency_contact_phone}
                  onChange={(e) => setNewContact({
                    ...newContact,
                    emergency_contact_phone: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded 
                  hover:bg-blue-700"
              >
                Add Contact
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <div 
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{contact.emergency_contact_name}</h3>
              <p className="text-gray-600 flex items-center gap-2">
                <Phone size={16} />
                {contact.emergency_contact_phone}
              </p>
            </div>
            <button className="text-red-500 hover:text-red-700">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No emergency contacts added yet
        </div>
      )}
    </div>
  );
};

export default EmergencyContacts;