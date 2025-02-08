import { useState, useEffect } from 'react';
import { Upload, Send, Loader } from 'lucide-react';
import { baseUrl } from '../../App';

interface FormData {
  title: string;
  description: string;
  files: File[];
}

const ReportIncidents = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    files: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationString, setLocationString] = useState('');

  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude
        ];
        setUserLocation(coords);

        // Convert coordinates to location string
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}`
          );
          const data = await response.json();
          setLocationString(data.display_name || 'Unknown Location');
        } catch (err) {
          console.error('Error getting location name:', err);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Unable to get location. Please enable location services.');
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const currentDate = new Date().toISOString();
      
      const payload = {
        title: formData.title,
        description: formData.description,
        coordinates: userLocation,
        location: locationString,
        incident_type: "normal",
        status: 'reported',
        created_at: currentDate,
        updated_at: currentDate
      };

      const response = await fetch(`${baseUrl}/api/cases/incidents/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to submit report');

      alert('Incident reported successfully!');
      setFormData({
        title: '',
        description: '',
        files: []
      });
    } catch (err) {
      setError('Failed to submit report. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Report an Incident</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Evidence (Photos/Videos)
          </label>
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => setFormData({
                ...formData, 
                files: Array.from(e.target.files || [])
              })}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex items-center justify-center gap-2 text-gray-600"
            >
              <Upload size={20} />
              <span>Click to upload files</span>
            </label>
          </div>
          {formData.files.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              {formData.files.length} file(s) selected
            </div>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || !userLocation}
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg
            flex items-center justify-center gap-2 
            ${loading || !userLocation ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}
            transition-colors duration-200`}
        >
          {loading ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <>
              <Send size={20} />
              Report Incident
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReportIncidents;